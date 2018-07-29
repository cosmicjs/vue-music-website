<template lang='pug'>
.comment-form
  .input
    input(type='text', v-model='name', placeholder='Your name')
  .input(:class='{error}')
    textarea(v-model='comment', placeholder='Leave your comment', @keyup.enter='send')
    .send(@click='send'): svg-icon(name='send')
  transition(name='fade')
    .overlay(v-if='loading')
      .circle
      .circle
      .circle
</template>

<script>
import { mapMutations } from 'vuex'
import getBucket from '~/lib/cosmic'
import SvgIcon from '~/components/SvgIcon.vue'

export default {
  name: 'comment-form',
  components: {
    SvgIcon
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: '',
      comment: '',
      error: false,
      loading: false
    }
  },
  methods: {
    ...mapMutations('comments', ['addComment']),
    async send () {
      if (this.loading) { return }
      if (this.comment.trim().length === 0) {
        this.error = true
        return
      }
      this.loading = true
      const bucket = await getBucket()
      try {
        const response = await bucket.addObject({
          title: this.name || 'Anonymous',
          type_slug: 'comments',
          content: this.comment,
          metafields: [{
            key: 'album_id',
            type: 'text',
            value: this.album._id
          }],
          options: { slug_field: false }
        })
        this.comment = ''
        this.addComment({
          albumId: this.album._id,
          comment: response.object
        })
      } catch (e) {
        console.log('Error occured when sending comment:', e)
      }
      this.loading = false
    }
  },
  watch: {
    comment () {
      this.error = false
    }
  }
}
</script>

<style scoped lang='sass'>
.comment-form
  position: relative

  .input
    border-bottom: 1px solid rgba(0, 0, 0, .25)
    padding-right: 48px
    position: relative
    margin-top: 16px
    transition: border-color .2s ease

    &.error
      border-bottom: 2px solid rgba(255, 0, 0, .75)

    input, textarea
      width: 100%
      padding: 16px 0
      font-family: inherit
      font-size: 13px
      border: 0
      resize: none

    textarea
      height: 100%

    .send
      width: 32px
      height: 32px
      padding: 0
      background-color: transparent
      border: 0
      cursor: pointer
      color: inherit
      opacity: .3
      transition: opacity .2s ease
      position: absolute
      right: 0
      bottom: 8px

      &:hover
        opacity: .6

  .overlay
    background-color: rgba(255, 255, 255, .5)
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    display: flex
    align-items: center
    justify-content: center

    .circle
      width: 12px
      height: 12px
      border-radius: 50%
      animation-name: pulse
      animation-duration: .5s
      animation-iteration-count: infinite
      background-color: #000000
      margin: 4px

@keyframes pulse
  0%
    opacity: .1

  50%
    opacity: .3

  100%
    opacity: .1

.fade-enter-active, .fade-leave-active
  transition: opacity .2s ease

.fade-enter, .fade-leave-to
  opacity: 0
</style>
