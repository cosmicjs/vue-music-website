<template lang='pug'>
a.cosmic-logo(href='https://cosmicjs.com')
  .text
    .pre Powered by
    .brand Cosmic JS
  .icon: svg-icon(name='cosmic')
</template>

<script>
import SvgIcon from '~/components/SvgIcon.vue'

export default {
  components: {
    SvgIcon
  },
  name: 'cosmic-logo'
}
</script>

<style scoped lang='sass'>
.cosmic-logo
  display: flex
  align-items: center
  color: inherit
  text-decoration: none

  .text
    font-size: 13px

    .brand
      font-weight: 600

  .icon
    margin-left: 16px
</style>
