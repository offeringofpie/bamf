<template>
  <aside :class="{open: src}">
    <sidebar-options></sidebar-options>
    <nav>
      <li v-for="image in src" v-bind:key="image[0]">
        <a :href="image[2]" @click="onclick">
          <img :src="image[2]" :alt="image[1]" :index="image[0]" />
        </a>
      </li>
    </nav>
  </aside>
</template>
<script>
import Options from './options';
export default {
  props: ['src'],
  components: {
    'sidebar-options': Options
  },
  methods: {
    onclick(event) {
      this.$emit('clicked', event);
      event.preventDefault();
    }
  }
};
</script>

<style scoped src="./index.css"></style>
