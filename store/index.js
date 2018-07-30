import Vue from 'vue'
import getBucket from '~/lib/cosmic'

export const state = () => ({
  author: null
})

export const getters = {
  albums: (state) => state.author ? state.author.metadata.albums : []
}

export const mutations = {
  setAuthor (state, author) {
    state.author = author
  },
  setTrackDuration (state, { albumId, trackId, duration }) {
    const album = state.author.metadata.albums.find(album => album._id === albumId)
    const track = album.metadata.tracks.find(track => track._id === trackId)
    Vue.set(track, 'duration', duration)
  },
  setTrackPath (state, { albumId, trackId, path }) {
    const album = state.author.metadata.albums.find(album => album._id === albumId)
    const track = album.metadata.tracks.find(track => track._id === trackId)
    Vue.set(track, 'path', path)
  },
  setAlbumColor (state, { albumId, color }) {
    const album = state.author.metadata.albums.find(album => album._id === albumId)
    Vue.set(album, 'color', color)
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const bucket = await getBucket()
    const response = await bucket.getObjects({
      type: 'authors',
      limit: 1,
      hide_metafields: true
    })
    if (response.status !== 'empty') {
      const author = response.objects[0]
      commit('setAuthor', author)
    }
  }
}
