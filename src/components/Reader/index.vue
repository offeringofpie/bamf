<template>
<div class="reader" :class="{'adapt': width}">
  <carousel :src="src" :index="index" @scrolled="setIndex"></carousel>
  <footer-element :src="src" @clicked="setIndex" :index="index"></footer-element>
  <toaster :message="toaster_message" :time="toaster_time"></toaster>
</div>
</template>
<script>

import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import Toast from '@/components/Toast';
import { listen } from '@/functions/listen';

export default {
  props: ['src'],
  data() {
    return {
      index: 0,
      width: false,
      toaster_message: '',
      toaster_time: 0,
    }
  },
  components: {
    'carousel': Carousel,
    'footer-element': Footer,
    'toaster': Toast
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
    },
    popup(message, time) {
      this.toaster_message = message;
      this.toaster_time = time;
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

      if (e.keyCode == 188 && e.shiftKey) {
        this.popup(`<p>Testing</p>`,3000);
        console.log(this.toaster_message,this.toaster_time);
      }

      this.index = Math.max(0, parseInt(this.index) + delta);
    });
  }
};
</script>

<style src="./styles"></style>
