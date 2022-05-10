<template>
  <div>
    <span v-if="isIcon" :class="[icon]"/>
    <svg
        v-else
        class="svg-icon"
        aria-hidden="true"
    >
    <use :xlink:href="`#${icon}`" />
    </svg>
  </div>
</template>

<script>
import a from '../../assets/svgs/message.svg'
import '../../assets/svgs/alipay.svg'

export default {
  name: "index",

  props: {
    icon: {
      type: String,
      default: 'icon-iconfontdown'
    }
  },

  computed: {
    isIcon() {
      return /^icon/.test(this.icon)
    },
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
</style>
