import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие
  props: {
    count: {
      required: true,
      default: 0,
    },
  },

  methods: {
    plusOne(value) {
      this.$emit('update:count', value);
    },
  },

  template: `<button @click="plusOne(count+1)" type="button">{{ count }}</button>`,
});
