<template>
  <component
    :is="dynamicComponent"
    v-if="dynamicComponent"
  />
</template>

<script>
export default {
  name: "ImageIcon",

  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('../../componentsAsync/VisualScroll').then(({ default: _ }) => {
      this.dynamicComponent = _
    })
  }
}
</script>
