import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение

const App = defineComponent({
  'name': 'App',

  data() {
    return {
      meetupId: 1,
      meetupName: null,
    };
  },

  watch: {
    async meetupId(newValue, oldValue) {
      let answer = await fetchMeetupById(newValue);
      this.meetupName = answer.title;
    },
  },

});

const app = createApp(App);
const vm = app.mount('#app');
