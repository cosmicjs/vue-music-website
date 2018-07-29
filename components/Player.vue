<template lang='pug'>
.player
  .title-and-controls
    .track-info
      .title {{ trackToDisplay.title }}
      .author by {{ author.title }}
    .controls
      button.control.prev: svg-icon(name='prev')
      button.control.toggle(@click='handleToggle')
        svg-icon(v-if='showIsPlaying', name='pauseBig')
        svg-icon(v-else, name='playBig')
      button.control.next: svg-icon(name='next')
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
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
    if (playlist.length > 0) {
      this.setNextTrack(playlist[0])
    } else {
      this.setNextTrack(null)
    }
  },
  computed: {
    ...mapState('player', ['currentTrack', 'nextTrack', 'isPlaying']),
    ...mapState(['author']),
    playlist () {
      return this.album.metadata.tracks
    },
    trackToDisplay () {
      if (this.playlist.indexOf(this.currentTrack) !== -1) {
        return this.currentTrack
      } else {
        return this.nextTrack
      }
    },
    showIsPlaying () {
      return this.trackToDisplay == this.currentTrack && this.isPlaying
    }
  },
  methods: {
    ...mapMutations('player', [
      'setPlaylist', 'setNextTrack'
    ]),
    ...mapActions('player', [
      'playNextTrack', 'toggle'
    ]),
    chargeAndPlay (track) {
      this.setPlaylist(this.playlist)
      this.setNextTrack(track)
      this.playNextTrack()
    },
    handleToggle () {
      if (this.showIsPlaying) {
        this.toggle()
      } else {
        if (this.nextTrack == this.currentTrack) {
          this.toggle()
        } else {
          this.setPlaylist(this.playlist)
          this.playNextTrack()
        }
      }
    }
  }
}
</script>

<style scoped lang='sass'>
.player
  height: 80px
  display: flex

  .title-and-controls
    display: flex
    align-items: center
    width: 320px

    .track-info
      margin-right: auto

      .title
        font-size: 16px
        font-weight: 600

      .author
        margin-top: 2px
        font-size: 13px

    .controls

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
</style>
