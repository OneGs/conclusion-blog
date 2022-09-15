<template>
  <div class="icon icon-structure" />
</template>

<script>
export default {
  name: "ImageIcon",

  props: {
    icon: {
      type: String,
      default: 'icon-structure'
    }
  }
}
</script>

<style scoped>
.icon {
  height: 50px;
  width: 50px;
  background-size: contain;
  background-image: url('_structure.png');
  background-repeat: no-repeat;
  background-position: center center;
}

.icon-structure {
  background-image: url('_structure.png');
}

.icon-good {
  background-image: url("_good.png");
}
</style>
