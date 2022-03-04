<template>
  <q-page>
    <iframe src="https://www.overleaf.com/" style="width: 100%;" :height="page_height" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes"></iframe>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      page_height: 600
    }
  },
  created() {
    //
  },
  mounted() {
    this.page_height = document.body.offsetHeight
    window.addEventListener("resize", this.resize_height);
  },
  methods: {
    resize_height() {
      this.page_height = document.body.offsetHeight
    }
  }
});
</script>
