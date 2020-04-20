<template>
  <div class = "body" >
    <AuthWebView ref="webview" :src="url" class="webview" v-bind="options" @callback="callback"></AuthWebView>
    <!-- <web v-if="webShow" ref="webview" :src="url" class="webview" @pagestart="start" @pagefinish="finish" @error="error"></web>
    <div v-if="isShowBack" style="width: 88px;height: 50px;position: absolute;top: 33px;left: 31px;" @click="goBack()">
      <image style="width: 50px;height: 50px;" :src="getImgPath('ic_dark_leftback')">
      </image>
    </div> -->
  </div>
</template>

<style scoped>
  .webview {
    position: absolute;
   flex: 1;
  }
  .body {
    flex: 1;
    background-color: #fbfbfb;
  }
</style>

<script>
  import { ref, toRefs, reactive, computed, watch, onBeforeMount, onMounted, provide, inject } from '@vue/composition-api'
  import VueCompositionApi from '@vue/composition-api'
  Vue.use(VueCompositionApi)
  import AuthWebView from './AuthWebView'
  import {parseUrl} from '@/utils/PageUtils.js'
  import { CLIENT_ID_COOCAA_WJ, REDIRECT_URI_WJ, AUTH_URL_COOCAA } from '../../api/account'
  import {COOCAA_ACCOUNT } from '../../comm/symbol'
  import skyConsole from '@/comm/skyConsole'
  import { getService } from '../../comm/context'
  const navigator = weex.requireModule('navigator')
  var _InstanceService = getService()
  export default {
    components:{AuthWebView},
    setup () {
      skyConsole.log('autoCoocaa begin')
      console.log('autoCoocaa begin')
      skyConsole.log('autoCoocaa begin')
      let url = ''
      let params = {}
      skyConsole.log(params)
      let clientId = params.clientId || CLIENT_ID_COOCAA_WJ
      let clientSecret = '' //'R!hPNERjKSR,|~x='
      let scopes = params.scopes || 'profile'
      let state = params.state || ''
      let redirectUrl = params.redirectUri || REDIRECT_URI_WJ
      let local = true
      // let webview = ref(null)
      skyConsole.log('Index setup _InstanceService: ')
      let load_symbols = [COOCAA_ACCOUNT]
      skyConsole.log(`Index setup load_symbols: ${JSON.stringify(load_symbols)}`)
      const global_object_map = _InstanceService.getGlobalData(load_symbols)
      const coocaa_accout = global_object_map[COOCAA_ACCOUNT]
      let isLogin = coocaa_accout.is_login
      function onBackBtn (){
          skyConsole.log('onBackBtn====')
        let canGoBack = webview.value.goBack()
        if (!canGoBack){
          navigator.pop()
        }
      }
      function callback (error, tokenResponse, userInfoResponse, code) {
        skyConsole.log('callback:===',error, tokenResponse, userInfoResponse, code)
        if (code && !error) {
          _InstanceService.loginByCode(code, () => {
            navigator.pop()
          })
        } else {
          skyConsole.log('callback:=== error')
          navigator.pop()
        }
      }
      return {
        options: {
          authOption: {
            approval_prompt: isLogin ? 'auto' : 'force',
            scope: scopes,
            // state: '0179ccce-49fe-4da3-aeea-cd751fe2b704',
          },
          redirectUrl,
          state,
          clientId,
          clientSecret,
          authUrl: AUTH_URL_COOCAA,
          local,
        },
        isGoBack:false,
        onBackBtn,
        callback,
        // webview,
      }
    }
  }


</script>
