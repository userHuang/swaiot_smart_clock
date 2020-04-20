<template>
    <div class="body" @viewappear="onViewAppear" @viewdisappear="onViewDisappear">
    <CommonTitleBar
      ref="titleBar"
      :title="$t('AddDeviceFont.AddDevice')"
      @onClickBack="back()"
    ></CommonTitleBar>
    <div style="width:750px;height:0.5px;background-color:#e1e1e1;margin-bottom:10px;"></div>

    <scroller scroll-direction="horizontal" show-scrollbar="false" class="TabSubBar">
      <div
        v-for="(item, index) in functionList"
        :key="index"
        :class="['fontContent', activeTab === index ? 'borderBlue' : 'borderDark']"
        @click="onClickTab(index, item)"
      >
        <text :class="[activeTab === index ? 'fontBlue' : 'fontDark']">{{ item }}</text>
      </div>
    </scroller>
    <template v-if="activeTab === 0">
      <NetDisconnect v-if="networkInfo.isConnect === false"></NetDisconnect>
      <div style="flex:1;">
        <template v-if="isShowScanning">
          <div v-if="refreshing">
            <div class="scanningBox">
              <image class="scanningIcon" :src="getImgPath('ic_bg_scanning')" />
              <image class="scanningIcon" :src="getImgPath('ic_point_scanning')" />
              <image ref="rotate" class="scanningIcon" :src="getImgPath('ic_pointer_scanning')" />
            </div>
            <div style="flex-direction:column;">
              <text class="marginTop96 refreshText">{{ textScanning }}</text>
              <text class="textScanningTips marginTop20">{{ textScanningTips }}</text>
            </div>
          </div>
          <div v-else>
            <div class="bgdisnetworkBox">
              <image class="bgdisnetworkIcon" :src="getImgPath('bg_disnetwork')" />
            </div>
            <div style="flex-direction:column;">
              <text class="marginTop90 textScanningTips">{{ textNoFound }}</text>
            </div>
            <div class="row justifyContentCenter" style="margin-top: 200px;">
            <div style="background-color: #44D6BA;width: 622px;height: 80px;border-radius: 200px;justify-content: center;align-items: center;" @click="search">
              <text style="font-size: 32px;color: white">重新扫描</text>
            </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div style="flex-direction: row;align-items: center; margin-top: 44px;">
            <div class="scanningBoxSmall">
              <image class="scanningIconSmall" :src="getImgPath('ic_bg_scanning')" />
              <image class="scanningIconSmall" :src="getImgPath('ic_point_scanning')" />
              <image ref="rotat" class="scanningIconSmall" :src="getImgPath('ic_pointer_scanning')" />
            </div>
            <div style="margin-left: 20px;">
              <text style="font-size: 32px;color: #3E3e3E">扫描中...</text>
              <text style="margin-top: 10px;color: #A3A3A3;font-size: 28px;">请确保智能设备已上电，且在手机附近</text>
            </div>
          </div>
          <scroller :style="{height: visibleHeight-500}">
            <div  v-for="device in showList" :key="device.device_id">
              <template v-if="device.alAddLabel === 2">
                <div class="subTitle cellBorder">
                  <text class="textSubTitle">{{ unAddText }}</text>
                </div>
              </template>
              <template v-else-if="device.alAddLabel === 1">
                <div class="subTitle cellBorder">
                  <text class="textSubTitle">{{ alAddText }}</text>
                </div>
              </template>
              <div
                class="marginTop2 bgWhiteColor row height128 cellBorder padding spaceBetween"
                @longpress="onPaste(device)"
                @click="bindDevice(device)"
                v-else
              >
                <div class="flexRow">
                  <div class="square83">
                    <image class="square83" resize="contain" :src="device.icon" />
                  </div>
                  <div class="marginLeft16 column">
                    <div style="flex-direction:row;width:240px;">
                      <text class="nameText" style="lines:1;text-overflow:ellipsis;">{{ convertName(device.device_name)}}</text>
                      <!-- <text class="macText" style="margin-top:10px;lines:1;text-overflow:ellipsis;">{{getLastFourMac(device.mac_address)}}</text>    -->
                    </div>
                    <text class="typeText" style="lines:1;width:240px;text-overflow:ellipsis;">{{
                      device.product_model
                      }}</text>
                  </div>
                </div>
                <div class="flexRow" v-if="device.bind_status === 1">
                  <text class="bindText colorBlue">{{ getBindStatus(device.bind_status) }}</text>
                </div>
                <div class="flexEnd" v-else-if="device.bind_status === 3">
                  <div class="flexRow">
                    <text style="font-family:iconfont1;font-size:32px;color:#44D6BA;margin-top:12px;margin-right:8px;"
                    >&#xe60c;</text
                    >
                    <text class="bindText colorBlue">{{ getBindStatus(device.bind_status) }}</text>
                  </div>
                  <div style="flex-direction:row;justify-content:flex-end;">
                    <text class="bindText colorGrey">{{ nickName }}:</text>
                    <text class="bindText colorGrey" style="width:150px;lines:1;text-overflow:ellipsis">{{
                      device.nickname
                      }}</text>
                  </div>
                </div>
                <div :class="['flexRow', device.product_type_id!==35?'unAddBox':'unAddBoxLock']"  v-else>
                  <text class="bindText colorWhite">{{ getBindStatus(device.bind_status) }}</text>
                </div>
              </div>
            </div>
            <div style="width: 750px;height: 50px"></div>
          </scroller>

        </template>
      </div>
      <div v-if="!isShowScanning" class="bottom row justifyContentCenter">
        <div style="background-color: #44D6BA;width: 622px;height: 80px;border-radius: 200px;justify-content: center;align-items: center;" @click="search">
          <text style="font-size: 32px;color: white">清除列表</text>
        </div>
      </div>
    </template>
    <template v-else-if="activeTab === 1">
      <!--      <div v-if="activeTab===1" style="margin-top:32px;height: 64px;width: 686px;background-color: #eeeeee;border-radius: 8px;align-items: center;margin-left: 32px;" class="flexRow" @click="input">-->
      <!--        <text style='font-family:iconfont1;font-size:48px;color: #7E7E7E;margin-left: 14px;'>&#xe616;</text>-->
      <!--        &lt;!&ndash;<input ref="inputName" class="modifyNameInput" v-model="searchContent" placeholder="快捷搜索"  />&ndash;&gt;-->
      <!--        <text style="margin-left: 14px;font-size: 26px;color: #ACACAC;">{{$t('AddDeviceFont.easyQuery')}}</text>-->
      <!--      </div>-->
      <!--      <div style="margin-top: 32px"></div>-->
      <NetDisconnect v-if="networkInfo.isConnect === false"></NetDisconnect>
      <SelDeTypeModule @clickSearch="input"></SelDeTypeModule>
    </template>
    <template v-else-if="activeTab === 2">
      <NetDisconnect v-if="networkInfo.isConnect === false"></NetDisconnect>
      <div>
        <scroller :style="heightStyles" scroll-direction="vertical" show-scrollbar="false">
          <div v-if="activeTab === 2" class="textThiredTitleBody">
            <text class="textThirdTitle">{{ $t('AddDeviceFont.thirdAccImpTip') }}</text>
          </div>
          <div v-if="unBindAccList.length !== 0" class="textUnbindBody">
            <text class="textUnbind">{{ $t('AddDeviceFont.unBindStatus') }}</text>
          </div>
          <div v-for="(item, index) in unBindAccList" :key="index" @click="clickUnbindItem(item)">
            <div
              style="flex-direction: row;width: 750px;justify-items: center;margin-top: 1px;background-color: white;"
            >
              <div
                style="margin-left:48px;flex-direction: row; width: 654px;height: 128px;justify-content: space-between;align-items: center"
              >
                <div style="flex-direction: row; height: 128px;align-items: center ">
                  <image style="width: 80px;height: 80px;border-radius:10px;" :src="item.icon"></image>
                  <text style="margin-left: 16px;color: #3e3e3e;font-size: 32px">{{ item.display_name }}</text>
                </div>
                <text style="font-family:iconfont1;font-size:48px;color: #7E7E7E;margin-left: 14px;">&#xe612;</text>
              </div>
            </div>
            <div style="height: 1px;width: 750px;background-color: #F1F1F1"></div>
          </div>
          <div v-if="bindAccList.length !== 0" class="textUnbindBody">
            <text class="textUnbind">{{ $t('AddDeviceFont.BindStatus') }}</text>
          </div>
          <div v-for="(item, index) in bindAccList" :key="index" @click="clickBindItem(item)">
            <div
              style="flex-direction: row;width: 750px;justify-items: center;margin-top: 2px;background-color: white;"
            >
              <div
                style="margin-left:48px;flex-direction: row; width: 654px;height: 128px;justify-content: space-between;align-items: center"
              >
                <div style="flex-direction: row; height: 128px;align-items: center ">
                  <image style="width: 80px;height: 80px;border-radius:10px;" :src="item.icon"></image>
                  <text style="margin-left: 16px;color: #3e3e3e;font-size: 32px">{{ item.display_name }}</text>
                </div>
                <text style="font-family:iconfont1;font-size:48px;color: #7E7E7E;margin-left: 14px;">&#xe612;</text>
              </div>
            </div>
            <div style="height:1px;width: 750px;background-color: #F1F1F1"></div>
          </div>
        </scroller>
      </div>
    </template>
    <template v-if="isFoundTV !== null && isJumpFromTVGuide">
      <NetDisconnect v-if="networkInfo.isConnect === false"></NetDisconnect>
      <div class="overlay" v-if="isFoundTV" @click="clickBlank">
        <image
          style="position: absolute;left:204px;top:260px;height: 229px;width: 342px"
          :src="getImgPath('ic_tvadd')"
        ></image>
        <image
          style="position: absolute;left:108px;top:575px;height: 217px;width: 73px"
          :src="getImgPath('ic_arrow01')"
        ></image>
        <image
          style="position: absolute;left:219px;top:902px;height: 204px;width: 315px"
          :src="getImgPath('ic_ibutton')"
          @click="clicFoundKnow"
        ></image>
      </div>
      <div class="overlay" v-else @click="clickBlank">
        <image
          style="position: absolute;left:150px;top:260px;height: 231px;width: 450px"
          :src="getImgPath('ic_tvfail01')"
        ></image>
        <image
          style="position: absolute;left:98px;top:575px;height: 94px;width: 485px"
          :src="getImgPath('ic_tvfail02')"
        ></image>
        <image
          style="position: absolute;left:500px;top:702px;height: 160px;width: 71px"
          :src="getImgPath('ic_arrow02')"
        ></image>
        <image
          style="position: absolute;left:219px;top:902px;height: 204px;width: 304px"
          :src="getImgPath('ic_ibutton')"
          @click="clicFoundKnow"
        ></image>
      </div>
    </template>
    <LoadingDialog :content="$t('AddDeviceFont.bindingDevice')" :show="isShowBinding"> </LoadingDialog>
    <LoadingDialog :content="loadingContent" :show="isShowLoading"> </LoadingDialog>
    <WxcDialog
      :title="textWxcTitle"
      :content="textContent"
      :confirm-text="textConfirm"
      :cancel-text="textCancel"
      :show="isShowBindDialog"
      :top="400"
      :mainBtnColor="'#44D6BA'"
      :secondBtnColor="'#3e3e3e'"
      @wxcDialogCancelBtnClicked="clickDialogCancel"
      @wxcDialogConfirmBtnClicked="clickDialogConfirm"
    ></WxcDialog>
    <search-device-module :show="searchStatus" style="position: absolute;top: 0;left: 0;" @onClickCancle="searchStatus=false"></search-device-module>
  </div>
