<template lang="html">
  <div>
    <v-header :title-text="$t('title.device_add')" title-icon="user" />
    <div class="content-main-container">
      <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto box-shadow-bordered">
        <el-form ref="form" label-position="top" :model="formData" :rules="rules">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('router.device')" prop="name">
                <el-input v-model="formData.name" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.location')" prop="location">
                <el-input v-model="formData.location" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.longtitude')" prop="lon">
                <el-input v-model="formData.lon" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.latitude')" prop="lat">
                <el-input v-model="formData.lat" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-right mt-1-em">
            <el-button class="btn--green btn" icon="el-icon-circle-check" :loading="loading" @click="updateDevice">
              {{ $t('button.save') }}
            </el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
import { getDeviceById, updateDevice } from '@/apis/device'
export default {
  data() {
    return {
      loading: false,
      formData: {},

      rules: {
        name: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.name') }),
          trigger: 'blur'
        },
        lat: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.latitude') }),
          trigger: 'blur'
        },
        lon: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.longtitude') }),
          trigger: 'blur'
        },
        location: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.location') }),
          trigger: 'blur'
        }
      }
    }
  },

  computed: {
    id() {
      return this.$route.params.id
    }
  },

  async created() {
    await this.getDevice()
  },
  methods: {
    async updateDevice() {
      try {
        this.loading = true
        await this.$refs.form.validate()
        const { name, location, lat, lon } = this.formData
        await updateDevice(this.id, {
          name,
          location,
          lat,
          lon
        })
        this.$vmess.success(this.$t('message.update_success'))
        this.$router.push({ name: 'DeviceList' })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async getDevice() {
      try {
        this.loading = true
        const res = await getDeviceById(this.id)
        this.formData = res.data.item
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
