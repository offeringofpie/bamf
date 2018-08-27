<template>
  <section class="carousel">
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
  watch: {
    index: (n,o) => {
      let el = document.querySelector('[index="'+n+'"]');
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}
</script>

<style scoped src="./styles.css"></style>
