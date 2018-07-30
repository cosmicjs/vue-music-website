const instanceConfig = require('./instance.config.js')

module.exports = {
  env: instanceConfig,
  /*
  ** Headers of the page
  */
  head: {
    title: 'cosmicjs-music-site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Personal music site with Nuxt and Cosmic JS' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:500,600&amp;subset=cyrillic' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: instanceConfig.loadingColor },
  modules: [ '@nuxtjs/moment' ],
  plugins: [ '~/plugins/pluralize' ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          { loader: 'svg-sprite-loader'},
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false, currentColor: true}},
                {convertPathData: false},
                {removeDimensions: false}
              ]
            }
          }
        ]
      })
    }
  }
}

