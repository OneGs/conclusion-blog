<template>
  <div style="margin: 1rem 0">
    <button
      id="button"
      @click="click"
    >
      <svg viewBox="0 0 194.6 185.1">
        <polygon
          fill="#FFD41D"
          points="97.3,0
                  127.4,60.9
                  194.6,70.7
                  145.9,118.1
                  157.4,185.1
                  97.3,153.5
                  37.2,185.1
                  48.6,118.1
                  0,70.7
                  67.2,60.9"
        >
          <animate
            id="animation-to-check"
            begin="indefinite"
            fill="freeze"
            attributeName="points"
            dur="500ms"
            to="110,58.2
                147.3,0
                192.1,29
                141.7,105.1
                118.7,139.8
                88.8,185.1
                46.1,156.5
                0,125
                23.5,86.6
                71.1,116.7"
          />

          <animate
            id="animation-to-green"
            begin="indefinite"
            fill="freeze"
            attributeName="fill"
            dur="500ms"
            to="#53B848"
          />

          <animate
            id="animation-to-star"
            begin="indefinite"
            fill="freeze"
            attributeName="points"
            dur="500ms"
            to="97.3,0
                127.4,60.9
                194.6,70.7
                145.9,118.1
                157.4,185.1
                97.3,153.5
                37.2,185.1
                48.6,118.1
                0,70.7
                67.2,60.9"
          />

          <animate
            id="animation-to-yellow"
            begin="indefinite"
            fill="freeze"
            attributeName="fill"
            dur="500ms"
            to="#FFD41D"
          />
        </polygon>
      </svg>

      <span id="button-text">Save</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "DeformationButton",

  methods: {
    click() {
      document.getElementById('animation-to-check').beginElement()

      document.getElementById('animation-to-green').beginElement()

      setTimeout(() => {
        document.getElementById('animation-to-star').beginElement()

        document.getElementById('animation-to-yellow').beginElement()
      }, 3000)
    }
  }
}
</script>

<style scoped>
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border: 0 #409eff;
}

button:hover, button:active {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

button svg {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}

button span {
  font-size: 16px;
  position: relative;
  top: 4px;
  color: white;
}
</style>