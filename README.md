# Instagram Image Feeder API

A simple express api to return selected instagram feed pictures in its highest resolution. The intended use is to specify which picture you would like from your feed based on index from most recent to embed into your `src` attribute in an `<img>` tag.

## Requirements

- Registered Instagram App

## Get started

To use the Instagram API you have to register yourself as a developer at the [Instagram Developer Platform](http://instagr.am/developer/register/) and create an application. You will receive your `client_id` and `client_secret`.

---

Please note that Instagram mainly refers to »Clients« instead of »Apps«. So »Client ID« and »Client Secret« are the same as »App Key« and »App Secret«.

---

### Insert appropriate config

Navatigate to `./config.js` and input all the missing properties:

```json
const CONFIG = {
  CLIENT_ID: '',
  CLIENT_SECRET: '',
  REDIRECT_URI: 'http://localhost:3000',
  ACCESS_TOKEN: '',
  INSTAGRAM_API_URL: 'https://api.instagram.com/v1',
  RECENT_PHOTO_ROUTE: '/users/self/media/recent'
}
```

### Installation

Install the required dependencies

```bash
npm install
```

> I did install a few packages like eslint, nodemon which are optional and not needed just a way to maintain clean clode on my end and hot reload.

### Run the App

```bash
npm start
```

> This will run nodemon so you can have hot reload during development // navigate to <http://localhost:3000>

### Usage

When calling the api via `GET` it will return an image back from your feed through a redirect. Make sure you have a default image just in case service returns error.

_Example:_

```html
<div id="container">
    <img src="http://localhost:3000/photos/2"/>
</div>
```

**All methods return the image url instagram gives us or a 500 response.**

## 🔄 API

**Display Most Recent Photo**
----
  Returns image url for most recent photo on your bio.

- **URL**

  /photos

* **Method:**

  `GET`
  
*  **URL Params**

   *None:*

* **Data Params**

   *None:*

- **Success Response:**

  * **Code:** 200 <br />
    **Content:** `http://api.facebook.com/some-image-url`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Config setting incorrect or failed to authorized via instagram }`
* **Sample Call:**

  ```javascript
  app.get('/photos', async (req, res, next) => {
    try {
      const imageUrl = await getImageFromInstagram();
      res.redirect(imageUrl);
    } catch (err) {
      res.status(500).send({ message: err.message, stack: err.stack })
    }
  });
  ```

**Display Specific Photo**
----
  Returns image url for specfic photo on your bio via an index most recent photo being `index=0`.

- **URL**

  /photos/:index

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `index=[integer]`

* **Data Params**

   *None:*

- **Success Response:**

  * **Code:** 200 <br />
    **Content:** `http://api.facebook.com/some-image-url`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Config setting incorrect or failed to authorized via instagram }`
* **Sample Call:**

  ```javascript
  app.get('/photos/:index', async (req, res, next) => {
    try {
      const index = req.params.index;
      const imageUrl = await getImageFromInstagram(index);
      res.redirect(imageUrl);
    } catch (err) {
      res.status(500).send({ message: err.message, stack: err.stack })
    }
  });
  ```

## Credits

Copyright (c) 2019 - Developed by Ivan Mendoza
