<template>
    <div class="tooltip">
      <div v-if="content" class="tooltip-content">
        <p class="tooltip-text" v-html="content"></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Tooltip',
    props: {
      content: {
        required: true
      }
    },
    mounted() {
      addEventListener('mousemove', (event) => {
        this.handleMouseMove(event)
      })
      this.$el.style.position = 'fixed'
      addEventListener('wheel', () => {
        this.$el.style.display = 'none'
      })
      addEventListener('touchmove', () => {
        this.$el.style.display = 'none'
      })
    },
    methods: {
      handleMouseMove(event) {
        if (event.clientX + 10 + this.$el.offsetWidth > window.innerWidth) {
          this.$el.style.left = `${event.clientX - this.$el.offsetWidth - 10}px`
        } else {
          this.$el.style.left = `${event.clientX + 10}px`
        }
        this.$el.style.top = `${event.clientY + 10}px`
      }
    }
  }
  </script>
  
  <style scoped>
    .tooltip {
      position: relative;
      display: inline-block;
      background-color: white;
      padding: 10px 20px;
      border-radius: 5px;
      width: 256px;
      box-shadow: 2px 2px 5px var(--text-color);
    }
  </style>