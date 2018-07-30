<template lang='pug'>
.albums
  .empty-message(v-if='!albums || albums.length === 0') Empty
  router-link.album(
    v-for='album in albums',
    :key='album.slug',
    :to='{ name: "slug", params: { slug: album.slug } }'
  )
    .cover(:style='album.metadata.cover ? {backgroundImage: `url("${album.metadata.cover.imgix_url}")`} : {}')
      .cd(v-if='!album.metadata.cover')
    .info
      .name {{ album.title }}
      .released {{ $moment(album.metadata.released_at).format('MMMM D, YYYY') }}
      .tracks-count(v-if='album.metadata.tracks') {{ album.metadata.tracks.length }} {{ 'track' | pluralize(album.metadata.tracks.length) }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'albums',
  computed: {
    ...mapGetters(['albums'])
  }
}
</script>

<style scoped lang='sass'>
@import "~assets/sass/responsive"

.albums
  display: grid
  grid-gap: 24px

  @include mobile
    grid-template-columns: 1fr 1fr

  .empty-message
    text-align: center
    padding: 32px
    font-size: 16px
    opacity: .5
    font-weight: 600

  .album
    display: flex
    color: inherit
    text-decoration: none

    @include mobile
      flex-direction: column


    &:hover
      .info
        .name
          text-decoration: underline

    .cover
      width: 64px
      height: 64px
      border-radius: 8px
      background-color: rgba(255, 255, 255, .1)
      display: flex
      align-items: center
      justify-content: center
      margin-right: 24px
      flex-shrink: 0
      background-position: center center
      background-size: cover
      position: relative

      @include mobile
        margin-right: 0
        margin-bottom: 20px
        width: 100%
        height: 0
        padding-top: 100%

      .cd
        width: 48px
        height: 48px
        border: 20px solid rgba(255, 255, 255, .1)
        border-radius: 50%

        @include mobile
          position: absolute
          top: 10%
          width: 80%
          height: 80%
          border-width: 13vw

    .info

      .name
        font-size: 16px
        font-weight: 600

      .released,
      .tracks-count
        font-size: 10px
        margin-top: 2px
</style>
