<template>
  <div class="line">
    <svg id="svg" class="svg-chart" viewBox="-32 -32 500 300">
      <defs>
        <linearGradient id="stroke" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" style="stop-color:#FFBE20"></stop>
          <stop offset="0.5" style="stop-color:#FF764A"></stop>
          <stop offset="1" style="stop-color:#E31088"></stop>
        </linearGradient>

        <filter :id="`halo${index}`" v-for="index in 30" :key="index" v-if="halo && !merge">
          <feGaussianBlur in="SourceGraphic" result="blur" :stdDeviation="index"/>
        </filter>

        <filter :id="`halo${index}-merge`" v-for="index in 30" :key="'merge' + index" v-if="merge">
          <feGaussianBlur in="SourceGraphic" result="blur" :stdDeviation="index"/>
          <feOffset in="blur" result="offset" x="10" y="10"/>
          <feBlend in2="SourceGraphic" in="blur"/>
        </filter>
      </defs>

      <path id="rootPath" d="M0,0 L60,10 L100,100 L150,150 L200,230 L230,100 L250,50 L280,120 L300,0"
            fill="none"
            stroke="url(#stroke)"
            stroke-width="6"
            stroke-linecap="round"
            :stroke-dasharray="dash ? `${dashValue}, 30`: '0, 0'"
            :filter="halo ? merge ? `url(#halo${rangeValue}-merge)` : `url(#halo${rangeValue})` : ''"
      />
    </svg>

    <div class="range" v-if="std">
      <input id="rangeInput" type="range" @input="change" min="1" max="30">
      <span>{{ rangeValue }}</span>
    </div>

    <div class="range" v-if="dash && dashRange">
      <input id="dashInput" type="range" @input="change" min="50" max="200" v-model="dashValue">
      <span>{{ dashValue }}</span>
    </div>
  </div>
</template>

<script>
let id = 0;

export default {
  name: "LineGaussianBlur",

  props: {
    halo: {
      type: Boolean,
      default: false
    },

    std: {
      type: Boolean,
      default: false
    },

    merge: {
      type: Boolean,
      default: false
    },

    transition: {
      type: Boolean,
      default: false
    },

    transitionOffset: {
      type: Boolean,
      default: false
    },

    dash: {
      type: Boolean,
      default: false
    },

    dashRange: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      rangeValue: 10,
      dashValue: 50,
    }
  },

  methods: {
    change(event) {
      this.rangeValue = event.target.value
    },

    animationDashArray(rootPath) {
      const animationKeyForm = `@keyframes rangeDash${id} {0% {stroke-dasharray: 0, ${rootPath.getTotalLength() + 1};}100% {stroke-dasharray: ${rootPath.getTotalLength() + 1}, 0;}}`

      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = animationKeyForm;

      document.head.append(style)

      rootPath.style.animation = `rangeDash${id} 4.5s cubic-bezier(0.65, 0, 0.45, 1) infinite`
    },

    animationDashOffset(rootPath) {
      rootPath.setAttribute('stroke-dasharray', `${rootPath.getTotalLength() + 1}`)
      rootPath.setAttribute('stroke-dashoffset', `${rootPath.getTotalLength() + 1}`)


      const animationKeyForm = `@keyframes rangeDashOffset${id} {0% {stroke-dashoffset: ${rootPath.getTotalLength() + 1};}100% {stroke-dashoffset: 0;}}`

      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = animationKeyForm;

      document.head.append(style)

      rootPath.style.animation = `rangeDashOffset${id} 4.5s cubic-bezier(0.65, 0, 0.45, 1) infinite`
    },
  },

  created() {
    id += 1
  },

  mounted() {
    const range = this.$el.querySelector('#rangeInput')

    range && range.setAttribute('value', this.rangeValue)

    const rootPath = this.$el.querySelector('#rootPath')

    if (!rootPath) return

    this.transition && this.animationDashArray(rootPath)

    this.transitionOffset && this.animationDashOffset(rootPath)
  }
}
</script>

<style scoped>
.line {
  width: 100%;
  height: 300px;
  position: relative;
}

.range {
  position: absolute;
  top: 16px;
  right: 16px;
}

.svg-chart {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
  box-sizing: content-box;
  transform: rotateX(180deg);
}
</style>