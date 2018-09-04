<template>
  <div class="toast" v-if="active">
    <a href="#" class="close" @click="close">
      <span>Close</span>
    </a>
    <div class="message" v-html="message">

    </div>
  </div>
</template>
<script>
export default {
  props: ['message', 'time'],
  data() {
    return {
      active: false,
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.active = false;
    }),
    this.time
  }
};
</script>

<style scoped src="./index.css"></style>
