<template lang='pug'>
.player
  .title-and-controls
    .track-info
      .title {{ trackToDisplay.title }}
      .author by {{ author.title }}
    .controls
      button.control.prev(:class='{disabled: !ableToPrev}', @click='playPrev'): svg-icon(name='prev')
      button.control.toggle(@click='handleToggle')
        svg-icon(v-if='showIsPlaying', name='pauseBig')
        svg-icon(v-else, name='playBig')
      button.control.next(:class='{disabled: !ableToNext}', @click='pickNextOrStop'): svg-icon(name='next')
  .waveform-container
    .svg-container(ref='svg', @click.stop='handleSeek')
      transition(name='fade')
        svg.waveform(
          v-if='trackToDisplay.path',
          viewBox='0 -1 992 2',
          preserveAspectRatio='none'
        )
          g
            path(:d='trackToDisplay.path')
        .dummy-line(v-else)
      .overlay(
        :style='{color: keyColor, transform: `translateX(-${100 - progressToShow}%)`}'
      )
        svg.waveform(
          v-if='trackToDisplay.path',
          viewBox='0 -1 992 2',
          preserveAspectRatio='none',
          :style='{transform: `translateX(${100 - progressToShow}%) scaleY(48)`}'
        )
          g
            path(:d='trackToDisplay.path')
        .dummy-line(v-else)
  .nav-dots
    .nav-dot(
      v-for='track in album.metadata.tracks',
      :style='{backgroundColor: track == trackToDisplay ? keyColor : "currentColor"}'
    )
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import AudioSVGWaveform from '~/lib/audio-waveform-svg-path.js'
import SvgIcon from '~/components/SvgIcon.vue'

export default {
  name: 'player',
  components: {
    SvgIcon
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  beforeMount () {
    const playlist = this.album.metadata.tracks
    if (!playlist) { return }
    if (playlist.length > 0) {
      this.setNextTrack(playlist[0])
    } else {
      this.setNextTrack(null)
    }
  },
  computed: {
    ...mapState('player', ['currentTrack', 'nextTrack', 'isPlaying', 'progress']),
    ...mapState(['author']),
    ...mapGetters('player', ['playlistHasPrev', 'playlistHasNext']),
    progressToShow () {
      return this.trackToDisplay == this.currentTrack ? this.progress : 0
    },
    ableToPrev () {
      return this.ableToNavigate && this.playlistHasPrev
    },
    ableToNext () {
      return this.ableToNavigate && this.playlistHasNext
    },
    playlist () {
      return this.album.metadata.tracks
    },
    trackToDisplay () {
      if (!this.playlist) { return {} }
      if (this.playlist.indexOf(this.currentTrack) !== -1) {
        return this.currentTrack
      } else {
        return this.nextTrack
      }
    },
    showIsPlaying () {
      return this.trackToDisplay == this.currentTrack && this.isPlaying
    },
    ableToNavigate () {
      if (!this.playlist) { return false }
      return this.playlist.indexOf(this.currentTrack) !== -1
    },
    keyColor () {
      return process.env.keyColorBG
    }
  },
  methods: {
    ...mapMutations('player', [
      'setPlaylist', 'setNextTrack'
    ]),
    ...mapMutations(['setTrackPath']),
    ...mapActions('player', [
      'playNextTrack', 'pickNextOrStop', 'playPrev', 'seek', 'toggle'
    ]),
    chargeAndPlay (track) {
      if (!this.playlist) { return }
      this.setPlaylist(this.playlist)
      this.setNextTrack(track)
      this.playNextTrack()
    },
    handleSeek (e) {
      const container = this.$refs.svg
      const { left, right } = container.getBoundingClientRect()
      const width = right - left
      const click = e.clientX - left
      const ratio = click / width
      this.seek(ratio)
    },
    handleToggle () {
      if (this.showIsPlaying) {
        this.toggle()
      } else {
        if (this.nextTrack == this.currentTrack) {
          this.toggle()
        } else {
          if (!this.playlist) { return }
          this.setPlaylist(this.playlist)
          this.playNextTrack()
        }
      }
    },
    analyzeCurrentTrack () {
      const track = this.trackToDisplay
      if (track.metadata && track.metadata.audio && !track.path) {
        const albumId = this.album._id
        const trackId = track._id
        const trackWaveform = new AudioSVGWaveform({url: track.metadata.audio.imgix_url})
        trackWaveform.loadFromUrl().then(() => {
          const path = trackWaveform.getPath()
          this.setTrackPath({ albumId, trackId, path})
        })
      }
    }
  },
  mounted () {
    this.analyzeCurrentTrack()
  },
  watch: {
    trackToDisplay (newTrack) {
      if (newTrack) {
        this.analyzeCurrentTrack()
      }
    }
  }
}
</script>

<style scoped lang='sass'>
@import "~assets/sass/responsive"

.player
  height: 80px
  display: flex

  @include mobile
    flex-direction: column
    height: unset
    padding-top: 8px

  .title-and-controls
    display: flex
    align-items: center
    width: 320px
    flex-shrink: 0
    margin-right: 48px

    @include mobile
      margin-right: 0
      order: 1
      width: unset
      height: 64px

    .track-info
      margin-right: auto

      .title
        font-size: 16px
        font-weight: 600

      .author
        margin-top: 2px
        font-size: 13px

    .controls
      margin-right: -8px

      .control
        cursor: pointer
        background-color: transparent
        border: 0
        width: 32px
        height: 32px
        color: inherit
        padding: 0

        &.toggle
          margin: 0 16px

        &.disabled
          opacity: .25
          pointer-events: none

  .waveform-container
    flex-grow: 1
    min-width: 0
    display: flex
    align-items: center

    @include mobile
      order: 0

    .svg-container
      width: 100%
      height: 48px
      position: relative
      overflow: hidden

      @include mobile
        height: 64px

      .waveform
        width: 100%
        stroke: currentColor
        stroke-width: 1px
        transform: scaleY(48)
        vertical-align: top
        top: 50%
        margin-top: 23px

        @include mobile
          margin-top: 31px

      .dummy-line
        width: 100%
        height: 2px
        background-color: currentColor
        position: absolute
        left: 0
        top: 50%
        margin-top: -1px

      .overlay
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        overflow: hidden

        .waveform
          stroke-width: 3px

  .nav-dots
    display: none
    text-align: center
    order: 2
    padding: 8px

    @include mobile
      display: block

    .nav-dot
      width: 8px
      height: 8px
      display: inline-block
      margin: 0 4px
      border-radius: 50%
      vertical-align: top

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
