<template lang='pug'>
.contacts
  a.contact(v-if='author.metadata.email', :href='`mailto:${author.metadata.email}`')
    .icon: svg-icon(name='email')
    .text {{ author.metadata.email }}
  a.contact(v-if='author.metadata.skype', :href='`skype:${author.metadata.skype}`')
    .icon: svg-icon(name='skype')
    .text {{ author.metadata.skype }}
</template>

<script>
import { mapState } from 'vuex'
import SvgIcon from '~/components/SvgIcon.vue'

export default {
  name: 'contacts',
  components: {
    SvgIcon
  },
  computed: {
    ...mapState(['author'])
  }
}
</script>

<style scoped lang='sass'>
.contacts

  .contact
    color: inherit
    text-decoration: none
    display: flex
    font-weight: 600
    font-size: 13px
    align-items: center

    &:hover
      .text
        text-decoration: underline

    .icon
      transform: translateX(-5px)
      margin-right: 4px
</style>
