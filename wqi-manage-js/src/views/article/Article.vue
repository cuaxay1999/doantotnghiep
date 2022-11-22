<template lang="html">
  <div v-loading="loading">
    <v-header
      has-button
      :button-text="$t('button.add')"
      :title-text="$t('title.artile')"
      title-icon="news"
      @buttonClick="$router.push({ name: 'ArticleAdd' })"
    />

    <section class="content-main-container">
      <main v-if="results.length" class="box-shadow-bordered bg-white rounded-[5px] p-[1em] min-h-[75vh]">
        <el-row :gutter="24" class="mb-[2em] flex-wrap" type="flex">
          <el-col v-for="item in results" :key="item.id" :xs="12" :md="6" :sm="12" :lg="6" :xl="6" class="mb-[1em]">
            <NewsItem :init-data="item" />
          </el-col>
        </el-row>

        <el-pagination
          :key="reloadPagination"
          :hide-on-single-page="true"
          align="center"
          background
          :total="total"
          :page-size="limit"
          :current-page="page"
          layout="prev, pager, next"
          class="py-[1em]"
          @current-change="changePage"
        />
      </main>

      <el-empty v-else description="No result" />
    </section>
  </div>
</template>
<script>
import NewsItem from './NewsItem'
import { getArticles } from '@/apis/article'

export default {
  name: 'NewList',
  components: { NewsItem },
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      reloadPagination: 1,
      results: []
    }
  },
  watch: {
    page(val) {
      this.page = val
      this.reloadPagination += 1
    }
  },
  async created() {
    await this.getArticles()
  },

  methods: {
    async changePage(page) {
      this.page = page
      await this.getArticles()
    },

    async getArticles() {
      try {
        this.loading = true
        const res = await getArticles({
          page: this.page,
          limit: this.limit
        })

        this.results = res.data.data
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss"></style>
