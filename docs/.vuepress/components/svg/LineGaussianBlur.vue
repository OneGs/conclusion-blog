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
          <feGaussianBlur in="SourceGraphic" result="blur" :stdDeviation="index" />
        </filter>

        <filter :id="`halo${index}-merge`" v-for="index in 30" :key="'merge' + index" v-if="merge">
          <feGaussianBlur in="SourceGraphic" result="blur" :stdDeviation="index" />
          <feOffset in="blur" result="offset" x="10" y="10" />
          <feBlend in2="SourceGraphic" in="blur" />
        </filter>
      </defs>

      <path d="M0,0 L60,10 L100,100 L150,150 L200,230 L230,100 L250,50 L280,120 L300,0"
            fill="none"
            stroke="url(#stroke)"
            stroke-width="6"
            stroke-linecap="round"
            :filter="halo ? merge ? `url(#halo${rangeValue}-merge)` : `url(#halo${rangeValue})` : ''"
      />
    </svg>

    <div class="range" v-if="std">
      <input id="rangeInput" type="range" @input="change" min="1" max="30">
      <span>{{ rangeValue }}</span>
    </div>
  </div>
</template>

<script>

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
    }
  },

  data() {
    return {
      rangeValue: 10,
    }
  },

  methods: {
    change(event) {
      this.rangeValue = event.target.value
    }
  },

  mounted() {
    const range = this.$el.querySelector('#rangeInput')

    range && range.setAttribute('value', this.rangeValue)
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