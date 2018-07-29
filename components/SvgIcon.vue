<template lang="pug">
svg(:viewBox="icon.viewBox", :width="icon.viewBox.split(' ')[2]", :height="icon.viewBox.split(' ')[3]")
  use(:xlink:href="'#'+icon.id")
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      icons: {
        cosmic: require('~/assets/icons/cosmic-js.svg').default,
        email: require('~/assets/icons/email.svg').default,
        skype: require('~/assets/icons/skype.svg').default,
        prev: require('~/assets/icons/prev.svg').default,
        next: require('~/assets/icons/next.svg').default,
        play: require('~/assets/icons/play.svg').default,
        pause: require('~/assets/icons/pause.svg').default,
        playBig: require('~/assets/icons/play-big.svg').default,
        pauseBig: require('~/assets/icons/pause-big.svg').default,
        send: require('~/assets/icons/send.svg').default
      }
    }
  },
  computed: {
    icon () {
      return this.icons[this.name]
    }
  }
}
</script>

<style scoped lang='sass'>
svg
  display: block
  transform: translateX(0px)
</style>
