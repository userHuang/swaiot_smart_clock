<template>
  <div >
    <web ref="webview" :src="url" class="webview" @pagestart="start" @pagefinish="finish" @error="error"></web>
    <div v-if="isShowBack" style="width: 108px;height: 50px;position: absolute;top:80px;left: 0px;" @click="goBack()">
      <text class="font-style-back marginLeft-62 color-33">&#xe758;</text>
    </div>
  </div>
</template>
<script>
  import URLSearchParams from '../../utils/url-search-params.js'
  import {paramsToStr} from '../../utils/PageUtils.js'
  import skyConsole from '@/comm/skyConsole'
  import {FORGET_PASSWORD_URL, TEL_VERIFY_URL, EMAIL_VERIFY_URL} from '../../api/account'
  
  const stream = weex.requireModule('stream')
  const webview = weex.requireModule('webview')
  export default {
    data () {
      return {
        url : '',
        isLoaded: false,
        webShow: false,
        isShowBack:true,
      }
    },
    props: {
      getTokenUrl: String,
      getUserInfoUrl: String,
      redirectUrl: String,
      clientId: String,
      clientSecret: String,
      authUrl: String,
      authOption: Object,
      local: {
        default: true
      },
      isMedia: {
        type: Boolean,
        default: false
      },
      fixTestToken: {
        type: String,
        default: null
      },
    },
    computed: {
    },
    watch: {
      url (newVal, oldVal) {
        skyConsole.warn(`authwebview url changed newVal:${newVal} oldVal:${oldVal}`)
        this.webShow = newVal !== weex.config.bundleUrl && newVal !== ''
      }
    },
    created (){
      skyConsole.log('created==========')

    },
    mounted () {
      skyConsole.log('authWebView mounted')
      let url = this.authUrl
      if (this.clientId) {
        let authParams = {
          response_type: 'code',
          client_id: this.clientId,
          redirect_uri: this.redirectUrl,
          display: 'mobile'
        }
        if (this.authOption) {
          Object.assign(authParams, this.authOption)
        }
        url += paramsToStr(authParams)
      }

      skyConsole.log('authWebView url', url)
      this.url = url //'https://conn.doubimeizhi.com/vhome_weex/static/callback.html'
    },
    
    methods: {
      // getImgPath:getImgPath,
      back() {
        const navigator = weex.requireModule('navigator')
        navigator.pop({}, callback => {
          /**
           * callback:
           * {"status":"pause","errMsg":"","errUrl":"","webStatus":"","errCode":"","title":"","pageName":"NewPage-1086"}
           */
        })
      },
      getInfo (tokenResponse) {
        if (tokenResponse.ok) {
          // tokenResponse.data.access_token = '2.2cd21e2dbb44471cb83c6c214bdf220f'
          let {access_token, refresh_token} = tokenResponse.data
          stream.fetch({
            url: this.getUserInfoUrl + '?access_token=' + access_token,
            method: 'GET',
            type: 'json'
          }, (userInfoResponse) => {
            this.$emit('callback', null, tokenResponse, userInfoResponse)
          })
        } else {
          this.$emit('callback', null, tokenResponse)
        }
      },
      getToken (event) {
        let queryStr = event.url.slice(this.redirectUrl.length + 1)
        let query = URLSearchParams(queryStr)
        if (!query) {
          return
        }
        let {code, state} = query
        skyConsole.log(`code: ${code} state: ${state}`)
        var url = this.getTokenUrl + '?' +
          'grant_type=authorization_code&' +
          'code=' + code + '&' +
          'client_id=' + this.clientId + '&' +
          'client_secret=' + this.clientSecret + '&' +
          'redirect_uri=' + this.redirectUrl
        stream.fetch({
          url,
          method: 'GET',
          type: 'json'
        }, (tokenResponse) => {
          skyConsole.log(tokenResponse)
          this.getInfo(tokenResponse)
        })
      },
      reload (event) {
        skyConsole.log('will reload webview', event)
        webview.reload(this.$refs.webview)
      },
      start (event) {
        skyConsole.log('pagestart=', this.redirectUrl, '=', event.url, '=', this.local)
        if(event.url.startsWith(this.redirectUrl) && this.local) {
          if (!this.isLoaded) {
            this.isLoaded = true
            if(this.getTokenUrl){
              this.getToken(event)
            }else{
              let queryStr = event.url.slice(this.redirectUrl.length + 1)
              let query = URLSearchParams(queryStr)
              if (!query) {
                return
        }
        let {code, state} = query
              this.$emit('callback', null,null,null, code)
            }
          }
        }
      },
      finish (event) {
        skyConsole.log('pagefinish=', this.local, '=', event.url, '=', this.redirectUrl)
        if (event.url.startsWith(FORGET_PASSWORD_URL) || event.url.startsWith(TEL_VERIFY_URL)||event.url.startsWith(EMAIL_VERIFY_URL)){
          this.isShowBack = false
        }
        else {
          this.isShowBack = true
        }
        if (!this.local && event.url.startsWith(this.redirectUrl)) {
          // setTimeout(() => {
            skyConsole.log('AuthWebView finish:', event.url)
            
          // }, 5000)
        }
      },
      error (event) {
        skyConsole.log('error', event)
        if (!this.local && (event.src && (event.src.startsWith(this.redirectUrl) || event.src.startsWith(this.authUrl)))) {
          this.$emit('callback', event.errorMsg)
        }
      },
      goBack (){
        if (this.isShowBack){
          this.back()
          return false
        }
        else {
          webview.goBack(this.$refs.webview)
          return true
        }
      }
    },
  }
</script>
<style scoped>
  .webview {
   flex: 1;
  }
  .font-style-back {
    font-family: iconfont1;
    font-size: 36px
  }
  .marginLeft-62{
    margin-left: 30px;
  }
  .color-33{
    color: #333333;
  }
</style>
