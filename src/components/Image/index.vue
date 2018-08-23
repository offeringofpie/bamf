<template>
<div class="image">
  <carousel :src="src" :index="index"></carousel>
  <footer-element :src="src" @clicked="setIndex" :index="index"></footer-element>
</div>
</template>
<script>
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';

export default {
  props: ['src'],
  data() {
    return {
      index: 0
    }
  },
  components: {
    'carousel': Carousel,
    'footer-element': Footer
  },
  methods: {
    setIndex(event) {
      this.index = event.target.getAttribute('index');
    }
  }
};
</script>

<style src="./styles"></style>
