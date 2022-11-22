<template>
  <header class="header flex align-items-center">
    <v-icon v-if="titleIcon" :icon-class="titleIcon" class="f-3 icon" /> {{ titleText }}

    <el-button v-if="hasButton && hasPermission" :icon="buttonIcon" class="ml-auto btn--green btn" @click="handleClick">
      {{ buttonText }}
    </el-button>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
  props: {
    buttonIcon: {
      type: String,
      default: 'el-icon-circle-plus'
    },
    buttonText: {
      type: String,
      default: ''
    },
    titleText: {
      type: String,
      default: ''
    },
    titleIcon: {
      type: String,
      default: ''
    },
    hasButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasPermission() {
      return this.$store.getters['token']
    }
  },
  methods: {
    handleClick() {
      this.$emit('buttonClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  background-color: white;
  font-weight: 600;
  font-size: 1.25rem;

  .icon {
    margin-right: 0.5rem;
  }
}
</style>
