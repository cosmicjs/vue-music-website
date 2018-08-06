# Vue.js Music Website

![screenshot](screenshot.png)

### [View Demo](https://cosmicjs.com/apps/vue-music-website)

Personal music site built with Nuxt and [Cosmic JS](https://cosmicjs.com/buckets).

## How to

### Prepare your Cosmic JS bucket

Import example [bucket.json](bucket.json) to your Cosmic JS bucket.

### Clone this repository

``` bash
git clone https://github.com/cosmicjs/vue-music-website
cd vue-music-website
```

### Configure

Edit `instance.config.js` to adjust app colors if you need.

You can see that Cosmic JS access credentials are picked up from the next environment variables:

```
COSMIC_BUCKET
COSMIC_READ_KEY
COSMIC_WRITE_KEY
```

### Setup and run

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start

# generate static project
$ npm run generate
```

This app is based on Nuxt.js.
For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

