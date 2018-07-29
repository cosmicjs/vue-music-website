<template lang='pug'>
.album
  section.main(:style='style')
    .container
      .cover-and-info
        .cover(
          v-if='album.metadata.cover',
          :style='{backgroundImage: `url("${album.metadata.cover.url}")`}'
        )
        .info
          h2.title {{ album.title }}
          .release-date released {{ releaseDate }}
          playlist.playlist(:album='album')
  section.player(:style='style2')
    .container
      player(:album='album')
  section.about-and-comments
    .container
      .pane.about-and-form
        .pane-title About
        .about(v-html='album.content')
        comment-form(:album='album')
      .pane
        .pane-title {{ comments.length }} {{ 'comment' | pluralize(comments.length) }}
        comments(:comments='comments')
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import RGBaster from '~/lib/rgbaster'
import chroma from 'chroma-js'

import Playlist from '~/components/Playlist.vue'
import Player from '~/components/Player.vue'
import CommentForm from '~/components/CommentForm.vue'
import Comments from '~/components/Comments.vue'

Vue.filter('pluralize', (word, amount) => amount > 1 ? `${word}s` : word)

export default {
  name: 'album',
  components: {
    Playlist,
    Player,
    CommentForm,
    Comments
  },
  computed: {
    ...mapGetters(['albums']),
    ...mapState('comments', ['collections']),
    comments () {
      const collection = this.collections.find(col => col.albumId === this.album._id)
      if (collection) {
        return collection.comments
      }
      return []
    },
    album () {
      const slug = this.$route.params.slug
      return slug ? this.albums.find(album => album.slug === slug) : this.albums[0]
    },
    style () {
      return {
        backgroundColor: process.env.secondColorBG,
        color: process.env.secondColorFG
      }
    },
    style2 () {
      if (this.album.color) {
        const bg = this.album.color
        const white = chroma.contrast(bg, 'white')
        const black = chroma.contrast(bg, 'black')
        return {
          backgroundColor: bg,
          color: white > black ? '#ffffff' : '#000000'
        }
      } else {
        return this.style
      }
    },
    releaseDate () {
      return this.$moment(this.album.metadata.released_at).format('MMMM D, YYYY')
    }
  },
  methods: {
    ...mapMutations(['setAlbumColor']),
    ...mapActions('comments', ['fetchComments']),
  },
  async mounted () {
    if (!this.album.metadata.cover || this.album.color) { return }
    const albumId = this.album._id
    const url = this.album.metadata.cover.imgix_url
    RGBaster.colors(url, { success: (payload) => {
      this.setAlbumColor({
        albumId,
        color: payload.dominant
      })
    }})
    this.fetchComments(this.album._id)
  }
}
</script>

<style scoped lang='sass'>
.album

  section
    .container
      width: 960px
      padding: 0 48px
      margin: 0 auto


  section.main
    display: flex

    .cover-and-info
      display: flex
      padding: 48px 0

      .cover
        width: 320px
        height: 320px
        border-radius: 8px
        background-position: center center
        background-size: cover
        margin-right: 48px
        flex-shrink: 0

      .info
        flex-grow: 1

        .title
          font-size: 36px
          line-height: 36px
          font-weight: 600

        .release-date
          font-size: 13px
          margin-top: 8px

        .playlist
          margin-top: 32px

  section.player
    transition: background-color .2s ease

  section.about-and-comments
    color: #333333
    background-color: #ffffff
    padding: 32px 0

    .container
      display: flex

      .pane

        &.about-and-form
          width: 320px
          flex-shrink: 0
          margin-right: 48px

        .pane-title
          font-size: 13px
          opacity: .7
          margin-bottom: 32px

        .about
          font-size: 13px
          line-height: 1.5
</style>
