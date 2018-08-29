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
      let el = document.querySelector('[index="'+n+'"]');
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
  methods: {
    handleScroll(ev) {
      let el = document.querySelector('[index="'+this.index+'"]');
      let elPosX = el.getBoundingClientRect().x;

      if (this.scrolling != -1) {
        clearTimeout(this.scrolling);
      }

      this.scrolling = window.setTimeout(()=>{
        if (elPosX < 0) {
          let nextEl = el.parentElement.nextSibling.querySelector('img');
          nextEl.scrollIntoView({ behavior: "smooth" });
          this.$emit('scrolled', el.parentElement.nextSibling.querySelector('img'));
        } else if (elPosX > 0) {
          let nextEl = el.parentElement.previousSibling.querySelector('img');
          nextEl.scrollIntoView({ behavior: "smooth" });
          this.$emit('scrolled', el.parentElement.previousSibling.querySelector('img'));
        }
      }, 200);
    },
  }
}
</script>

<style scoped src="./styles.css"></style>
