<template>
  <div v-loading.fullscreen.lock="loading">
    <v-header :has-button="false" :button-text="$t('button.add')" :title-text="$t('title.wqi')" />
    <div class="content-main-container">
      <main class="box-shadow-bordered bg-white rounded-[5px] p-[1em]">
        <!-- header -->
        <el-row class="mb-[1em]">
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <el-form label-position="left" label-width="120px">
              <el-form-item :label="$t('label.device')" prop="device_id">
                <el-select v-model="deviceId" class="w-full" clearable @change="getInfor">
                  <el-option v-for="(device, index) in devices" :key="index" :value="device.id" :label="`${device.name} - ${device.location}`" />
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!-- result table -->
        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total" @onChangePage="onChangePage" />
      </main>
    </div>
  </div>
</template>
<script>
import { getInfors } from '@/apis/infor'
import { getDevices } from '@/apis/device'

import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      results: [],
      page: 1,
      limit: 20,
      total: 0,
      devices: [],
      deviceId: null,
      cols: [
        {
          prop: 'device',
          label: this.$t('router.device'),
          minWidth: '10'
        },
        {
          prop: 'time',
          label: this.$t('label.time'),
          minWidth: '10'
        },
        {
          prop: 'temperature',
          label: this.$t('label.temperature'),
          minWidth: '10'
        },
        {
          prop: 'ph',
          label: this.$t('label.pH'),
          minWidth: '10'
        },
        {
          prop: 'turbidity',
          label: this.$t('label.turbidity'),
          minWidth: '10'
        },
        {
          prop: 'do',
          label: this.$t('label.DO'),
          minWidth: '10'
        },
        {
          prop: 'nh4',
          label: this.$t('label.NH4'),
          minWidth: '10'
        },
        {
          prop: 'bod5',
          label: this.$t('label.BOD5'),
          minWidth: '10'
        },
        {
          prop: 'tss',
          label: this.$t('label.tss'),
          minWidth: '10'
        },
        {
          prop: 'coliform',
          label: this.$t('label.coliform'),
          minWidth: '10'
        },
        {
          prop: 'wqi',
          label: this.$t('label.wqi'),
          minWidth: '10'
        }
      ]
    }
  },

  async created() {
    await Promise([this.getInfor(), this.getDevices()])
  },

  methods: {
    async getInfor() {
      this.loading = true
      const res = await getInfors({ limit: this.limit, page: this.page, device_id: this.deviceId })
      this.results = res.data.data.map((item) => {
        return {
          device: item.devices.name,
          temperature: Number(item.temperature).toFixed(2),
          ph: Number(item.ph).toFixed(2),
          turbidity: Number(item.turbidity).toFixed(2),
          do: Number(item.do).toFixed(2),
          nh4: Number(item.nh4).toFixed(2),
          bod5: Number(item.bod).toFixed(2),
          tss: Number(item.tss).toFixed(2),
          coliform: Number(item.coliform).toFixed(2),
          wqi: Number(item.wqi).toFixed(2),
          time: moment(item.created_at).format('HH:mm YYYY/MM/DD')
        }
      })
      this.total = res.data.total
      this.loading = false
    },

    async onChangePage(page) {
      this.page = page
      await this.getInfor()
    },

    async getDevices() {
      try {
        this.loading = true
        const res = await getDevices()
        this.devices = res.data.items
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
