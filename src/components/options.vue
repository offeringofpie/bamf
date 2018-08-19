<template>
    <div class="options">
        <a href="#" class="decrease" @click="decrease"><span>Decrease</span></a>
        <a href="#" class="bottom"><span>Bottom</span></a>
        <a href="#" class="settings"><span>Settings</span></a>
    </div>
</template>
<script>
export default {
    methods: {
        decrease: (ev) => {

        }
    }
}
</script>
<style scoped>
a {
    text-decoration: none;
}
a span {
    display:none;
  }

a:before {
    font-size: 3em;
    color: rebeccapurple;
    display: inline-block;
    text-align: center;
    width: 33%;
  }

.left:before {
    content: '\27e6';
  }

.bottom:before {
    content: '\23b5';
  }

.settings:before {
    content: '\2699';
  }
</style>

