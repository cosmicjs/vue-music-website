<template lang='pug'>
.playlist
  .track(
    v-for='track in tracks',
    :style='{color: (track == currentTrack && isPlaying) ? activeColor : "inherit"}',
    @click='handleClick(track)'
  )
    .button
      button.pause(v-if='track == currentTrack && isPlaying'): svg-icon(name='pause')
      button.play(v-else): svg-icon(name='play')
    .title {{ track.title }}
    .duration(v-if='track.duration') {{ $moment.unix(track.duration).format('mm:ss') }}
    .duration.loading(v-else)
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SvgIcon from '~/components/SvgIcon.vue'
import chroma from 'chroma-js'

export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  name: 'playlist',
  components: {
    SvgIcon
  },
  computed: {
    ...mapState('player', ['currentTrack', 'nextTrack', 'isPlaying']),
    tracks () {
      return this.album.metadata.tracks || []
    },
    activeColor () {
      if (this.album.color && chroma.contrast(this.album.color, process.env.secondColorBG) > 2) {
        return this.album.color
      }
      return 'inherit'
    }
  },
  methods: {
    ...mapMutations(['setTrackDuration']),
    ...mapMutations('player', ['setPlaylist', 'setNextTrack']),
    ...mapActions('player', ['playNextTrack', 'toggle']),
    handleClick (track) {
      if (track == this.currentTrack) {
        this.toggle()
      } else {
        this.setPlaylist(this.tracks)
        this.setNextTrack(track)
        this.playNextTrack()
      }
    }
  },
  mounted () {
    const albumId = this.album._id
    this.tracks.map(track => {
      if (track.duration) { return }
      const trackId = track._id
      const url = track.metadata.audio.imgix_url
      const audio = new Audio(url)
      audio.addEventListener('loadedmetadata', (e) => {
        const duration = audio.duration
        this.setTrackDuration({
          albumId,
          trackId,
          duration
        })
      })
    })
  }
}
</script>

<style scoped lang='sass'>
.playlist
  .track
    cursor: pointer
    display: flex
    font-size: 13px
    align-items: center

    &:not(:last-child)
      margin-bottom: 8px

    .button

      button
        background-color: transparent
        color: inherit
        width: 32px
        height: 32px
        border: 0
        padding: 0
        display: block
        transform: translateX(-8px)
        margin-right: 4px
        cursor: pointer

    .duration
      margin-left: auto

      &.loading
        background-color: currentColor
        animation-name: pulse
        animation-duration: .5s
        animation-iteration-count: infinite
        height: 1em
        width: 3em
        border-radius: 4px

@keyframes pulse
  0%
    opacity: .5

  50%
    opacity: .25

  100%
    opacity: .5
</style>
