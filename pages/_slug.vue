<template lang='pug'>
.album-page
  album
</template>

<script>
import striptags from 'striptags'
import { mapGetters, mapState } from 'vuex'
import Album from '~/components/Album.vue'

export default {
  name: 'album-page',
  asyncData ({ error, params, store }) {
    const slug = params.slug
    // console.log(store.getters)
    if (!slug) {
      return
    }
    if (!store.getters.albums.find(album => album.slug === slug)) {
      error({ statusCode: 404, message: 'Album not found'})
    }
  },
  head () {
    return {
      title: `${this.album.title} by ${this.author.title}`,
      meta: [
        { hid: 'description', name: 'description', content: striptags(this.album.content) }
      ]
    }
  },
  computed: {
    ...mapGetters(['albums']),
    ...mapState(['author']),
    album () {
      const slug = this.$route.params.slug
      return slug ? this.albums.find(album => album.slug === slug) : this.albums[0]
    }
  },
  components: {
    Album
  }
}
</script>

<style scoped lang='sass'>
</style>
