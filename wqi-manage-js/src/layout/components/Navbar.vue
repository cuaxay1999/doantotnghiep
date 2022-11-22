<template>
  <div class="navbar flex items-center justify-between">
    <div>
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
    </div>

    <el-form v-if="$route.name === 'home'">
      <el-form-item>
        <el-select v-model="device_id" placeholder="Select" class="w-[240px]" @change="changeDevice">
          <el-option v-for="item in devices" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="right-menu">
      <el-dropdown v-if="token" class="avatar-container" trigger="click">
        <div class="avatar-wrapper no-select flex align-items-center">
          <el-avatar icon="el-icon-user-solid" class="avt-image" />
          <span>{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display: block">{{ $t('common.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Hamburger from '../../components/layout/Hamburger'
import { getDevices } from '@/apis/device'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },

  data() {
    return {
      devices: [],
      device_id: ''
    }
  },

  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'token'])
  },

  async created() {
    await this.getDevices()
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },

    async getDevices() {
      try {
        const res = await getDevices()

        this.devices = res.data.items
        this.device_id = this.devices[0].id
        this.$store.commit('user/SET_DEVICE_ID', this.device_id)
      } catch (e) {
        console.log(e)
      }
    },

    changeDevice(val) {
      this.$store.commit('user/SET_DEVICE_ID', val)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        cursor: pointer;
        font-weight: 600;
        position: relative;

        .avt-image {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
