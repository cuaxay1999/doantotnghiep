<template lang="html">
  <div>
    <v-header :title-text="$t('title.artile_add')" title-icon="news" />
    <div class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form :model="form" :rules="rules">
          <!-- title -->
          <el-form-item label="Tiêu đề bài viết" prop="title">
            <el-input v-model="form.title" class="w-100" maxlength="200" show-word-limit placeholder="Tiêu đề" />
          </el-form-item>

          <!-- type -->
          <el-form-item label="Chọn loại bài viết" prop="category">
            <el-select v-model="form.category" class="w-full" filterable placeholder="Chọn loại bài viết">
              <el-option v-for="(name, val) in typeArticles" :key="val" :label="name" :value="val" />
            </el-select>
          </el-form-item>
        </el-form>

        <p class="mb-3">Nội dung bài viết</p>
        <v-editor v-model="form.content" class="mb-[1em]" />

        <div class="mb-1-em">
          <p class="mb-[1em]">Ảnh minh họa</p>

          <!-- :on-preview="handlePreview"
						:on-remove="handleRemove" -->
          <el-upload
            class="upload-demo"
            :action="$cloudinaryUrl"
            :file-list="fileList"
            :http-request="submitImage"
            list-type="picture"
            :auto-upload="true"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </div>

        <div class="text-right mt-1-em">
          <el-button class="btn--green btn" icon="el-icon-circle-check" :loading="loading" @click="onSubmit">
            Save
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ARTICLE_TYPE } from '@/utils/constants'
import { creaetArticle } from '@/apis/article'
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      fileList: [],
      typeArticles: ARTICLE_TYPE,
      form: {
        content: '',
        title: '',
        category: '',
        image: ''
      },
      rules: {
        title: {
          required: true,
          message: 'Vui lòng nhập tiêu đề bài viết',
          trigger: 'blur'
        },
        category: {
          required: true,
          message: 'Vui lòng nhập tiêu đề bài viết',
          trigger: 'blur'
        }
      }
    }
  },

  methods: {
    async submitImage(data) {
      try {
        const formData = new FormData()

        formData.append('file', data.file)
        formData.append('upload_preset', this.$imgPreset)

        const res = await axios.post(this.$cloudinaryUrl, formData)
        this.form.image = res.data.url
      } catch (e) {
        this.$vmess.error('Submit imgage fail, please try again')
      }
    },
    async onSubmit() {
      this.loading = true
      try {
        await creaetArticle(this.form)
        this.$vmess.success('Tạo  bài viết thành công')
        this.$router.push({ name: 'Article' })
      } catch (err) {
        this.$vmess.error('Đã có lỗi xảy ra')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang=""></style>
