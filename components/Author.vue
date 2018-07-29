<template lang='pug'>
.author
  .photo(
    v-if='author.metadata.photo',
    :style='{backgroundImage: `url("${author.metadata.photo.url}")`}'
  )
  .info
    h1.name {{ author.title }}
    .bio(v-html='author.content')
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'author',
  computed: {
    ...mapState(['author'])
  }
}
</script>

<style scoped lang='sass'>
.author
  display: flex

  .photo
    width: 64px
    height: 64px
    background-position: center center
    background-size: cover
    border-radius: 50%
    margin-right: 24px
    flex-shrink: 0

  .info

    .name
      font-size: 16px
      font-weight: 600
      margin-bottom: 4px

    .bio
      font-size: 10px
</style>
