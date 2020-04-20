ad<template>
  <div @viewappear="onViewAppear" @viewdisappear="onViewDisappear" @clickbackitem="onBackBtn">
<!--    <StatusBar ref="statusBar" :statusBarWhite="false"></StatusBar>-->
    <div style="height: 66px;width: 1920px"></div>
    <AuthWebView
      ref="webview"
      :src="authUrl"
      :isMedia="true"
      class="webview"
      v-bind="options"
      @callback="callback"
    ></AuthWebView>
  </div>
</template>
<script>
// import {AUTH_URL_MIDEA, REDIRECT_URI_MIDEA} from '../../utils/const.js'
import { parseUrl } from '../../utils/PageUtils'
import AuthWebView from './AuthWebView.vue'
// 
// import {queryBindInfo} from '../utils/utils'
const meta = weex.requireModule('meta')
meta.setViewport({
  width: 1920,
  reserveCssStyles: true,
})
export default {
  // 
  components: {
    AuthWebView
  },

  data() {
    // let { params } = parseUrl()
    let { url, params } = parseUrl() || {}
    params = Object.assign({}, app.config.params, params)
    console.log('params === ', params)
    let resultUrl = params.resultUrl
    let authUrl = params.authUrl
    // let redirectUrl = REDIRECT_URI_MIDEA
    // let local = false
    return {
      resultUrl: resultUrl,
      options: {
        // getUserInfoUrl: GET_USER_INFO_MIDEA,
        redirectUrl: resultUrl,
        authUrl,
        local: false
      }
    }
  },
  destroyed() {},
  methods: {
    onBackBtn() {
      this.back()
    },
    onViewAppear() {},
    callback(error, tokenResponse) {
      console.log('callback', error, tokenResponse)
      let { params } = this.parseUrl(tokenResponse)
      console.log('callback param:', params)
      if (tokenResponse.startsWith(this.resultUrl) && params.code === '0') {
        this.back()
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin: 50px;
}
.group {
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}
.input {
  width: 600px;
  font-size: 36px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-width: 2px;
  border-style: solid;
  border-color: #bbbbbb;
}
.button {
  top: 65px;
  left: 10px;
  position: absolute;
  width: 90px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  border-width: 2px;
  border: #bbbbbb;
  /* background-color: #D3D3D3; */
  font-size: 28px;
}
.webview {
  flex: 1;
}
</style>
