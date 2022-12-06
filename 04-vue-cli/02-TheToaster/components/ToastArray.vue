<template>
  <div class="toasts">
    <ui-toast  v-for="toast in toasts" :type="toast.toastType">
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
    },
  },

  components: { UiToast },
};
</script>
