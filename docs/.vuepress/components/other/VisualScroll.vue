<script>
let scrollBarWidth;

const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

function scrollbarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

function renderThumbStyle({move, size, bar}) {
  const style = {};
  const translate = `translate${bar.axis}(${move}%)`;

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;

  return style;
};

export default {
  name: "VisualScroll",

  components: {
    'v-scroll': {
      props: {
        viewStyle: String,
        isVertical: {
          type: Boolean,
          default: true
        }
      },

      data() {
        return {
          sizeWidth: '0',
          sizeHeight: '0',
          moveX: 0,
          moveY: 0
        };
      },

      computed: {
        wrap() {
          return this.$refs.wrap;
        }
      },

      methods: {
        update() {
          let heightPercentage, widthPercentage;
          const wrap = this.wrap;
          if (!wrap) return;

          heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
          widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

          this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
          this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
        },

        handleScroll(e) {
          const wrap = this.wrap;

          if (this.isVertical) {
            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
          }

          if (!this.isVertical) {
            e.stopPropagation()

            const eventDelta = e.wheelDelta || -e.deltaY * 40

            this.wrap.scrollLeft = this.wrap.scrollLeft - eventDelta / 4

            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
          }

        }
      },

      components: {
        'v-scroll-bar': {
          props: {
            vertical: Boolean,
            size: String,
            move: Number
          },

          computed: {
            bar() {
              return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
            },
          },

          render(h) {
            const {size, move, bar} = this;

            return h('div', {
              class: ['el-scrollbar__bar', 'is-' + bar.key],
            }, [
              h('div', {
                ref: 'thumb',
                class: ['el-scrollbar__thumb'],
                style: renderThumbStyle({size, move, bar})
              })
            ])
          }
        },
      },

      mounted() {
        this.$nextTick(this.update)
      },

      render(h) {
        const gutter = scrollbarWidth() // 获得scrollbar的宽度

        const view = h('div', {
          class: ['el-scrollbar__view'],
          style: this.viewStyle,
          ref: 'resize',
        }, this.$slots.default)

        const onKey = this.isVertical ? 'scroll' : 'wheel'

        const wrap = h('div', {
          ref: 'wrap',
          class: ['el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'],
          on: {
            [onKey]: this.handleScroll,
          },
        }, [view])

        const nodes = [
          wrap,
          h('v-scroll-bar', {
            props: {
              move: this.moveX,
              size: this.sizeWidth
            }
          }),
          h('v-scroll-bar', {
            props: {
              vertical: true,
              move: this.moveY,
              size: this.sizeHeight
            }
          })
        ]

        return h('div', {
          class: 'el-scrollbar',
        }, nodes)
      }
    }
  },

  render(h) {
    const vScroll = h('v-scroll', {
      class: ['scroll-class'],
      style: {
        height: '300px',
      }
    }, Array(20).fill(1).map((val, index) => {
      return h('h1', {
        key: index,
        style: {
          border: '1px solid red'
        }
      }, [index])
    }))

    let scrollTop = null, scrollLeft = null;

    function disableScroll() {
      scrollTop = document.documentElement.scrollTop;
      scrollLeft = document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      }
    }

    function enableScroll() {
      setTimeout(() => {
        window.onscroll = function () {
          scrollLeft = scrollTop = null
        }
      }, 300)
    }

    const vScrollX = h('v-scroll', {
      class: ['scroll-X'],
      style: {
        width: '100%',
        whiteSpace: 'nowrap',
      },
      props: {
        isVertical: false,
      },
      nativeOn: {
        mouseenter: disableScroll,
        mouseleave: enableScroll
      },
    }, Array(45).fill(1).map((val, index) => {
      return h('div', {
        key: index,
        style: {
          display: 'inline-block',
          height: '100px',
          width: '200px',
          border: '1px solid red'
        }
      }, [index])
    }))

    return h('div', {}, [h('h3', '竖向滚动'), vScroll, h('h3', '横向滚动'), vScrollX])
  }
}
</script>

<style>
.el-scrollbar {
  overflow: hidden;
  position: relative;
}

.el-scrollbar__wrap {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.el-scrollbar__wrap::-webkit-scrollbar {
  display: none;
}


.el-scrollbar:hover > .el-scrollbar__bar,
.el-scrollbar:active > .el-scrollbar__bar,
.el-scrollbar:focus > .el-scrollbar__bar {
  opacity: 1;
  transform: opacity 340ms ease-out;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow: scroll;
  /* overflow-x: hidden; */
  height: 100%;
}

.el-scrollbar .el-scrollbar__wrap.el-scrollbar__wrap--hidden-default {
  scrollbar-width: none;
}


.el-scrollbar .el-scrollbar__wrap.el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.el-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 120ms ease-out;
}

.el-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}

.el-scrollbar__bar.is-vertical > div {
  width: 100%;
}

.el-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}

.el-scrollbar__bar.is-horizontal > div {
  height: 100%;
}

.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: #909399FF;
  transition: .3s background-color
}

.el-scrollbar__thumb:hover {
  background-color: #909399FF;
}
</style>
