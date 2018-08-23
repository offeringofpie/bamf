<template lang="html">
  <footer :class="{open: src}">
    <nav>
      <li v-for="image in src" v-bind:key="image[0]" @click="onclick" @onTap="onclick">
        <a :href="image[2]" :index="image[0]" :style="{'background-image': `url(${image[2]})`}" :alt="image[1]" :class="{active: index == image[0]}">
          <span>{{ image[0] }}</span>
        </a>
      </li>
    </nav>
  </footer>
</template>

<script>
export default {
  props: ['src','index'],
  methods: {
    onclick(event) {
      this.$emit('clicked', event);
      event.preventDefault();
    }
  }
};
</script>

<style scoped src="./styles.css"></style>
