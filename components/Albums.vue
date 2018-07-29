<template lang='pug'>
.albums
  router-link.album(
    v-for='album in albums',
    :key='album.slug',
    :to='{ name: "slug", params: { slug: album.slug } }'
  )
    .cover(:style='album.metadata.cover ? {backgroundImage: `url("${album.metadata.cover.url}")`} : {}')
      .cd(v-if='!album.metadata.cover')
    .info
      .name {{ album.title }}
      .released March 2018
      .tracks-count 7 tracks
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
.albums
  display: grid
  grid-gap: 24px

  .album
    display: flex
    color: inherit
    text-decoration: none

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

      .cd
        width: 48px
        height: 48px
        border: 20px solid rgba(255, 255, 255, .1)
        border-radius: 50%

    .info

      .name
        font-size: 16px
        font-weight: 600

      .released,
      .tracks-count
        font-size: 10px
        margin-top: 2px
</style>
