import { HTTP_STATUS } from '@/utils/constants'

export default {
  methods: {
    injectFormValidates(errResponse) {
      if (errResponse.status === HTTP_STATUS.VALIDATION) {
        const errorDatas = errResponse.data.errors
        for (let i = 0; i < this.fields.length; i++) {
          const field = this.fields[i].prop
          if ((errorDatas.messages && errorDatas.messages[field] !== undefined) || (errorDatas && errorDatas[field] !== undefined)) {
            this.fields[i].validateMessage = (errorDatas.messages && errorDatas.messages[field]) ? errorDatas.messages[field][0] : (errorDatas && errorDatas[field] ? errorDatas[field] : '')
            this.fields[i].validateState = 'error'
          }
        }
      }
    }
  }
}
