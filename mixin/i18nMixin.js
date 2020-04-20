import enLocale from '@/utils/lang/en.js'
import zhLocale from '@/utils/lang/zh.js'
import skyConsole from '@/comm/skyConsole'

var i18nMixin = {
  methods: {
    $t (key) {
      skyConsole.warn(key)
      let pointIndex = key.indexOf('.')

      if (pointIndex !== -1) {
        let key1 = key.slice(0, pointIndex)
        let key2 = key.slice(pointIndex + 1)
        if (this.lang === 'zh') {
          return zhLocale[key1] && zhLocale[key1][key2]
        } else if (this.lang === 'en') {
          return enLocale[key1] && enLocale[key1][key2]
        }
      } else {
        if (this.lang === 'zh') {
          return zhLocale[key]
        } else if (this.lang === 'en') {
          return enLocale[key]
        }
      }
    }
  }
}

export default i18nMixin