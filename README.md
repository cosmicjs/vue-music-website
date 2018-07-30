# Cosmic JS Music Site

Personal music site built with Nuxt and Cosmic JS

## Prepare your Cosmic JS bucket

Import example [bucket.json](bucket.json) to your Cosmic JS bucket.

## Clone this repository

``` bash
git clone https://github.com/zezic/cosmicjs-music-site.git
cd cosmicjs-music-site
```

## Configure

Copy `instance.config.example.js` to `instance.config.js` and edit it - adjust your Cosmic JS bucket `slug`, `read_key` and `write_key`.

``` bash
cp instance.config.example.js instance.config.js
nano instance.config.js
```

## Setup and run

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

This app is based on Nuxt.js.
For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

