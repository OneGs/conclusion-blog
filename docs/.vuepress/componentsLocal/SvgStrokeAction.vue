<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
    <defs>
      <filter id="gaussianBlurFilter">
        <feGaussianBlur in="SourceGraphic" result="gaussianBlur" stdDeviation="20" />
      </filter>

      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0" style="stop-color:#FFBE20"></stop>
        <stop offset="1" style="stop-color:#E31088"></stop>
      </radialGradient>
    </defs>

    <circle r="10" cx="2" cy="2" fill="url(#gradient)" />

    <slot />
  </svg>
</template>

<script>
export default {
  name: "SvgStrokeAction",

  props: {
    width: {
      type: String,
      default: '200'
    },

    height: {
      type: String,
      default: '200'
    },

    viewBox: {
      type: String,
      default: '0 0 200 200'
    },
  },

  data() {
    return {
      svgInfo: {}
    }
  },

  mounted() {
    this.parse()
  },

  methods: {
    parse() {
      const defaultSlot = this.$slots.default
    }
  }
}
</script>

<style scoped>

</style>