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
  seek (ratio) {
    if (this.audio) {
      this.audio.currentTime = this.audio.duration * ratio
    }
  }
  play (track, onEnded, onTimeUpdate) {
    if (this.audio && !this.audio.paused) {
      this.audio.pause()
    }
    delete this.audio
    onTimeUpdate({target: {currentTime: 0, duration: 1}})
    const url = track.metadata.audio.url
    this.audio = new Audio(url)
    this.audio.play()
    this.audio.addEventListener('ended', onEnded)
    this.audio.addEventListener('timeupdate', onTimeUpdate)
  }
}

const player = new Player()

export const state = () => ({
  playlist: [],
  nextTrack: {},
  currentTrack: {},
  progress: 0,
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
  },
  setProgress (state, e) {
    state.progress = e.target.currentTime / (e.target.duration / 100)
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
    player.play(
      state.nextTrack,
      () => dispatch('pickNextOrStop'),
      (e) => commit('setProgress', e)
    )
    commit('setIsPlaying', true)
  },
  pickNextOrStop ({ state, commit, dispatch }) {
    const idx = state.playlist.indexOf(state.currentTrack)
    if (idx !== -1 && idx !== state.playlist.length - 1) {
      commit('setNextTrack', state.playlist[idx + 1])
      dispatch('playNextTrack')
    } else {
      commit('setIsPlaying', false)
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
  },
  seek({ commit }, ratio) {
    player.seek(ratio)
  }
}
