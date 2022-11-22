import { Message } from 'element-ui'
import i18n from '@/plugins/i18n'

export default class MessageUtil {
  static success(message = i18n.t('text.success')) {
    Message.closeAll()
    return Message({
      message: message,
      type: 'success',
      duration: 2000,
      offset: 10
    })
  }
  static error(message = i18n.t('text.exception'), duration = 3000) {
    Message.closeAll()
    return Message({
      message: message,
      type: 'error',
      duration: duration,
      offset: 10
    })
  }
}

