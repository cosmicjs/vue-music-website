<template lang='pug'>
.menubar(:style='style')
  author
  section
    .title Discography
    albums
  section
    .title Contact me
    contacts
  section.last
    cosmic-logo
</template>

<script>
import Albums from '~/components/Albums.vue'
import Author from '~/components/Author.vue'
import Contacts from '~/components/Contacts.vue'
import CosmicLogo from '~/components/CosmicLogo.vue'

export default {
  name: 'menubar',
  components: {
    Albums,
    Author,
    Contacts,
    CosmicLogo
  },
  computed: {
    style () {
      return {
        backgroundColor: process.env.keyColorBG,
        color: process.env.keyColorFG
      }
    }
  }
}
</script>

<style scoped lang='sass'>
.menubar
  display: flex
  flex-direction: column
  padding: 48px 24px

  section
    padding-top: 48px

    &.last
      margin-top: auto

    & > .title
      font-size: 13px
      margin-bottom: 20px
</style>
