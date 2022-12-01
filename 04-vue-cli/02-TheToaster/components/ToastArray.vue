<template>
  <div class="toasts">
    <ui-toast  v-for="toast in activeToasts" :type="toast.toastType">
      <span>{{ toast.toastText }}</span>
    </ui-toast>
  </div>
</template>

<script>
import UiToast from "./UiToast";

export default {
  name: 'ToastArray',

  props: {
    'toasts': {
      type: Array,
    }
  },

  computed: {
    activeToasts() {
      return this.toasts.filter(toast => new Date().getTime() - toast.timestamp < 5000);
    },
  },

  components: { UiToast },

};
</script>
