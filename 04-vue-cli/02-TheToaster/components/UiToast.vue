<template>
    <div
      :id="id"
      class="toast"
      :class="toastClass"
    >
      <ui-icon class="toast__icon" :icon="getIcon" />
      <slot/>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

const types = {
  'success': 'check-circle',
  'error': 'alert-circle',
}

export default {
  name: 'TheToaster',

  props: {
    'type': {
      type: String,
      validator: (name) => Object.keys(types).includes(name),
    }
  },

  data() {
    return {
      intervalId: null,
      id: (Math.random() + 1).toString(36).substring(2),
    };
  },

  components: { UiIcon },

  computed: {
    toastClass() {
      return 'toast_' + this.type;
    },
    getIcon() {
      return types[this.type];
    },
  },

  created() {
    this.intervalId = setInterval(() => {
      document.getElementById(this.id).remove();
      clearInterval(this.intervalId);
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
