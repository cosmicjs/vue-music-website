<template lang='pug'>
.comments
  transition-group(name='list', tag='div')
    .comment(v-for='comment in comments', :key='comment._id')
      .head
        .author {{ comment.title }}
        .date {{ $moment(comment.created_at).format('HH:mm MMMM D')}}
      .message {{ comment.content | striphtml }}
</template>

<script>
import Vue from 'vue'
import striptags from 'striptags'

Vue.filter('striphtml', function (value) {
  return striptags(value)
})

export default {
  name: 'comments',
  props: {
    comments: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped lang='sass'>
.comments
  .comment
    font-size: 13px
    overflow: hidden
    &:not(:last-child)
      margin-bottom: 32px

    .head
      opacity: .6
      margin-bottom: 8px
      > *
        display: inline-block
      .author
        margin-right: 16px

      .date
        font-size: 11px

.list-enter-active, .list-leave-active
  transition: opacity .5s ease

.list-enter
  opacity: 0
</style>
