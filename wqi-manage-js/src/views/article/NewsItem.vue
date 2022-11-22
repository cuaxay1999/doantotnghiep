<template lang="html">
  <div
    class="card-item cursor-pointer rounded-[4px] h-full"
    @click="$router.push({ name: 'ArticleDetail', params: { id: initData.id } })"
  >
    <!-- <img class="w-full h-[200px]" :src="initData.image" /> -->
    <el-image class="w-full h-[200px]" :src="initData.image" lazy fit="cover">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline text-[28px]" />
      </div>
    </el-image>
    <div class="card-content">
      <el-tag class="rounded-full mb-1 mr-2" type="success">{{ initData.users.name }}</el-tag>
      <el-tag v-if="initData.category" class="rounded-full mb-1">{{ typeArticles[initData.category] }}</el-tag>
      <p class="font-[700] text-lg pc:text-[1.25rem] mb-1 news-title">
        {{ initData.title }}
      </p>
    </div>
  </div>
</template>
<script>
import { ARTICLE_TYPE } from '@/utils/constants'
export default {
  name: 'NewsItem',
  props: {
    initData: {
      type: Object,
      require: true,
      default: () => ({
        users: {}
      })
    }
  },
  data() {
    return {
      typeArticles: ARTICLE_TYPE
    }
  }
}
</script>
<style lang="scss" scoped>
.news-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-weight: 600;
  transition: 0.3s ease;
  -webkit-line-clamp: 2;
}
.card-item {
  border: 1px solid #ededed;
}

.card-item:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.card-content {
  padding: 0.5em;
  line-height: 1.8rem;
}

::v-deep .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
</style>
