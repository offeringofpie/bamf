<template>
  <!-- <div class="image" :src="src">
    <span v-for="image in src">
      <img :src="image[2]" :alt="image[1]" :index="image[0]" />
    </span>
  </div> -->
  <mu-carousel transition="fade" cycle="false" v-if="src">
    <mu-carousel-item v-for="image in src" :key="image[0]">
      <img :src="image[2]" :alt="image[1]" :index="image[0]" />
    </mu-carousel-item>
  </mu-carousel>
</template>
<script>
export default {
  props: ['src']
};
</script>

<style scoped>
  span {
    float: left
  }

  img {
    max-height: 100vh;
  }

  .mu-carousel-item > img {
    min-width: 0;
    width: auto;
    max-height: 100vh;
  }

  .mu-carousel {
    height: 100vh;
  }
</style>
