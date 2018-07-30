<template lang='pug'>
.album

  section.main(:style='style', v-if='album')
    .container
      .cover-and-info
        .cover(
          v-if='album.metadata.cover',
          :style='{backgroundImage: `url("${album.metadata.cover.imgix_url}")`}'
        )
        .info
          h2.title {{ album.title }}
          .release-date released {{ releaseDate }}
          playlist.playlist(:album='album')

  section.player(v-if='album', :style='style2')
    .container
      player(:album='album')

  section.breadcrumbs(v-if='album')
    .container
      nuxt-link.crumb(:to='{name: "index"}') Discography
      .separator
      nuxt-link.crumb(:to='{}') {{ album.title }}

  section.about-and-comments(v-if='album')
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import RGBaster from '~/lib/rgbaster'
import chroma from 'chroma-js'

import Playlist from '~/components/Playlist.vue'
import Player from '~/components/Player.vue'
import CommentForm from '~/components/CommentForm.vue'
import Comments from '~/components/Comments.vue'

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
      if (!this.albums) { return null }
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
    if (!this.album || !this.album.metadata.cover || this.album.color) { return }
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
@import "~assets/sass/responsive"

.album

  section
    .container
      width: 960px
      padding: 0 48px
      margin: 0 auto

      @include mobile
        width: unset
        padding: 0 24px


  section.main
    display: flex

    @include mobile
      display: block

      .container
        padding: 0

    .cover-and-info
      display: flex
      padding: 48px 0

      @include mobile
        padding: 0
        display: block

      .cover
        width: 320px
        height: 320px
        border-radius: 8px
        background-position: center center
        background-size: cover
        margin-right: 48px
        flex-shrink: 0

        @include mobile
          width: 100%
          height: 0
          padding-top: 100%
          border-radius: 0

      .info
        flex-grow: 1

        @include mobile
          display: none

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

  section.about-and-comments,
  section.breadcrumbs
    color: #333333
    background-color: #ffffff

  section.breadcrumbs
    display: none
    font-size: 13px
    padding-top: 12px

    @include mobile
      display: block

    .separator
      display: inline-block
      height: .6em
      width: .6em
      border: 2px solid currentColor
      border-top-width: 0
      border-left-width: 0
      transform: translateY(-1px) rotate(-45deg)
      vertical-align: middle
      opacity: .75
      margin: 20px

    .crumb
      color: inherit
      text-decoration: none

      &:not(:last-child)
        opacity: .5

      &:last-child
        font-weight: 600

  section.about-and-comments
    padding: 32px 0

    @include mobile
      padding-top: 4px

    .container
      display: flex

      @include mobile
        flex-direction: column

      .pane
        @include mobile
          &:not(:last-child)
            margin-bottom: 48px

        &.about-and-form
          width: 320px
          flex-shrink: 0
          margin-right: 48px

          @include mobile
            width: unset
            margin-right: 0

        .pane-title
          font-size: 13px
          opacity: .7
          margin-bottom: 32px

        .about
          font-size: 13px
          line-height: 1.5
</style>
