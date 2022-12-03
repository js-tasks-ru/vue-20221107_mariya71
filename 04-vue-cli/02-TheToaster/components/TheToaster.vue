<template>
  <div class="toasts">
    <ToastArray :toasts="toastArray" v-if="toastArray.length > 0"/>
  </div>
</template>

<script>
import ToastArray from "./ToastArray";
import toastArray from "./ToastArray";

export default {
  name: 'TheToaster',

  data() {
    return {
      toastArray: [],
      cnt: 0,
    };
  },

  /*computed: {
    arrayLength() {
      return toastArray.length;
    },
  },*/

  watch: {
    cnt() {
      this.deleteToast();
    },
  },

  components: { ToastArray },

  methods: {
    error(val) {
      this.addVal('error', val);
    },
    success(val) {
      this.addVal('success', val);
    },
    addVal(type, text) {
      this.cnt++;
      this.toastArray.push({
        toastType: type,
        toastText: text,
      });
    },
    deleteToast() {
      setTimeout(() => {
        this.toastArray.splice(0, 1);
      }, 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
