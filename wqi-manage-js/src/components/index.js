import Vue from 'vue'
import VTable from '@/components/table/VTable'
import VIcon from '@/components/icon/VIcon'
import VHeader from '@/components/component-header/VHeader'
import VUpload from '@/components/upload/VUpload'
import VLimiter from '@/components/limiter/VLimiter'
import { VueEditor } from 'vue2-editor'

Vue.component('v-table', VTable)
Vue.component('v-icon', VIcon)
Vue.component('v-header', VHeader)
Vue.component('v-upload', VUpload)
Vue.component('v-limiter', VLimiter)
Vue.component('wqi-item', () => import('@/components/wqi-item/WqItem.vue'))
Vue.component('v-editor', VueEditor)
