module.exports = {
  keyColorBG: '#5339F1',
  keyColorFG: '#FFFFFF',
  secondColorBG: '#1A1A1A',
  secondColorFG: '#FFFFFF',
  loadingColor: '#FFCC00',
  slug: process.env.COSMIC_BUCKET || 'music-page',
  read_key: process.env.COSMIC_READ_KEY || '',
  write_key: process.env.COSMIC_WRITE_KEY || ''
}
