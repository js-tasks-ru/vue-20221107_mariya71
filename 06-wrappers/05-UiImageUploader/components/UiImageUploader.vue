<template>
  <div class="image-uploader">
    <label @click="currentStatus == 2 ? removePreview() : null"
           class="image-uploader__preview"
           :class="{'image-uploader__preview-loading': currentStatus == 1}"
           :style="currentStatus == 2 && `--bg-url: url('${image}')`">
      <span class="image-uploader__text">{{ loaderText }}</span>
      <input v-if="currentStatus != 2"
        ref="imageUploader"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @input="filesChange($event)"
      />
    </label>
  </div>
</template>

<script>

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'UiImageUploader',

  props: {
    preview: String,
    uploader: Function,
  },

  data() {
    return {
      uploadedFile: File,
      uploadError: null,
      currentStatus: this.preview ? STATUS_SUCCESS : STATUS_INITIAL,
    };
  },

  emits: ['remove', 'upload'],

  computed: {
    loaderText() {
      switch (this.currentStatus) {
        case 0:
          return 'Загрузить изображение';
          break;
        case 1:
          return 'Загрузка..';
          break;
        case 2:
          return 'Удалить изображение';
          break;
        case 3:
          return 'Ошибка загрузки';
          break;
      };
    },
    image() {
      if (this.preview) {
        return this.preview;
      } else if (this.uploadedFile) {
        return URL.createObjectURL(this.uploadedFile);
      }
    },
  },

  methods: {
    removePreview() {
      this.$emit('remove');
      this.uploadedFile = null;
      this.currentStatus = STATUS_INITIAL;
    },
    save() {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      this
        .uploader(this.uploadedFile)
        .then(x => {
          this.$emit('upload', x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err;
          this.currentStatus = STATUS_FAILED;
          this.$refs['imageUploader'].value = null;
        });
    },
    filesChange(event) {
      this.uploadedFile = event.target.files[0];

      this.currentStatus = STATUS_SUCCESS;
      if (this.uploader) {
        this.save();
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
