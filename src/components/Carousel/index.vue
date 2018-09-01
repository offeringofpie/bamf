<template>
  <section class="carousel" @scroll="handleScroll">
    <div class="carousel-item" v-for="image in src" v-bind:key="image[0]">
      <img :src="image[2]" :alt="image[1]" :index="image[0]"
           :class="{active: index == image[0],toRight: index < image[0], toLeft: index > image[0]}"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: ['src','index'],
  data() {
    return {
      scrolling: -1
    }
  },
  watch: {
    index: (n,o) => {
      let el = document.querySelector('[index="'+n+'"]').parentElement;
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
  methods: {
    /**
     * Scroll handler
     * @param  {Event} ev Scrolling event
     */
    handleScroll(ev) {
      let el = document.querySelector('[index="'+this.index+'"]').parentElement;

      if (this.scrolling != -1) {
        clearTimeout(this.scrolling);
      }

      this.scrolling = window.setTimeout(()=>{
        /**
         * Check which sibling is visible
         * @type {Array}
         */
        let visible = [...el.parentElement.querySelectorAll(el.nodeName)].find(sib => {
          return sib.getBoundingClientRect().left >= 0;
        });

        let elPosX = visible.getBoundingClientRect().x;
        let prevPosX = visible.previousSibling.getBoundingClientRect().x;

        if (elPosX > 0 && elPosX <= window.innerWidth/2) {
          visible.scrollIntoView({ behavior: "smooth" });
          this.$emit('scrolled', visible.querySelector('img'));
        } else if (prevPosX < 0 && prevPosX > -window.innerWidth/2) {
          let prevEl = visible.previousSibling;
          prevEl.scrollIntoView({ behavior: "smooth" });
          this.$emit('scrolled', prevEl.querySelector('img'));
        }
      }, 200);
    },
  }
}
</script>

<style scoped src="./styles.css"></style>
