<template>
  <div class="q-pa-md">
    <!--
      Anything after view="lHh lpr lFf" is only needed
      so we can display this example in the documentation

      Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
    -->
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header id="header" elevated>
        <q-bar class="q-electron-drag">
          <q-icon name="insert_emoticon" />
          <div>Overleaf</div>

          <q-space />

          <q-btn dense flat icon="minimize" @click="minimize" />
          <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
          <q-btn dense flat icon="close" @click="closeApp" />
        </q-bar>

        <div class="q-pa-sm q-pl-md row items-center">
          <div class="cursor-pointer non-selectable">
            Page Copy
          </div>

          <div class="q-ml-md cursor-pointer non-selectable">
            Source Only
          </div>

          <div class="q-ml-md cursor-pointer non-selectable">
            Preview Only
          </div>

        </div>
      </q-header>

      <div :style="`padding-top: ${header_height}px`">
        <router-view />
      </div>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      header_height: 50
    }
  },
  setup() {
  },
  methods: {
    minimize () {
      window.eleAPI.minimize()
    },
    toggleMaximize () {
      window.eleAPI.toggleMaximize()
    },
    closeApp () {
      window.eleAPI.close()
    },
    resize_height () {
      this.header_height = document.getElementById("header").offsetHeight
    }
  },
  mounted() {
    this.header_height = document.getElementById("header").offsetHeight
    // this.page_height = document.body.offsetHeight
    window.addEventListener("resize", this.resize_height);
  }
});
</script>
