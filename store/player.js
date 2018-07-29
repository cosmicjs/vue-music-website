class Player {
  constructor () {
    this.audio = null
  }
  pause () {
    this.audio.pause()
  }
  continue () {
    this.audio.play()
  }
  play (track) {
    if (this.audio && !this.audio.paused) {
      this.audio.pause()
    }
    const url = track.metadata.audio.url
    this.audio = new Audio(url)
    this.audio.play()
  }
}

const player = new Player()

export const state = () => ({
  playlist: [],
  nextTrack: {},
  currentTrack: {},
  isPlaying: false
})

export const mutations = {
  setPlaylist (state, playlist) {
    state.playlist = playlist
  },
  setNextTrack (state, track) {
    state.nextTrack = track
  },
  setCurrentTrack (state, track) {
    state.currentTrack = track
  },
  setIsPlaying (state, isPlaying) {
    state.isPlaying = isPlaying
  }
}

export const actions = {
  pause ({ commit }) {
    commit('setIsPlaying', false)
    player.pause()
  },
  continue ({ commit }) {
    commit('setIsPlaying', true)
    player.continue()
  },
  playNextTrack ({ commit, state }) {
    commit('setCurrentTrack', state.nextTrack)
    player.play(state.nextTrack)
    commit('setIsPlaying', true)
  },
  toggle ({ state, dispatch }) {
    if (state.isPlaying) {
      dispatch('pause')
    } else {
      dispatch('continue')
    }
  }
}
