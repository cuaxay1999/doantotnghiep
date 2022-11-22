<template lang="">
  <div v-loading="loading">
    <v-header :has-button="true" :button-text="$t('button.add')" :title-text="$t('title.user_list')" @buttonClick="$router.push({ name: 'UserAdd' })" />

    <div class="content-main-container">
      <div class="bg-white">
        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total" :loading="loading">
          <template #status="{ row }">
            <div class="text-center">
              <el-tag v-if="row.status" effect="dark" class="w-[65px]" type="success">Active</el-tag>
              <el-tag v-else type="danger" effect="dark" class="w-[65px]">Disable</el-tag>
            </div>
          </template>

          <template #action="{ row }">
            <div class="text-center">
              <el-button type="primary" icon="el-icon-edit" circle @click="$router.push({ name: 'UserEdit', params: { id: row.id } })" />
              <el-button v-if="row.status" type="danger" icon="el-icon-minus" circle @click="disableUser(row.id)" />
              <el-button v-else type="success" icon="el-icon-check" circle @click="activeUser(row.id)" />
            </div>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getUsers, activeUser, disableUser } from '@/apis/user'
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      results: [],

      cols: [
        {
          prop: 'name',
          label: this.$t('label.name'),
          minWidth: '200'
        },

        {
          prop: 'email',
          label: this.$t('label.email'),
          minWidth: '200'
        },

        {
          prop: 'phone',
          label: this.$t('label.phone'),
          minWidth: '200'
        },

        {
          prop: 'device',
          label: 'Thiết bị',
          minWidth: '200'
        },

        {
          prop: 'status',
          label: this.$t('label.status'),
          minWidth: '100'
        },
        {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '150'
        }
      ]
    }
  },
  async created() {
    await this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        this.loading = true
        const res = await getUsers({
          page: this.page,
          limit: this.limit
        })

        this.results = res.data.data.map((item) => {
          return {
            ...item,
            device: item?.devices?.name + '-' + item?.devices?.location
          }
        })
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async disableUser(id) {
      try {
        await disableUser(id)
        this.$vmess.success(this.$t('message.disable_user'))
        await this.getUsers()
      } catch (e) {
        this.$vmess.error(this.$t('message.error'))
      }
    },

    async activeUser(id) {
      try {
        await activeUser(id)
        this.$vmess.success(this.$t('message.enable_user'))
        await this.getUsers()
      } catch (e) {
        this.$vmess.error(this.$t('message.error'))
      }
    }
  }
}
</script>
<style lang="scss"></style>
