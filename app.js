const express = require('express');
const request = require('async-request');
const CONFIG = require('./CONFIG');
const app = express();

app.listen(3000, () => {
  console.log('Server running on port 3000')
});

// Returns the latest picture from your instagram feed
app.get('/photos', async (req, res, next) => {
  try {
    const imageUrl = await getImageFromInstagram();
    res.redirect(imageUrl);
  } catch (err) {
    res.status(500).send({ message: err.message, stack: err.stack })
  }
});

// Returns the N picture from your instagram feed
app.get('/photos/:index', async (req, res, next) => {
  try {
    const index = req.params.index;
    const imageUrl = await getImageFromInstagram(index);
    res.redirect(imageUrl);
  } catch (err) {
    res.status(500).send({ message: err.message, stack: err.stack })
  }
});

async function getImageFromInstagram (index = null) {
  const response = await request(`${CONFIG.INSTAGRAM_API_URL}${CONFIG.RECENT_PHOTO_ROUTE}?access_token=${CONFIG.ACCESS_TOKEN}`);

  if (response && response.statusCode !== 200) {
    throw Error(`Error calling instagram api responded with code: ${response.statusCode}`);
  }

  const jsonBody = JSON.parse(response.body)
  const mostRecentImageUrl = jsonBody.data[index || 0].images.standard_resolution.url;

  return mostRecentImageUrl;
}
