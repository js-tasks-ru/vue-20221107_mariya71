import { createApp } from './vendor/vue.esm-browser.js';
import {defineComponent} from "vue";

// Создайте Vue приложение

const App = defineComponent({
  name: 'App',

  data() {
    return {
      num1: 0,
      num2: 0,
      operator: 'sum',
    };
  },

  computed: {
    resultValue() {
      let i = 0;

      switch (this.operator) {
        case 'sum':
          i = this.num1 + this.num2;
          break;
        case 'subtract':
          i = this.num1 - this.num2;
          break;
        case 'multiply':
          i = this.num1 * this.num2;
          break;
        case 'divide':
          i = Math.round((this.num1 / this.num2) * 100) / 100;
          break;
        default:
          i = this.num1 + this.num2;
          break;
      }

      return i;
    },
  },

});

const app = createApp(App);
const vm = app.mount('#app');