</template>

<script>
import { getService } from '@/comm/context'
import StatusBar from '@/components/StatusBar.vue'
import discovery from '@/composable/wifi_config/SkyDiscovery.js'
import WxcDialog from '@/components/WxcDialog.vue'
import NetDisconnect from '@/components/NetDisconnect'
import SearchDeviceModule from '@/components/landscapeComponents/SearchDeviceModule'
import {
  DEVICE_TYPE_MAP,
  DEVICE_BRAND_MAP,
  BIND_STATUS_MAP,
  NEW_GET_THIRD_ACCOUNT_AUTH,
  BIND_QUERY_THIRD_ACCOUNT
} from '@/utils/constLandScape'
import { testSecurity , getImgPath} from '@/utils/utils'
import LoadingDialog from '@/components/LoadingDialog.vue'
import SelDeTypeModule from './SelDeviceModule'
import CommonTitleBar from '@/components/NewPage/CommonTitleBar'
import i18nMixin from '../mixin/i18nMixin'

const modal = weex.requireModule('modal')
const storage = weex.requireModule('storage')
const animation = weex.requireModule('animation')
const navigator = weex.requireModule('navigator')
let isAndroid = weex.config.env.platform.toLowerCase() === 'android'
let instanceService = getService()

export default {
  components: { LoadingDialog, StatusBar, WxcDialog, SelDeTypeModule, SearchDeviceModule, CommonTitleBar, NetDisconnect },
  mixins: [i18nMixin],
  data() {
    return {
      searchDeviceList: discovery.deviceList,
      refreshing: true,
      runnigTimeCount: 0,
      isUserTriggleSearch: false,
      current_rotate: 0,
      currentRotate: 0,
      isScanning: false,
      bindSnid: '',
      bindPassword: '',
      isShowBinding: false,
      gatewayInfo: '',
      tokenFlag: 1,
      isFoundTV: null,
      isJumpFromTVGuide: false,
      isRequestPerssion: true,
      functionList: [],
      activeTab: 0,
      textScanning: '',
      textScanningTips: '',
      textNoFound: '',
      scanAgain: '',
      unAddText: '',
      alAddText: '',
      nickName: '',
      textWxcTitle: '',
      textContent: '',
      textConfirm: '',
      textCancel: '',
      scanTimeoutId: -1,
      unAddDeviceList: [],
      alAddDeviceList: [],
      showList: [],
      isShowBindDialog: false,
      searchContent: '',
      searchStatus: false,
      // thirdAccountList:[],
      getBind: false,
      unBindAccList: [],
      bindAccList: [],
      loadingContent: 'loading',
      isShowLoading: false,
      networkInfo: { isConnect: null, ssid: null, type: null }
    }
  },
  created() {
    console.warn('add device created')    
    this.functionList = [
      'aaa',
      this.$t('AddDeviceFont.nearDevice'),
      this.$t('AddDeviceFont.selDevice'),
      this.$t('AddDeviceFont.ThirdImp')
    ]

    console.warn(this.$t('AddDeviceFont.ThirdImp')) 

    this.textScanning = this.$t('AddDeviceFont.textScanning')
    this.textScanningTips = this.$t('AddDeviceFont.textScanningTips')
    this.textNoFound = this.$t('AddDeviceFont.textNoFound')
    this.scanAgain = this.$t('AddDeviceFont.scanAgain')
    this.unAddText = this.$t('AddDeviceFont.unAddText')
    this.alAddText = this.$t('AddDeviceFont.alAddText')
    this.nickName = this.$t('AddDeviceFont.nickName')
    this.textWxcTitle = this.$t('AddDeviceFont.textWxcTitle')
    this.textContent = this.$t('AddDeviceFont.textContent')
    this.textConfirm = this.$t('AddDeviceFont.textConfirm')
    this.textCancel = this.$t('textCancel')
    console.log('add device created osversion: ', weex.config.env.osVersion)
    if (isAndroid && parseInt(weex.config.env.osVersion) >= 6) {
      //
      console.log('add device created requireModule weexWiFiConnect: ')
      let wiFiModule = weex.requireModule('weexWiFiConnect')
      // storage.getItem('isCheckPrequisiteForce', event=>{
      //   if(event.data==='undefined'){
      let tips = {
        type: 'discovery', //discovery表示局域网扫描里面的数据
        tipsText: this.$t('AddDeviceFont.tipsText'),
        confirmText: this.$t('AddDeviceFont.textGoSetting'),
        cancelText: this.$t('textCancel')
      }
      console.log('add device created checkPrerequisiteForce ')
      wiFiModule.checkPrerequisiteForce(
        false,
        tips,
        result => {
          console.log('add device created checkPrerequisiteForce result:', result)
          if (result.code >= 0) {
          } else if (result.code === -6) {
            this.isRequestPerssion = false
            this.back()
          } else {
          }
        },
        true
      )
    }
  },
  destroyed() {
    console.log('destroyed')
    this.isJumpFromTVGuide = false
    global.isJumpFromTVGuide = false
  },
  watch: {
    refreshing: function(val) {
      console.log('watch refreshing============ ', val)
      console.info(`currentRotate:${this.current_rotate}`)
      let self = this
      self.runnigTimeCount = 0
      if (val) {
        setTimeout(() => {
          self.checkRotate()
        }, 100)
      } else {
        console.log('watch refreshing showlist==0')
        this.current_rotate = 0
        self.runnigTimeCount = 0
        if (this.updateInterval > 0) {
          clearInterval(this.updateInterval)
          this.updateInterval = -1
          this.runnigTimeCount = 0
        }
      }
      },
    activeTab(val) {
      console.log('activeTab: ', val)
      if (val === 0) {
        console.log('enter search')
        this.search()
      } else if (val === 1) {
        console.log('enter select device')
        if (this.scanTimeoutId !== -1) {
          clearTimeout(this.scanTimeoutId)
          this.scanTimeoutId = -1
        }
        if (discovery) {
          console.log('discovery stopRepeatDiscovery val1')
          discovery.stopRepeatDiscovery()
        }
      } else if (val === 2) {
        console.log('enter select import')
        if (this.scanTimeoutId !== -1) {
          clearTimeout(this.scanTimeoutId)
          this.scanTimeoutId = -1
        }
        if (discovery) {
          console.log('discovery stopRepeatDiscovery val2')
          discovery.stopRepeatDiscovery()
        }
        this.isShowLoading = this.getThirdAccBind()
        console.log('this.isShowLoading ', this.isShowLoading)
        // if (!this.isShowLoading) {
        //modal.toast('网络异常，请检查网络')
        // }
      }
    },
    searchDeviceList(val) {
      console.log('searchDeviceList:', JSON.stringify(val))
      this.unAddDeviceList = []
      this.alAddDeviceList = []
      this.showList = []
      if (val) {
        val.forEach(item => {
          if (item.bind_status === 2 || item.bind_status === 4) {
            this.unAddDeviceList.push(item)
          } else {
            this.alAddDeviceList.push(item)
          }
        })
        if (this.unAddDeviceList.length !== 0) {
          this.showList.push({ alAddLabel: 2 }) //2为未添加
          this.showList = this.showList.concat(this.unAddDeviceList)
        }
        if (this.alAddDeviceList.length !== 0) {
          this.showList.push({ alAddLabel: 1 }) //1为自己已添加，3为已被他人绑定
          this.showList = this.showList.concat(this.alAddDeviceList)
        }
      }
    }
  },
  computed: {
    heightStyles() {
      return {
        height: this.visibleHeight - 212,
        marginTop: 8
      }
    },
    isShowScanning (){
      let isshow = (this.searchDeviceList.length === 0 || (this.runnigTimeCount < 5 && this.refreshing))
      if(!isshow){
        this.checkRotate(true)
      }
      return isshow
    }
  },
  methods: {
    getImgPath:getImgPath,
    back () {
      navigator.pop()
    },
    convertName (name){
        var len = 0
        var showname =''
        for (var i=0; i<name.length; i++) {
          var c = name.charCodeAt(i)
          //单字节加1
          if ((c >= 0x0001 && c <= 0x007e)) {
            len = len + 1
          } else if((0xff60<=c && c<=0xff9f)){
            len = len + 1.5
          }else{
            len+=2
          }
          if(len<12){
            showname = showname + name.substr(i,1)
          }else{
            showname = showname + '...'
            break
          }
        }
        return showname
      },
    getThirdAccBind() {
      console.log('getThirdAccBind')
      return this.httpGet(
        NEW_GET_THIRD_ACCOUNT_AUTH,
        {},
        result => {
          this.isShowLoading = false
          console.log('getThirdAccBind ok:' + JSON.stringify(result.data))
          this.queryBindInfo((res, data) => {
            console.log('getThirdAccBind liu:', res, '=', JSON.stringify(data))
            this.unBindAccList = []
            this.bindAccList = []
            for (let item of result.data) {
              let isBind = false
              let idName = item.id_name
              if (res) {
                for (let temp of data) {
                  let tempData = temp.account_type
                  if (idName && tempData && idName === tempData) {
                    isBind = true
                  }
                }
                if (!isBind) {
                  console.log('unBindAccList:', item)
                  this.unBindAccList.push(item)
                } else {
                  console.log('bindAccList:', item)
                  this.bindAccList.push(item)
                }
              }
            }
          })
        },
        (err, erroInfo) => {
          this.isShowLoading = false
         modal.toast('请求数据失败')
          console.log('getThirdAccBind fail:', err, '=', erroInfo)
        },
        true
      )
    },
    queryBindInfo(callback) {
      console.log('queryBindInfo')
      this.httpGet(
        BIND_QUERY_THIRD_ACCOUNT,
        null,
        response => {
          console.log('queryBindInfo response:', response)
          if (response && response.code === 0) {
            callback(true, response.data)
          } else {
            console.error('queryBindInfo fail')
            if (callback) {
              callback(false)
            }
          }
        },
        (response, msg) => {
          console.error('queryBindInfo fail', response, msg)
          if (callback) {
            callback.call(false)
          }
        },
        true
      )
    },
    clickUnbindItem(thirdAccInfo) {
      console.log('clickUnbindItem:', thirdAccInfo)
      if (thirdAccInfo.auth_url && thirdAccInfo.auth_url.indexOf('http') > -1) {
        instanceService.jumpToPath('CommonAuthPage.js', { resultUrl: thirdAccInfo.callback_url, authUrl: thirdAccInfo.auth_url })
      } else {
        if (thirdAccInfo.id_name === 'BAIDU') {
          instanceService.jumpToPath('AuthBaidu.js')
        }
      }
    },
    clickBindItem(item) {
      console.log('clickBindItem:', item, '=', item.id, '=', item.display_name)
      instanceService.jumpToPath('ConfigNet/ThirdAccount.js', {
        third_brand_id: item.brand_id,
        display_name: item.display_name,
        account_type: item.id_name
      })
    },
    getTypeName(device) {
      let type = DEVICE_TYPE_MAP[device.product_type_id]
      if (!type) {
        type = this.$t('AddDeviceFont.unKnowType') + device.product_type_id
      }
      if (device.APLink) {
        type += ' ' + device.APLink.substring(7)
      }
      return type
    },
    getBrandName(id) {
      let brand = DEVICE_BRAND_MAP[id]
      if (!brand) {
        brand = this.$t('AddDeviceFont.unKnowBrand') + id
      }
      return brand
    },
    getBindStatus(id) {
      let status = BIND_STATUS_MAP[id]
      return status
    },
    onPaste(item) {
      let basicInfo = weex.requireModule('weexBasicInfo')
      basicInfo.getBasicInfo(info => {
        let { pkg_buildType } = info
        info.account = global.skyUserAccount
        const clipboard = weex.requireModule('clipboard')
        clipboard.setString(JSON.stringify(item))
        if (pkg_buildType === 'debug') {
         modal.toast(this.$t('AddDeviceFont.copySuccess'))
        }
      })
    },
    clicFoundKnow() {
      this.isJumpFromTVGuide = false
    },
    clickBlank() {
      console.log('click blank')
    },
    checkRotate(isSmall) {
      console.log('checkRotate begin isSmall:'+isSmall)
      if (!this.refreshing&&!isSmall) {
        return
      }
      console.log('checkRotate rotat... '+this.$refs.rotat)
      if (this.updateInterval > 0 && !isSmall) {
        clearInterval(this.updateInterval)
        this.updateInterval = -1
        this.runnigTimeCount = 0
      }
      let self = this
      if(!isSmall){
        this.updateInterval = setInterval(() => {
          self.runnigTimeCount = self.runnigTimeCount + 1
          if (self.runnigTimeCount > 1000) {
            clearInterval(this.updateInterval)
            this.updateInterval = -1
          }
        }, 1000)
      }
      this.current_rotate = 1800000
      setTimeout(() => {
        animation.transition(
          isSmall?self.$refs.rotat:self.$refs.rotate,
          {
            styles: {
              transform: `rotate(${1800000}deg)`
            },
            duration: 20000000, //ms
            timingFunction: 'linear',
            needLayout: false,
            delay: 0 //ms
          },
          function() {
            console.log('rotate finish')
            //          self.checkRotate()
          }
        )
      }, 30)
    },
    bindDevice(data) {
      console.log('onClick: ', data)
      let deviceId = data.device_id
      console.log('deviceId:', deviceId)
      if (testSecurity(data)&&data.bind_status === 2) {
       modal.toast(this.$t('AddDeviceFont.notSupportBind'))
        return
      }
      if (data.bind_status === 1) {
       modal.toast(this.$t('AddDeviceFont.bindedDevice'))
        return
      } else if (data.bind_status === 3) {
        instanceService.jumpToPath('ConfigNet/UnBind.js', data)
        // this.isShowBindDialog = true
        //modal.toast(this.$t('AddDeviceFont.bindedDeviceOther'))
        return
      } else if (data.bind_status === 4) {
        console.log('discoveryNew bindDevice')
        instanceService.jumpToPath('ConfigNet/ConnectFamilyWifi.js', { APLink: data.APLink, ...data })
        return
      }
      if (this.networkInfo.isConnect === false) {
       modal.toast('当前网络不可用，请检查网络设置')
        return
      } else {
        this.isShowBinding = discovery.bindDevice.call(
          this,
          data,
          respone => {
            this.isShowBinding = false
            instanceService.jumpToPath('ConfigNet/ConfigWifiSuccess.js', data)
          },
          (respone, msg) => {
            this.isShowBinding = false
            console.log('====', respone, '====', msg)
            modal.toast({ message: msg, duration: 0 })
          }
        )
      }
    },
    search() {
      console.log('ui search')
      this.isUserTriggleSearch = true
      let self = this
      self.refreshing = true
      console.log('search===========', self.refreshing)
      self.checkRotate()

      if (global && global.skyUserAccount && global.skyUserAccount.access_token) {
        discovery.repeatDiscovery(9000)
        this.timerStopScan()
      } else {
        setTimeout(() => {
          self.refreshing = false
        }, 300)
        modal.toast({ message: this.$t('AddDeviceFont.loginFirst'), duration: 0 })
      }
    },
    onViewAppear() {
      console.log('discovery onViewAppear')
      // this.activeTab = 0 //配网获取状态失败时返回
      if (this.activeTab === 2) {
        this.getThirdAccBind()
      }
      this.checkRotate()
      console.log('AddDevice discovery init')
      discovery.init((searchList, isSearchEnd) => {
        console.log(`on searchList size:${searchList.length} isSearchEnd:${isSearchEnd}`)
        this.refreshing = !isSearchEnd
        if (isSearchEnd) {
          this.isUserTriggleSearch = false
        }
        if (this.searchDeviceList) {
          this.isFoundTV = null
          if (searchList.length > 0) {
            for (let item of this.searchDeviceList) {
              if (item.product_type_id === 1) {
                this.isFoundTV = true
                break
              }
            }
            this.isFoundTV = this.isFoundTV || false
          }
          console.log('isFoundTV==', this.isFoundTV)
        }
      }, null, instanceService.http)
      if (global.isJumpFromTVGuide) {
        this.isJumpFromTVGuide = global.isJumpFromTVGuide
        console.log('global.isJumpFromTVGuide==', global.isJumpFromTVGuide)
      } else {
        this.isJumpFromTVGuide = false
        console.log('global.isJumpFromTVGuide fail')
      }
      setTimeout(() => {
        console.log('onViewAppear nextTick search')
        this.search()
      }, 200)
      // if(this.activeTab === 2){
      //   this.getThirdAccBind()
      // }
    },
    timerStopScan() {
      console.log('stopScan====')
      if (this.scanTimeoutId !== -1) {
        clearTimeout(this.scanTimeoutId)
        this.scanTimeoutId = -1
      }
      this.scanTimeoutId = setTimeout(() => {
        console.log('discovery====', discovery)
        if (discovery && discovery.deviceList.length === 0) {
          this.refreshing = false
          discovery.stopRepeatDiscovery()
        }
      }, 15000)
    },
    onViewDisappear() {
      this.refreshing = false
      discovery.release()
      console.log('discovery.search release')
      if (this.scanTimeoutId) {
        clearTimeout(this.scanTimeoutId)
        this.scanTimeoutId = -1
      }
    },
    onClickTab(index) {
      this.activeTab = index
    },
    clickDialogCancel() {
      this.isShowBindDialog = false
    },
    clickDialogConfirm() {
      this.search()
      this.isShowBindDialog = false
      //modal.toast(this.$t('AddDeviceFont.alConfirm'))
    },
    input() {
      if (this.networkInfo.isConnect) {
        console.log('input====' + this.searchStatus)
        this.searchStatus = true
      } else {
       modal.toast('当前网络不可用，请检查网络设置')
        return
      }
    },
    getLastFourMac(mac) {
      if (!mac) {
        console.log('getLastFourMac mac null')
        return
      }
      let str = '(mac:' + mac.substr(mac.length - 4) + ')'
      return str
    }
  }
}
</script>

