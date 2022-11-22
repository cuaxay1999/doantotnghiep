<template>
  <div class="v-upload-container">
    <div class="upload-text" @click="handleClick">
      <el-button icon="el-icon-upload2" class="btn--blue">{{ $t('button.upload') }}</el-button>
      <div>{{ $t('text.image_type') }}</div>
      <input ref="input" type="file" class="d-none" accept="image/*" @change="handleChange" />
    </div>

    <transition name="fade-transform">
      <ul v-if="url" class="image-list">
        <li class="image-list-items flex align-items-center">
          <img :src="url" alt="image" class="thumbnail" />
          <span class="file-name">{{ fileName }}</span>
          <span class="btn--close" @click="handleDelete">
            <i class="el-icon-close" />
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VUpload',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      url: undefined,
      fileName: undefined
    }
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },

    handleChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.$emit('update:images', [file])
        this.url = URL.createObjectURL(file)
        this.fileName = file?.name
      }
    },

    handleDelete() {
      this.url = undefined
      this.fileName = undefined
      this.$emit('update:images', [])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.v-upload-container {
  font-size: 0.75em;
}

.image-list {
  padding: 0;
  margin-top: 0.75em;

  .image-list-items {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    transition: all 8s cubic-bezier(0.55, 0, 0.1, 1);
    cursor: pointer;
    position: relative;

    &:not(:first-child) {
      margin-top: 1em;
    }
  }
  .thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .file-name {
    color: #606266;
    display: block;
    margin: 0 0.75em;
    overflow: hidden;
    padding-left: 8px;
    text-overflow: ellipsis;
    transition: color 0.3s;
    white-space: nowrap;
  }

  .btn--close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    z-index: 2;
    font-size: 1.25em;
    cursor: pointer;

    &:hover {
      color: $primaryColor;
    }
  }
}
</style>
