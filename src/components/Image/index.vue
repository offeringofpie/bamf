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
import Sidebar from '@/components/Sidebar';

export default {
  props: ['src'],
  data() {
    return {
      index: ''
    }
  },
  components: {
    'sidebar': Sidebar
  },
  methods: {
    setIndex(event) {
      this.index = event.target.getAttribute('index');
    }
  }
};
</script>

<style src="./styles"></style>
