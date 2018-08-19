<template>
<div class="image" :src="src">
  <sidebar :src="src" @clicked="setIndex"></sidebar>
  <section v-if="index">
    <img :src="src[index][2]" />
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
  }

  aside.open + section img {
    width: 80vw;
  }

  aside.open.small + section img {
    width: 95vw;
    max-width: calc(100% - 250px);
  }

  .image section img {
    width: 100vh;
    min-height: 100vh;
  }

</style>
