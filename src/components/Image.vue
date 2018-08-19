<template>
<div class="image" :src="src">
  <sidebar :src="src" @clicked="setIndex"></sidebar>

  <section v-if="index">
    <img v-for="image in src" v-bind:key="image[0]" 
      :src="image[2]" :alt="image[1]" :index="image[0]" 
      :class="{active: index == image[0],toRight: index < image[0], toLeft: index > image[0]}"
    />
  </section>
</div>
</template>
<script>
import sidebar from '@/components/sidebar';

export default {
  props: ['src'],
  data() {
    return {
      index: ''
    }
  },
  components: {
    'sidebar': sidebar
  },
  methods: {
    setIndex(event) {
      this.index = event.target.getAttribute('index');
    }
  }
};
</script>

<style>
  .image section {
    text-align: right;
    height: 0;
  }

  aside.open ~ section img.active {
    width: 80vw;
  }

  aside.open.small ~ section img.active {
    width: 95vw;
    max-width: calc(100% - 250px);
  }

  .image section img {
    transform: scaleX(0);
    transition: 0.2s all ease-in-out;
    min-height: 0;
    height: 0;
    opacity: 0;
  }

  section img.active {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    opacity: 1;
    transform: scaleX(1);
  }

  section img.toLeft {
    transform-origin: middle left;
  }

  section img.toRight {
    transform-origin: middle right;
  }
</style>
