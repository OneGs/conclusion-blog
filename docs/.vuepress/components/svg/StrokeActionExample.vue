<template>
  <div>
    <svg-stroke-action view-box="-32 -32 500 300">
      <path
        id="rootPath"
        d="M0,0 L60,10 L100,100 L150,150 L200,230 L230,100 L250,50 L280,120 L300,0"
        fill="none"
        stroke="#235fa7"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg-stroke-action>
  </div>
</template>

<script>
import SvgStrokeAction from "../../componentsLocal/SvgStrokeAction.vue";

export default {
  name: "StrokeAction",

  components: {SvgStrokeAction}
}
</script>

<style scoped>

</style>