<style scoped>
.body_color {
    background-color: #FBFBFB;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: auto;
}

.status_bg {
    height: 50px;
    width: 750px;
    left: 0;
    top: 0;
}

.back-color-blue {
    background-color: #1ACAE3;
}

.back-color-tran {
    background-color: transparent;
}

.body_color_white {
    background-color: #ffffff;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: auto;
}

.body_color_rel {
    background-color: #F3F6F9;
    position: relative;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: auto;
}

.nav_menu_icon {
    background-color: #F3F;
    width: 50px;
    height: 50px;
    margin-top: 20px;
    margin-left: 50px;
}

.title_bar_slideslip {
    font-size: 35px;
    color: #fff;
    font-weight: bold;
    padding-left: 150px;
    padding-top: 36px;
}

.wrapper {
    width: 750px;
    height: 167px;
    background-color: #1ACAE3;
    flex-direction: row;
    align-items: center;
    padding-top: 50px;
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.wrapper_white {
    width: 750px;
    height: 117px;
    flex-direction: row;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.title {
    font-size: 42px;
    color: #fff;
    font-weight: bold;
    padding-left: 270px;
}

.title_config {
    font-size: 38px;
    color: #fff;
    font-weight: bold;
    padding-left: 208px;
}

.title_center {
    font-size: 38px;
    flex: 1;
    color: #fff;
    font-weight: bold;
    position: relative;
    padding-right: 83px;
    text-overflow: ellipsis;
    lines: 1;
    text-align: center;
}

.title_right {
    font-size: 42px;
    color: #1ACAE3;
    /*font-weight: bold;*/
    margin-left: 530px;
}

.title_register {
    width: 750px;
    text-align: center;
    font-size: 38px;
    color: #3e3e3e;
    font-weight: bold;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.title_font {
    font-size: 45px;
    color: #3e3e3e;
    font-weight: bold;
}

.bar_back_ico {
    width: 50px;
    height: 50px;
    margin-left: 24px;
}

.bar_right_ico {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 667px;
    margin-top: 33px;
}

.image_login {
    width: 750px;
    height: 133px;
    margin-top: 83px;
    justify-content: center;
    flex-direction: row;
}

.image_login_icon {
    width: 456px;
    height: 133px;
}

.tv_home_logo_icon {
    width: 600px;
    height: 128px;
}

.input_contain {
    width: 750px;
}

.input_text {
    width: 400px;
    height: 100px;
    font-size: 33px;
    background-color: transparent;
    margin-left: 12px;
    color: #4f4f4f;
}

.group {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 40px;
}

.count {
    font-size: 45px;
    font-weight: bold;
    margin-left: 12px;
    color: #41B883;
}

.loginbtn {
    width: 650px;
    height: 100px;
    left: 50px;
    align-items: center;
    position: relative;
    justify-content: center;
    background-color: #1ACAE3;
    border-color: #1ACAE3;
    border-radius: 50px;
    opacity: .99;
}

.loginbtn_gray {
    width: 650px;
    height: 100px;
    left: 50px;
    align-items: center;
    position: relative;
    justify-content: center;
    background-color: #1ACAE3;
    border-color: #1ACAE3;
    border-radius: 50px;
    opacity: .2;
}

.input {
    width: 650px;
    height: 100px;
    left: 50px;
    align-items: center;
    position: relative;
    margin-top: 33px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: white;
    border-color: white;
    border-radius: 50px;
}

.input_rel {
    width: 650px;
    height: 100px;
    left: 50px;
    align-items: center;
    position: relative;
    margin-top: 50px;
    flex-direction: row;
    justify-content: flex-start;
    background-color: white;
    border-color: white;
    border-radius: 50px;
}

.send_btn_default_gray {
    width: 650px;
    height: 100px;
    left: 50px;
    align-items: center;
    position: relative;
    margin-top: 65px;
    flex-direction: row;
    justify-content: center;
    background-color: #1ACAE3;
    border-color: #1ACAE3;
    border-radius: 50px;
    opacity: .2
}

.send_btn_default {
    width: 650px;
    height: 100px;
    left: 50px;
    align-items: center;
    position: relative;
    margin-top: 65px;
    flex-direction: row;
    justify-content: center;
    background-color: #1ACAE3;
    border-color: #1ACAE3;
    border-radius: 50px;
    opacity: .99
}

.input_content_icon {
    width: 38px;
    height: 38px;
    margin-top: 5px;
    margin-left: 57px;
}

.input_content_right {
    width: auto;
    height: auto;
    margin-top: 5px;
    margin-left: 80px;
    font-size: 33px;
    color: #1ACAE3;
}

.input_icon_right {
    width: 50px;
    height: 50px;
    margin-top: 5px;
    margin-left: 130px;
}

.input_content_txt {
    width: auto;
    height: auto;
    margin-left: 20px;
    font-size: 33px;
}

.input_content_txt_86 {
    width: auto;
    height: auto;
    padding-left: 33px;
    font-size: 33px;
}

.vertical_line {
    margin-left: 8px;
    width: 2px;
    height: 33px;
    background-color: #4d4d4d;
}

.login_other {
    width: 650px;
    height: 80px;
    left: 50px;
    align-items: center;
    position: relative;
    margin-top: 25px;
    justify-content: space-between;
    font-size: 28px;
    flex-direction: row;
}

.bottom_content {
    width: 650px;
    height: 80px;
    left: 50px;
    align-items: center;
    top: 26px;
    justify-content: space-between;
    flex-direction: row;
}

.bottom_content_center {
    width: 650px;
    height: 80px;
    left: 50px;
    align-items: center;
    top: 26px;
    justify-content: center;
    flex-direction: row;
}

.bottom_content_left {
    width: 650px;
    height: 80px;
    left: 83px;
    align-items: center;
    top: 26px;
    flex-direction: row;
}

.bottom_content_captch {
    width: 750px;
    height: 80px;
    align-items: center;
    top: 16px;
    justify-content: center;
    flex-direction: row;
}

.bottom_font {
    color: #6D6D6D;
    font-size: 28px;
}

.padding10 {
    padding-left: 9px;
}

.bottom_font_resend {
    color: #0990e2;
    font-size: 28px;
}

.captcha_input_group {
    width: 750px;
    height: 100px;
    align-items: center;
    position: relative;
    margin-top: 20px;
    flex-direction: row;
    justify-content: center;
}

.captcha_input {
    width: 64px;
    height: 80px;
    margin-left: 17px;
    background-color: white;
    border-color: white;
    justify-content: center;
}

.input_captcha_font {
    font-size: 30px;
    color: #1ACAE3;
    padding-left: 20px;
}

.config_bottom_device {
    width: 750px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 20px;
}

.config_bottom_top {
    margin-top: 460px;
}

.config_input_text {
    font-size: 33px;
    background-color: transparent;
    color: #4f4f4f;
    lines: 1;
    padding-left: 50px;
}

.config_guide_item_layout {
    /*width: 750px;*/
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.config_guide_img {
    width: 667px;
    height: 377px;
    opacity: .99;
}

.config_guide_txt_layout {
    background-color: white;
    width: 667px;
    height: 360px;
    padding-left: 50px;
    padding-right: 50px;
}

.config_guide_btn_layout {
    background-color: white;
    width: 667px;
    height: 164px;
    flex-direction: row;
    justify-content: center;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

.config_guide_txt {
    font-size: 27px;
    color: #1f2f42;
    line-height: 35px;
    margin-top: 10px;
}

.config_guide_button {
    width: 358px;
    height: 84px;
    margin-top: 24px;
    align-items: center;
    justify-content: center;
    background-color: #1ba1e2;
    border-color: #1ba1e2;
    border-radius: 42px;
}

.button_txt {
    color: #fff;
    font-size: 33px
}

.overflowlayout {
    width: 750px;
    height: auto;
    opacity: 0.6;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    position: absolute;
}

.config_net_guide_layout {
    width: 667px;
    top: 190px;
    left: 42px;
    position: absolute;
    opacity: .99;
}

.title-center-three {
    font-size: 42px;
    flex: 1;
    color: #fff;
    font-weight: bold;
    position: relative;
    padding-left: 13px;
    text-overflow: ellipsis;
    lines: 1;
    text-align: center;
}
</style>
<style scoped>
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  background-color: #000000;
}

.refreshIcon {
  height: 60px;
  width: 60px;
  color: #889967;
}
.refreshText {
  font-size: 32px;
  color: #3e3e3e;
  text-align: center;
}
.textScanningTips {
  font-size: 24px;
  color: #acacac;
  text-align: center;
}
.btn {
  font-size: 33px;
  padding-top: 25px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 25px;
  background-color: #44d6ba;
  border-color: #1ba1e2;
  border-radius: 100px;
  color: white;
}
.justifyContentCenter {
  justify-content: center;
}
.alignItems {
  align-items: center;
}

.bottom {
  position: absolute;
  bottom: 70px;
}
.textScan {
  margin-top: 17px;
  font-family: PingFangSC-Regular;
  font-size: 29px;
  color: #a3a3a3;
  text-align: center;
}
.iconScan {
  width: 50px;
  height: 50px;
  margin-left: 18px;
  margin-top: 17px;
}
.bgIconScan {
  width: 88px;
  height: 88px;
  border-width: 2px;
  border-radius: 44px;
  border-color: #9d9d9d;
  justify-content: center;
  align-items: center;
}
.nofoundIcon {
  margin-top: 121px;
  margin-left: 252px;
  height: 213px;
  width: 248px;
}
.nofoundText {
  margin-left: 92px;
  margin-top: 69px;
  font-size: 29px;
  color: #c0c0c0;
}
.scanningBox {
  margin-top: 128px;
  margin-left: 199px;
  height: 352px;
  width: 352px;
}
.scanningBoxSmall {
  margin-left: 64px;
  height: 80px;
  width: 80px;
}
.bgdisnetworkBox {
  margin-top: 130px;
  margin-left: 173px;
  height: 240px;
  width: 404px;
}
.bgdisnetworkIcon {
  position: absolute;
  top: 0;
  left: 0;
  height: 240px;
  width: 404px;
}
.scanningIcon {
  position: absolute;
  top: 0;
  left: 0;
  height: 352px;
  width: 352px;
}
.scanningIconSmall {
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  width: 80px;
}
.refresh {
  height: 120px;
  width: 750px;
  display: flex;
  justify-content: center;
  background-color: white;
}
.actionArea {
  height: 112px;
  width: 112px;
}
.spaceBetween {
  justify-content: space-between;
}
.paddingBottom10 {
  padding-bottom: 10px;
}

.titleCenter {
  font-family: PingFangSC-Medium;
  font-size: 36px;
  color: #3e3e3e;
  /* padding-top: 30px; */
  /*text-align: center;*/
  /* margin-left: 208px; */
}
.body {
  background-color: #fbfbfb;
  width: 750px;
  flex-direction: flex-column;
}
.bgWhiteColor {
  background-color: white;
}
.cellBorder {
  border-bottom-width: 1px;
  border-bottom-color: #f1f1f1;
}
.paddingRight10 {
  padding-right: 10px;
}
.marginTop2 {
  margin-top: 1px;
}
.square83 {
  height: 83px;
  width: 83px;
}

.barScanIcon {
  width: 50px;
  height: 50px;
  margin-top: 33px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  height: 126px;
  border-bottom-color: #e1e1e1;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.subWrapper {
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  align-items: center;
}
.barBackIcon {
  width: 32px;
  height: 32px;
}
.barBack {
  width: 86px;
  height: 86px;
  justify-content: center;
  align-items: center;
}
.bgColorBlue {
  background-color: #44d6ba;
}
.colorBlue {
  color: #44d6ba;
}
.colorWhite {
  color: #ffffff;
}
.colorRed {
  color: #f3643c;
}
.colorGrey {
  color: #a3a3a3;
}
.title {
  font-size: 42px;
  color: #fff;
  font-weight: bold;
}
.height116 {
  height: 117px;
}
.height166 {
  height: 167px;
}
.height128 {
  height: 128px;
}
.marginTop20 {
  margin-top: 20px;
}
.marginTop96 {
  margin-top: 96px;
}
.marginTop90 {
  margin-top: 90px;
}
.row {
  width: 750px;
  flex-direction: row;
  align-items: center;
}
.marginLeft16 {
  margin-left: 17px;
}
.subTitle {
  width: 750px;
  height: 84px;
  /* background-color: #fbfbfb; */
}
.textSubTitle {
  font-family: PingFangSC-Light;
  font-size: 24px;
  color: #a3a3a3;
  margin-left: 33px;
  margin-top: 36px;
}
.column {
  flex-direction: column;
}
.width300 {
  width: 250px;
}
.marginLeft50 {
  margin-left: 50px;
}
.marginRight103 {
  margin-right: 103px;
}
.nameText {
  color: #3e3e3e;
  font-size: 33px;
  height: 46px;
}
.typeText {
  color: #a3a3a3;
  font-size: 29px;
  height: 42px;
}
.macText {
  color: #a3a3a3;
  font-size: 20px;
  height: 42px;
  text-align: center;
  vertical-align: middle;
}
.bindText {
  font-size: 30px;
  line-height: 56px;
}
.padding {
  padding-left: 48px;
  padding-right: 32px;
}
.flexRow {
  display: flex;
  flex-direction: row;
}
.flexEnd {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.TabSubBar {
  width: 750px;
  height: 66px; /*不设置会出现tab在下方居中*/
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 120px;
  padding-right: 120px;
}
.fontContent {
  width: 161px;
  height: 66px;
  align-items: center;
  justify-content: center;
}
.borderBlue {
  border-bottom-color: #44d6ba;
  border-bottom-width: 4px;
}
.borderDark {
  border-bottom-color: transparent;
  border-bottom-width: 0px;
}
.fontBlue {
  font-family: 'PingFangSC-Medium';
  color: #44d6ba;
  font-size: 32px;
  line-height: 44px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}
.fontDark {
  font-family: 'PingFangSC-Medium';
  color: #9a9a9a;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
  vertical-align: middle;
}
.unAddBox {
  width: 128px;
  height: 56px;
  border-radius: 4px;
  background-color: #44d6ba;
  justify-content: center;
  align-items: center;
}
.unAddBoxLock {
  width: 128px;
  height: 56px;
  border-radius: 4px;
  background-color: #999999;
  justify-content: center;
  align-items: center;
}
.modifyNameInput {
  width: 600px;
  margin-left: 14px;
  height: 64px;
  justify-content: center;
}
.color-dark {
  color: #3e3e3e;
}
.font-size-26 {
  font-size: 26px;
}
.color-gray {
  color: #a3a3a3;
}
.font-size-24 {
  font-size: 24px;
}
.font-size-32 {
  font-size: 32px;
}
.marginTop36 {
  margin-top: 36px;
}
.textThirdTitle {
  font-family: 'PingFangSC-Regular';
  color: #3e3e3e;
  font-size: 26px;
  line-height: 36px;
  text-align: justify;
  vertical-align: middle;
}
.textThiredTitleBody {
  width: 750px;
  height: 112px;
  align-items: center;
  justify-content: center;
  background-color: #f7f7fa;
  padding-left: 32px;
  padding-right: 32px;
}
.textUnbind {
  font-family: 'PingFangSC-Regular';
  color: #a3a3a3;
  font-size: 24px;
  line-height: 34px;
  text-align: left;
  vertical-align: middle;
}
.textUnbindBody {
  width: 750px;
  height: 96px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 32px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f1f1;
}
.textOverflow {
  text-overflow: clip;
  width: 200px;
}
</style>