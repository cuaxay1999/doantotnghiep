<template>
  <div v-loading="loading">
    <div v-if="Object.keys(wqi).length" class="content-main-container">
      <!-- device list -->
      <h3 class="text-[2em] mb-3"><v-icon icon-class="location" /> Chất lượng nước tại {{ wqi.location }}</h3>
      <p class="mb-6"><span class="text-xs font-bold">Cập nhật mới nhất lúc</span> {{ wqi.time }}</p>
      <el-row :gutter="24" class="mb-4">
        <el-col :xs="24" :sm="24" :md="12" class="mb-[1rem]">
          <wqi-item :wqi="wqi" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" class="mb-[1rem]">
          <!-- <section class="card-items h-[300px]">

          <div class="flex align-items-center card-header">
            <p class="title-text">Chất lượng nước theo khu vực</p>

          </div>

          <ul class="card-content">
            <li v-for="device in devices" :key="device.id" class="card-content-items flex align-items-center">
              <div class="max-w-85">
                <div>{{ device.name }}</div>
                <div class="location"><i class="el-icon-map-location" />: {{ device.location }}</div>
              </div>
              <p class="ml-auto f-2 wqi--number" :class="wqiCaculateStatus(45.5)">45.4</p>
            </li>
          </ul>
        </section> -->
          <iframe
            v-if="device"
            class="h-[300px] w-full"
            :src="'https://www.google.com/maps?output=embed&t=m&hl=en&z=18&ll=' + device.lat + ',' + device.lon + '&q=' + device.lat + ',' + device.lon"
            allowfullscreen
            loading="lazy"
          />

          <div class="text-right mt-[1em]">
            <el-button type="primary" @click="goToMap(device.lat, device.lon)">Xem trên bản đồ <i class="el-icon-top-right" /></el-button>
          </div>
        </el-col>
      </el-row>

      <div class="mb-[24px]">
        <div class="card-header">Bảng quy đổi giá trị WQI</div>
        <v-table :table-data="wqiTable" :columns="cols">
          <template #text="{ row }">
            <div :class="row.color" class="text-center text-[#000] h-[56px] leading-[56px]">{{ row.text }}</div>
          </template>
        </v-table>
      </div>

      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <p class="card-header">Biểu đồ thay đổi WQI theo thời gian</p>

          <div class="bg--white box-shadow-bordered p-2">
            <apexchart type="bar" :height="450" :options="chartOptions" :series="series" class="w-full px-[1rem] h-[400px]" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else><el-empty /></div>
  </div>
</template>
<script>
import { dashboard } from '@/apis/infor'
import { wqiCaculateStatus } from '@/utils/common'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      wqi: {},
      chartOptions: {
        chart: {
          id: 'Biểu đồ thay đổi WQI theo thời gian'
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: 'WQI',
          data: []
        }
      ],

      device: null,
      loading: false,
      cols: [
        {
          prop: 'val',
          label: 'Giá trị WQI',
          minWidth: '100'
        },
        {
          prop: 'status',
          label: 'Mức độ đánh giá chất lượng nước',
          minWidth: '300'
        },
        {
          prop: 'text',
          label: 'Hành động',
          minWidth: '100'
        }
      ],

      wqiTable: [
        {
          val: '91 - 100',
          status: 'Sử dụng cho mục đích cấp nước sinh hoạt',
          color: 'wqi--good',
          text: 'Tốt'
        },
        {
          val: '76 - 90',
          status: 'Sử dụng cho mục đích cấp nước sinh hoạt nhưng cần biện pháp xử lý phù hợp',
          color: 'wqi--medium',
          text: 'Trung bình'
        },
        {
          val: '51 - 75',
          status: 'Sử dụng cho mục đích tưới tiêu và mục đích tương đương khác',
          color: 'wqi--mid',
          text: 'Kém'
        },
        {
          val: '26 - 50',
          status: 'Sử dụng cho giao thông thủy và các mục đích tương đương khác',
          color: 'wqi--warning',
          text: 'Tệ'
        },
        {
          val: '10 - 25',
          status: 'Nước ô nhiễm nặng, cần các biện pháp xử lý trong tương lai',
          color: 'wqi--bad',
          text: 'Ô nhiễm'
        },
        {
          val: '< 10',
          status: 'Nước nhiễm độc, cần có biện pháp khắc phục, xử lý',
          color: 'wqi--danger',
          text: 'Ô nhiễm nặng'
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['deviceId'])
  },

  watch: {
    deviceId: {
      async handler(val) {
        await this.getInfor(val)
      },
      immediate: true
    }
  },

  async created() {
    try {
      await this.getInfor()
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    wqiCaculateStatus,
    async getInfor(deviceId) {
      try {
        if (deviceId) {
          this.loading = true
          const res = await dashboard({ device_id: deviceId })
          this.wqi = {}
          const xaxis = []
          this.series[0].data = res.data.items?.infors?.map((item) => {
            xaxis.push(moment(item.created_at).format('HH:mm MM/DD'))
            return Number(item.wqi).toFixed(1)
          })

          this.chartOptions = {
            ...this.chartOptions,
            xaxis: {
              categories: xaxis
            }
          }

          const { devices, nh4, bod, turbidity, temperature, wqi, created_at } = res.data.items.newest
          const dO = res.data.items.newest.do
          const pH = res.data.items.newest.ph

          this.wqi = {
            location: devices.location,
            time: moment(created_at).format('HH:mm MM/DD'),
            nh4: this._formatNumber(nh4),
            bod: this._formatNumber(bod),
            turbidity: this._formatNumber(turbidity),
            temperature: this._formatNumber(temperature),
            wqi: this._formatNumber(wqi),
            dO: this._formatNumber(dO),
            pH: this._formatNumber(pH)
          }

          this.device = devices
        }
      } catch (e) {
        this.wqi = {}
      } finally {
        this.loading = false
      }
    },

    goToMap(lat, lon) {
      window.open('http://maps.google.com/maps?q=' + lat + '+' + lon + '&t=m&z=14', '_blank')
    },

    _formatNumber(num) {
      return Number(num).toFixed(1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
::v-deep .el-table .el-table__cell {
  padding: 0;
}

.title-text {
  width: fit-content;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  background-color: $primaryColor;
  font-weight: 700;
  color: white;
}

.p-2 {
  padding: 0.5rem;
}

.card-items {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  // border: 1px solid #f1f2f3;
  border-radius: 4px;
  background-color: white;

  .wqi--number {
    padding: 0 8px;
    border-radius: 4px;
    color: white;
  }

  .card-header {
    padding: 1rem;
    cursor: pointer;
    border-bottom: 1px solid #e8e8e8;
    transition: all 0.2s ease-in;
  }

  .card-content {
    padding: 0.5rem 0;

    .card-content-items {
      padding: 0.75rem;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      &:hover {
        box-shadow: 0 6px 18px -8px rgba(94, 86, 105, 0.56);
        color: $primaryColor !important;
      }

      &:hover::before {
        display: block;
      }
    }

    .card-content-items::before {
      content: '';
      height: 100%;
      width: 3px;
      background-color: $primaryColor;
      position: absolute;
      left: 0;
      display: none;
    }
  }
}
</style>
