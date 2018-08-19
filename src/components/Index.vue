<template>
  <div id="dropzone" @drop.prevent="onDrop" @dragenter="onDragEnter" @dragover="onDragOver" @dragleave="onDragLeave" :class="{drop: true, active: dragging == true}">
    <image-elem :src="src" />
    <input type="file" v-if="!dropped" @change="onDrop" />
  </div>
</template>
<script>
import Loader from '@/functions/loader';
import Sync from '@/functions/sync';
import Image from '@/components/Image';
const loader = new Loader();
const sync = new Sync();

export default {

  data() {
    return {
      dropped: false,
      dragging: false,
      src: ''
    }
  },
  components: {
    'image-elem': Image
  },
  methods: {
    onDrop(e) {
      let droppedFiles = [];
      let that = this;
      let files = (typeof e.dataTransfer !== 'undefined') ? e.dataTransfer.files : e.target.files;


      for (var f = 0; f < files.length; f++) {
        droppedFiles.push(files[f]);
      }


      if (sync.get('dropZone') === null) {
        sync.set('dropZone', droppedFiles);
      } else {
        let prevFiles = sync.get('dropZone');
        droppedFiles.forEach(file => {
          loader.read(file, (evt) => {
            that.src = evt;
          })
        })
      }

      e.preventDefault();
      this.dragging = false;
      this.dropped = true;

      // this.uploadedFiles.push(e.dataTransfer.files);
    },

    onDragEnter(e) {
      this.dragging = true;
      e.preventDefault();
    },
    onDragLeave(e) {
      e.preventDefault();
      this.dragging = false;
    },
    onDragOver(e) {
      e.preventDefault();
    },
  },

  mounted() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dropzone {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  transition: 0.2s all ease-in-out;
  background-color: rgba(0, 0, 0, .1);
}

input[type=file] {
  opacity: 0.0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.active {
  box-shadow: inset 0 0 0 10px rebeccapurple;
}
</style>
