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

<style scoped>
  aside {
    position: fixed;
    width: 20vw;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 1px 0px 16px -8px;
    transform-origin: left;
    transform: scaleX(0);
    transition: 0.2s all ease-in-out;
    opacity: 0;
  }

  .open {
    transform: scaleX(1);
    opacity: 1;
  }

  .open.small {
    width: 5vw;
    min-width: 250px;
  }

  li {
    padding: 1em;
    text-align: center;
    list-style: none;
  }

  nav {
    margin: 0;
    padding: 0;
    position: relative;
    height: 100vh;
    overflow-y: auto;
  }

  img {
    width: 100%;
    max-width: 250px;
  }
</style>
