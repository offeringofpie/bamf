<template>
<div class="reader" :class="{'adapt': width}">
  <carousel :src="src" :index="index" @scrolled="setIndex"></carousel>
  <footer-element :src="src" @clicked="setIndex" :index="index"></footer-element>
</div>
</template>
<script>
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import { listen } from '@/functions/listen';

export default {
  props: ['src'],
  data() {
    return {
      index: 0,
      width: false
    }
  },
  components: {
    'carousel': Carousel,
    'footer-element': Footer
  },
  methods: {
    setIndex(el) {
      this.index = el.getAttribute('index');
    },
    plusIndex() {
      this.index = this.index++;
    },
    minusIndex() {
      this.index = this.index--;
    }
  },
  mounted() {
    listen(window, 'keyup', (e) => {
      let delta = 0;
      switch (e.keyCode) {
        case 37: delta = -1; break;
        case 39: delta = 1; break;
        case 87: this.width = !this.width; break;
      }

      this.index = Math.max(0, parseInt(this.index) + delta);
    });
  }
};
</script>

<style src="./styles"></style>
