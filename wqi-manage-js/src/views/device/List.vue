<template>
  <div>
    <v-header :has-button="$store.getters['role'] === roles.SUPER_ADMIN" :button-text="$t('button.add')" :title-text="$t('title.device_list')" @buttonClick="$router.push({ name: 'DeviceAdd' })" />
    <div class="content-main-container">
      <div class="bg-white">
        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
          <template #action="{ row }">
            <div class="text-center">
              <el-button type="success" icon="el-icon-edit" circle @click="$router.push({ name: 'DeviceEdit', params: { id: row.id } })" />
              <!-- <el-button type="primary" icon="el-icon-right" circle /> -->
            </div>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import pagingMixins from '@/mixins/pagination'
import { getDevices } from '@/apis/device'
import { ROLES } from '@/utils/constants'
export default {
  name: 'DeviceList',
  mixins: [pagingMixins],
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      results: [],
      roles: ROLES,

      cols: [
        {
          prop: 'name',
          label: this.$t('router.device'),
          minWidth: '30'
        },
        {
          prop: 'location',
          label: this.$t('label.location'),
          minWidth: '30'
        },
        {
          prop: 'lat',
          label: this.$t('label.latitude'),
          minWidth: '20'
        },
        {
          prop: 'lon',
          label: this.$t('label.longtitude'),
          minWidth: '20'
        },
        {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '20'
        }
      ]
    }
  },
  async created() {
    await this.getDevices()
  },
  methods: {
    async getDevices() {
      try {
        this.loading = true
        const res = await getDevices({
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
