import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: 'PageMeetup',

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: {},
      loading: false,
      error: false,
      errorText: 'Unknown Error',
    };
  },

  async created() {
    this.meetup = this.loadMeetup();
  },

  watch: {
    meetupId: function(newVal, oldVal) {
      this.loadMeetup();
    }
  },

  methods:{
    async loadMeetup() {
      try {
        this.error = false;
        this.loading = true;

        this.meetup = await fetchMeetupById(this.meetupId);

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorText = error;
      }
    },
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="loading || !meetup">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      <UiContainer v-else-if="error">
        <UiAlert>{{ errorText }}</UiAlert>
      </UiContainer>
      <MeetupView :meetup="meetup" v-else/>
    </div>`,
});
