<template lang="html">
  <div>
    <v-header :title-text="$t('title.user_add')" title-icon="user" />
    <div class="content-main-container">
      <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto box-shadow-bordered">
        <el-form ref="form" label-position="top" :model="form" :rules="rules">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.name')" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.phone')" prop="phone">
                <el-input v-model="form.phone" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input v-model="form.email" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item :label="$t('label.device')" prop="device_id">
                <el-select v-model="form.device_id" class="w-full">
                  <el-option v-for="(device, index) in devices" :key="index" :value="device.id" :label="`${device.name} - ${device.location}`" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-row :gutter="24">
                <el-col :sm="12" :xs="12" :md="12" :lg="12">
                  <el-form-item :label="$t('label.password')" prop="password">
                    <el-input v-model="form.password" class="w-full" type="password" />
                  </el-form-item>
                </el-col>

                <el-col :sm="12" :xs="12" :md="12" :lg="12">
                  <el-form-item :label="$t('label.confirm_password')" prop="password_confirm">
                    <el-input v-model="form.password_confirm" type="password" class="w-full" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="text-right mt-1-em">
            <el-button class="btn--green btn" icon="el-icon-circle-check" :loading="loading" @click="createUser">
              {{ $t('button.save') }}
            </el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
import { register } from '@/apis/user'
import { getDevices } from '@/apis/device'

export default {
  data() {
    return {
      loading: false,
      devices: [],
      form: {
        name: '',
        phone: '',
        email: '',
        password: '',
        device_id: '',
        password_confirm: ''
      },

      rules: {
        name: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.name') }),
          trigger: 'blur'
        },
        phone: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.phone') }),
          trigger: 'blur'
        },
        device_id: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.device') }),
          trigger: 'blur'
        },
        email: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.email') }),
          trigger: 'blur'
        },
        password: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.password') }),
          trigger: 'blur'
        },
        password_confirm: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.confirm_password') }),
          trigger: 'blur'
        }
      }
    }
  },

  async created() {
    await this.getDevices()
  },
  methods: {
    async createUser() {
      try {
        this.loading = true
        await this.$refs.form.validate()
        await register(this.form)
        this.$vmess.success(this.$t('message.add_new_user'))
        this.$router.push({ name: 'UserList' })
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
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
