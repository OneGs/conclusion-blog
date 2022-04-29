<template>
  <svg xmlns="http://www.w3.org/2000/svg">
    <rect id="animateObject" x="20" y="20" width="50" height="50" fill="blue"></rect>
    <animateTransform
        xlink:href="#animateObject"
        attributeName="transform"
        type="scale"
        begin="0s"
        dur="3s"
        from="1"
        to="2"
        repeatCount="indefinite"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon"
}
</script>
