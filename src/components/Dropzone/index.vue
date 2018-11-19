<template>
  <div id="dropzone" @drop.prevent="onDrop" @dragenter="onDragEnter" @dragover="onDragOver" @dragleave="onDragLeave" :class="{active: dragging == true}">
    <image-elem v-if="src" :src="src" />
    <input type="file" v-if="!dropped" id="file"  name="file" @change="onDrop" ref="fileElem"/>
    <label for="file" v-if="!dropped">To open a comic book file,<br>click anywere on the page,<br>or drop it anywere on the page.</label>
  </div>
</template>
<script>
import Loader from '@/functions/loader';
import Sync from '@/functions/sync';
import Reader from '@/components/Reader';

const ipcRenderer = window.require("electron").ipcRenderer;
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
    'image-elem': Reader,
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
    }
  },
};
</script>
<style scoped src="./styles"></style>
