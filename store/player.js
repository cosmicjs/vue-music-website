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
  play (track, onEnded) {
    if (this.audio && !this.audio.paused) {
      this.audio.pause()
    }
    delete this.audio
    const url = track.metadata.audio.url
    this.audio = new Audio(url)
    this.audio.play()
    this.audio.addEventListener('ended', onEnded)
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

export const getters = {
  playlistHasNext (state) {
    const idx = state.playlist.indexOf(state.currentTrack)
    if (idx === -1 || idx === state.playlist.length - 1) {
      return false
    }
    return true
  },
  playlistHasPrev (state) {
    const idx = state.playlist.indexOf(state.currentTrack)
    if (idx === -1 || idx === 0) {
      return false
    }
    return true
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
  playNextTrack ({ commit, dispatch, state }) {
    commit('setCurrentTrack', state.nextTrack)
    player.play(state.nextTrack, () => dispatch('pickNextOrStop'))
    commit('setIsPlaying', true)
  },
  pickNextOrStop ({ state, commit, dispatch }) {
    const idx = state.playlist.indexOf(state.currentTrack)
    if (idx !== -1 && idx !== state.playlist.length - 1) {
      commit('setNextTrack', state.playlist[idx + 1])
      dispatch('playNextTrack')
    } else {
      commit('setIsPlaying', false)
      commit('setNextTrack', state.playlist[0])
      commit('setCurrentTrack', state.playlist[0])
    }
  },
  playPrev ({ commit, dispatch, state }) {
    const idx = state.playlist.indexOf(state.currentTrack)
    if (idx !== -1) {
      commit('setNextTrack', state.playlist[idx - 1])
      dispatch('playNextTrack')
    }
  },
  toggle ({ state, dispatch }) {
    if (state.isPlaying) {
      dispatch('pause')
    } else {
      dispatch('continue')
    }
  }
}
