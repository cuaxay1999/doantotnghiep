<template>
  <el-radio-group v-model="limit" @change="handleChange">
    <el-radio-button v-for="num in limits" :key="num" :label="num">{{ num }}</el-radio-button>
  </el-radio-group>
</template>

<script>
import { LIMITS } from '@/utils/constants'

export default {
  name: 'VLimiter',
  props: {
    limitData: {
      type: Number,
      default: LIMITS[0]
    }
  },
  data() {
    return {
      limits: LIMITS,
      limit: LIMITS[0]
    }
  },

  methods: {
    handleChange(limit) {
      this.$emit('handleChange', limit)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
