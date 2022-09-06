<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-action"  :viewBox="viewBox">
    <defs>
      <filter id="gaussianBlurFilter">
        <feGaussianBlur in="SourceGraphic" result="gaussianBlur" stdDeviation="20" />
      </filter>

      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff" stop-opacity="1" />
        <stop offset="100%" stop-color="#fff" stop-opacity="0" />
      </radialGradient>

      <mask id="movePoint">
        <circle cx="0" cy="0" r="80" fill="url(#gradient)">
          <animateMotion path="M0,0 L60,10 L100,100 L150,150 L200,230 L230,100 L250,50 L280,120 L300,0" dur="4s" repeatCount="indefinite"></animateMotion>
        </circle>
      </mask>
    </defs>

    <slot />
  </svg>
</template>

<script>
export default {
  name: "SvgStrokeAction",

  props: {
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
    animationDashArray(rootPath) {
      const animationKeyForm = `@keyframes rangeDash {0% {stroke-dasharray: 0, ${rootPath.getTotalLength() + 1};}100% {stroke-dasharray: ${rootPath.getTotalLength() + 1}, 0;}}`

      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = animationKeyForm;

      document.head.append(style)

      rootPath.style.animation = `rangeDash 4s linear infinite`
    },

    parse() {
      const defaultSlot = this.$slots.default.at(0)
      const newElement = defaultSlot.elm.cloneNode()
      newElement.style.stroke = '#4fd2dd'
      newElement.setAttribute('mask', 'url(#movePoint)')

      this.animationDashArray(newElement)

      this.$el.append(newElement)
    }
  }
}
</script>

<style scoped>
.stroke-action {
  width: 100%;
  height: 100%;
}
</style>