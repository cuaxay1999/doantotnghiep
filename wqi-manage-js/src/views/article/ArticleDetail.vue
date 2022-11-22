<template>
  <div v-loading="loading" class="content-main-container">
    <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto">
      <div class="text-right">
        <el-button v-if="hasPermission" type="danger" icon="el-icon-close" @click="deleteArticle">Xóa</el-button>
      </div>
      <p class="font-bold text-[1.5em] mb-1">{{ news.title }}</p>
      <p class="mb-[1em] italic text-sm">{{ news.users.name }} - {{ news.created }}</p>
      <div>
        <el-image v-if="news.image" class="w-full mb-4 object-contain h-[600px]" :src="news.image" lazy fit="cover" />
      </div>
      <p class="news" v-html="news.content" />
    </main>
  </div>
</template>
<script>
import { getArticleById, deleteArticle } from '@/apis/article'
import moment from 'moment'
export default {
  name: 'NewDetail',
  data() {
    return {
      news: {
        users: {}
      },
      loading: false
    }
  },

  computed: {
    hasPermission() {
      return this.$store.getters['token']
    }
  },
  async created() {
    await this.getNewsDetail()
  },

  methods: {
    async getNewsDetail() {
      try {
        this.loading = true
        const res = await getArticleById(this.$route.params.id)
        this.news = res.data.item
        this.news.created = moment(res.data.item.created_at).format('DD/MM/YYYY')
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async deleteArticle() {
      this.loading = true
      await deleteArticle(this.$route.params.id)
      this.$message.success('Xóa bài viết thành công')
      this.loading = false
      this.$router.push({ name: 'Article' })
    }
  }
}
</script>
<style lang="scss">
.news img {
  // width: 100%;
  margin: 0 auto;
}
</style>
