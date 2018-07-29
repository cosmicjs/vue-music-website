<template lang='pug'>
.app-layout
  menubar.menubar
  nuxt.page-content
</template>

<script>
import Menubar from '~/components/Menubar.vue'

export default {
  components: {
    Menubar
  }
}
</script>

<style scoped lang='sass'>
.app-layout
  display: flex
  min-height: 100vh

  .menubar
    width: 256px
    flex-shrink: 0

  .page-content
    flex-grow: 1
</style>

<style lang='sass'>
html
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0
</style>

