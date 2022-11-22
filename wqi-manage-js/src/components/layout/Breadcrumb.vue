<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  updated() {
    this.customBreadcrumbText()
  },
  mounted() {
    this.customBreadcrumbText()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      /* const first = matched[0]

      if (!this.isTopPage(first)) {
        matched = [{ path: '/', meta: { title: 'TOP' }}].concat(matched)
      }*/

      this.levelList = []
      matched.map(function(item) {
        if (!item.meta || !item.meta.title || item.meta.breadcrumb === false) {
          return
        }

        if (item.meta.breadcrumb && Array.isArray(item.meta.breadcrumb)) {
          return item.meta.breadcrumb.map(function(breadcrumb) {
            this.levelList.push(this.$router.resolve({
              name: breadcrumb
            }).route)
          }.bind(this))
        }

        this.levelList.push(item)
      }.bind(this))
    },
    isTopPage(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'TOP'.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    customBreadcrumbText() {
      this.$nextTick(() => {
        const breadcrumbWrapper = document.getElementsByClassName('app-breadcrumb')[0] ?? false
        let breadcrumbCustom = ''
        if (breadcrumbWrapper && breadcrumbWrapper.offsetWidth >= (window.innerWidth - 200)) {
          breadcrumbCustom = document.getElementsByClassName('el-breadcrumb__inner')[1] ?? false
          if (breadcrumbCustom) {
            breadcrumbCustom.getElementsByTagName('a')[0].innerHTML = '...'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
