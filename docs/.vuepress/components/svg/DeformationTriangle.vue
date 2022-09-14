<template>
  <div style="text-align: center">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-action" width="300px" height="300px">
      <path d="M30,100 L100,250 L150,200 Z" class="triangle" stroke="#aaffaa" fill="none" stroke-linecap="round" stroke-width="6px" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "DeformationTriangle"
}
</script>

<style scoped>
@keyframes triangleMove {
  0%, 100% {
    d: path('M30,100 L100,250 L150,200 Z')
  }
  50% {
    d: path('M30,80 L80,150 L250,200 Z')
  }
}

.triangle {
  animation: triangleMove 4s ease-in-out infinite forwards;
}
</style>