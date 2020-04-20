<template>
  <div class="body">
    <div class="line-title"></div>
    <div style="flex-direction: row;align-items: left;width:750px;">
      <div style="width: 100px;height:66px;just-content:center;margin-top:294px;" @click="backPrePage">
        <text style="margin-left: 60px;font-family: iconfont1;color: #333333;font-size: 36px">&#xe758;</text>
      </div>
    <scroller scroll-direction="vertical" show-scrollbar="false" class="TabSubBar">
      <div
        v-for="(item, index) in functionList"
        :key="index"
        :class="['fontContent']"
        @click="onClickTab(index, item)"
      >
        <text :class="[activeTab === index ? 'fontBlack' : 'fontDark']">{{ item }}</text>
        <div v-if="activeTab === index" class="line-font"></div>
      </div>
    </scroller>
      <div style="height:66px;margin-top:50px;">
        <div v-if="activeTab ===1" @click="clickSearch" style="margin-left:120px;width:360px;height:66px;background-color:#E6E6E6;border-radius: 10px;flex-direction: row;align-items: center;" >
          <text   style="margin-left: 20px;font-family: iconfont1;color: #999999;font-size: 36px">&#xe750;</text>
          <text   style="color:#999999;font-size:20px;margin-left:10px;">请输入型号、品类</text>
        </div>
      </div>
    </div>

    <template v-if="activeTab === 0">
      <list style="flex:1;">
        <cell v-if="searchDeviceList.length === 0 || (runnigTimeCount < 5 && refreshing)">
          <div v-if="refreshing" class="width-1920 alignItems">
            <div class="scanningBox">
              <image class="scanningIcon" :src="getImgPath('ic_bg_scanning')" />
              <image class="scanningIcon" :src="getImgPath('ic_point_scanning')" />
              <image ref="rotate" class="scanningIcon" :src="getImgPath('ic_pointer_scanning')" />
            </div>
            <div style="flex-direction:column;">
              <text class="marginTop59 refreshText">{{ textScanning }}</text>
              <text class="textScanningTips marginTop20">{{ textScanningTips }}</text>
            </div>
          </div>
          <div v-else>
            <div class="width-1920 alignItems">
              <image class="bgdisnetworkIcon" :src="getImgPath('pad_icon_no_device_scan')" />
            </div>
            <div class="width-1920 alignItems">
              <div style="flex-direction: row;width: 550px;margin-top:52px">
                <text v-for="(item,index) in textNoFound" :key="index" style="flex-direction: row;" :class="['textRescanTips',index!==1?'grayFont': 'greenFont']">{{item}}</text>
              </div>
            </div>
            <div class="width-1920 alignItems" style="margin-top: 130px;">
              <div style="width: 500px;height: 87px;border-radius: 43.5px;background-color: #44D6BA;justify-content: center;align-items: center;"  @click="search">
                <text style="color:white;font-size:30px;">重新扫描</text>
              </div>
            </div>
          </div>
        </cell>
        <cell v-else v-for="(row,index ) in showList" :key="index" >
          <template v-if="row.alAddLabel === 2">
            <div class="subTitle cellBorder">
              <text class="textSubTitle">{{ unAddText }}</text>
            </div>
          </template>
          <template v-else-if="row.alAddLabel === 1">
            <div class="subTitle cellBorder" style="margin-top:50px;">
              <text class="textSubTitle">{{ alAddText }}</text>
            </div>
          </template>
          <div v-else class="main">
            <LanScanDeviceItem v-for="device in row" :item ="device" :key="device.device_id" @onClick="bindDevice(device)"></LanScanDeviceItem>
          </div>
        </cell>
      </list>

    </template>
    <template v-else-if="activeTab === 1">
      <SelDeviceModule></SelDeviceModule>
    </template>
    <template v-else-if="activeTab === 2">
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
    <search-device-module :show="showSearchpage" style="position: absolute;top: 0;left: 0;" @onClickCancle="showSearchpage=false"></search-device-module>
    <div v-if="isShowBindRes" style="position: absolute;left: 0px;top: 0">
      <bind-result-toast @clickOverlay="isShowBindRes = false"></bind-result-toast>
    </div>
  </div>
</template>



<script>
  import { getService } from '../../../comm/context'
  var _InstanceService = getService()
  import { ref, toRefs, reactive, computed, watch, onBeforeMount, onMounted, provide,created, } from '@vue/composition-api'
  import StatusBar from '../../../components/StatusBar.vue'
  import discovery from '@/composable/wifi_config/SkyDiscovery.js' //'../../../net/SkyDiscovery' //
  import {getImgPath} from '@/utils/utils'
  import WxcDialog from '../../../components/WxcDialog.vue'
  import NetDisconnect from '../../../components/NetDisconnect'
  import LanScanDeviceItem from '../../../components/landscapeComponents/LanScanDeviceItem'
  import {back} from '../../../utils/PageUtils'
  import {
    DEVICE_TYPE_MAP,
    DEVICE_BRAND_MAP,
    BIND_STATUS_MAP,
    NEW_GET_THIRD_ACCOUNT_AUTH,
    BIND_QUERY_THIRD_ACCOUNT
  } from '../../../utils/constLandScape'
  import LoadingDialog from '../../../components/LoadingDialog.vue'
  import skyGlobal from '../../../utils/skyGlobal'
  import SelDeviceModule from '../../../components/landscapeComponents/SelDeviceModule'
  import SearchDeviceModule from '../../../components/landscapeComponents/SearchDeviceModule'
  import CommonList from '../../../components/landscapeComponents/CommonList'
  const modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  let isAndroid = weex.config.env.platform.toLowerCase() === 'android'
  const meta = weex.requireModule('meta')
  import {getBrandList,queryThirdBind} from '../../../api/thirdAccount'
  import { LOCATION_DEVICE_LIST, COOCAA_ACCOUNT, LOCATION_LIST, FAMILY_LIST, FAMILY_DEVICES_COUNT, CURRENT_LOCATION_ID } from '../../../comm/symbol'
  import BindResultToast from '../../../components/landscapeComponents/BindResultToast'
  import i18nMixin from '../mixin/i18nMixin'

  // meta.setViewport({
  //   width: 1920,
  //   reserveCssStyles: true,
  // })
export default {
  components: { BindResultToast, CommonList, SearchDeviceModule, SelDeviceModule, LoadingDialog, StatusBar, WxcDialog, NetDisconnect,LanScanDeviceItem },
  mixins: [i18nMixin],
  data() {
    let load_symbols = [
      COOCAA_ACCOUNT,
    ]
    let account = {}
    console.log('AddDevice data load_symbols:',load_symbols)
    const global_data_map = _InstanceService.getGlobalData(load_symbols)
    Object.assign(account,global_data_map[COOCAA_ACCOUNT])
    console.log(`AddDevice data coocaa_account: ${JSON.stringify(global_data_map[COOCAA_ACCOUNT])}`)
    return {
      lang:'zh',
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
      account,
      showSearchpage:false,
      isShowBindRes:false
    }
  },
  created() {
    console.log('add device created')
    this.functionList = [
      this.$t('AddDeviceFont.nearDevice'),
      this.$t('AddDeviceFont.selDevice'),
      this.$t('AddDeviceFont.ThirdImp')
    ]

    this.textScanning = this.$t('AddDeviceFont.textScanning')
    this.textScanningTips = this.$t('AddDeviceFont.textScanningTips')
    this.textNoFound = ['未扫描到附近有设备，您可以尝试',' “选择设备"','方式']//this.$t('AddDeviceFont.textNoFound')
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
          if (result.code >= 0 && result.code === -6) {
            this.isRequestPerssion = false
            this.back()
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
        console.log(`searchDeviceList: unAddDeviceList: ${this.unAddDeviceList.length} alAddDeviceList: ${this.alAddDeviceList.length}`)
        if (this.unAddDeviceList.length !== 0) {
          this.showList.push({ alAddLabel: 2 })
          for(let i = 0;i<this.unAddDeviceList.length;i++){
            let tempList = []
            tempList.push(this.unAddDeviceList[i])
            if(i > this.unAddDeviceList.length-2){
              this.showList.push(tempList)
              break
            }
            tempList.push(this.unAddDeviceList[i+1])
            i = i+1
            this.showList.push(tempList)

          }
          //  //2为未添加
          // this.showList = this.showList.concat(this.unAddDeviceList)
        }
        if (this.alAddDeviceList.length !== 0) {
          this.showList.push({ alAddLabel: 1 }) //1为自己已添加，3为已被他人绑定
          for(let i = 0;i<this.alAddDeviceList.length;i++){
            let tempList = []
            tempList.push(this.alAddDeviceList[i])
            if(i > this.alAddDeviceList.length-2){
              this.showList.push(tempList)
              break
            }
            tempList.push(this.alAddDeviceList[i+1])
            i = i+1
            this.showList.push(tempList)
          }
          // this.showList = this.showList.concat(this.alAddDeviceList)
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
    }
  },
  methods: {
    getImgPath,
    back,
    backPrePage (){
      console.log('backPrePage:::')
      if(this.refreshing){
        if(discovery){
          discovery.stopRepeatDiscovery()
        }
        this.back()
      }else{
        this.back()
      }
    },
    getThirdAccBind() {
      console.log('getThirdAccBind')
      getBrandList(_InstanceService, result => {
          this.isShowLoading = false
          console.log('getThirdAccBind ok:' + JSON.stringify(result))
          queryThirdBind(_InstanceService,data=>{
            console.log('getThirdAccBind ok:' + JSON.stringify(data))
            this.unBindAccList = []
            this.bindAccList = []
            for (let item of result) {
              let isBind = false
              let idName = item.id_name
              if (data) {
                for (let temp of data) {
                  let tempData = temp.account_type
                  if (idName && tempData && idName === tempData) {
                    isBind = true
                  }
                }
                if (!isBind) {
                  this.unBindAccList.push(item)
                  console.log('unBindAccList:', item)
                } else {
                  this.bindAccList.push(item)
                  console.log('bindAccList:', item)
                }
              }
            }}, (err, erroInfo) => {
            this.isShowLoading = false
            modal.toast({message:'请求数据失败',duration:0})
            console.log('getThirdAccBind fail:', err, '=', erroInfo)
          })
        },
        (err, erroInfo) => {
          this.isShowLoading = false
          modal.toast({message:'请求数据失败',duration:0})
          console.log('getThirdAccBind fail:', err, '=', erroInfo)
        })
    },

    clickUnbindItem(thirdAccInfo) {
      console.log('clickUnbindItem:', thirdAccInfo)
      if (thirdAccInfo.auth_url && thirdAccInfo.auth_url.indexOf('http') > -1) {
       _InstanceService.jumpToPath('CommonAuthPage.js', { resultUrl: thirdAccInfo.callback_url, authUrl: thirdAccInfo.auth_url },{orientation: 'landscape'})
      } else {
        if (thirdAccInfo.id_name === 'BAIDU') {
          _InstanceService.jumpToPath('AuthBaidu.js')
        }
      }
    },

    clickBindItem(item) {
      console.log('clickBindItem:', item, '=', item.id, '=', item.display_name)
      _InstanceService.jumpToPath('ConfigNet/ThirdAccount.js', {
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
        info.account = skyGlobal.get('skyUserAccount')

        const clipboard = weex.requireModule('clipboard')
        clipboard.setString(JSON.stringify(item))
        if (pkg_buildType === 'debug') {
          modal.toast({message:this.$t('AddDeviceFont.copySuccess'),duration:0})
        }
      })
    },

    clicFoundKnow() {
      this.isJumpFromTVGuide = false
    },

    clickBlank() {
      console.log('click blank')
    },

    checkRotate() {
      if (!this.refreshing) {
        return
      }
      if (this.updateInterval > 0) {
        clearInterval(this.updateInterval)
        this.updateInterval = -1
        this.runnigTimeCount = 0
      }
      console.log('checkRotate... ', this.$refs.rotate)
      let self = this
      this.updateInterval = setInterval(() => {
        self.runnigTimeCount = self.runnigTimeCount + 1
        if (self.runnigTimeCount > 1000) {
          clearInterval(this.updateInterval)
          this.updateInterval = -1
        }
      }, 1000)
      this.current_rotate = 1800000
      setTimeout(() => {
        animation.transition(
          self.$refs.rotate,
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
      if (data.bind_status === 1) {
        modal.toast({message:this.$t('AddDeviceFont.bindedDevice'),duration:0})
        return
      } else if (data.bind_status === 3) {
        _InstanceService.jumpToPath('ConfigNet/unbindIllustration.js', data)
        // this.isShowBindDialog = true
        return
      } else if (data.bind_status === 4) {
        console.log('discoveryNew bindDevice')
        _InstanceService.jumpToPath('ConfigNet/ConnectFamilyWiFiPage.js', { APLink: data.APLink, ...data })
        return
      }
      // if (this.networkInfo.isConnect === false) {
      //   modal.toast({ message: '当前网络不可用，请检查网络设置', duration: 0 })
      //   return
      // } else
        {
        this.isShowBinding = discovery.bindDevice.call(
          this,
          data,
          respone => {
            this.isShowBinding = false
            _InstanceService.jumpToPath('ConfigNet/DeviceInfo.js', data)
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
      if (this.account && this.account.access_token) {
        discovery.repeatDiscovery(9000)
        this.timerStopScan()
      } else {
        setTimeout(() => {
          self.refreshing = false
        }, 3000)
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
      }, null, _InstanceService.http)
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
    },
    input() {
      // if (this.networkInfo.isConnect) {
        console.log('input====' + this.searchStatus)
        this.searchStatus = true
      // }
      // else {
      //   modal.toast({message:'当前网络不可用，请检查网络设置',duration:0})
      //   return
      // }
    },
    getLastFourMac(mac) {
      if (!mac) {
        console.log('getLastFourMac mac null')
        return
      }
      let str = '(mac:' + mac.substr(mac.length - 4) + ')'
      return str
    },
    clickSearch (){

      this.showSearchpage = true
    }
  },
}
</script>

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
  font-size: 30px;
  color: #333333;
  font-weight: bold;
  text-align: center;
}
.textRescanTips{
  font-size: 24px;
  /*text-align: center;*/
}
.grayFont{
  color: #9DA0A3;
}
.greenFont{
  color: #44D6BA;
}
.textScanningTips {
  font-size: 30px;
  color: #999999;
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
  /* position:absolute;
    bottom:0; */
  height: 192px;
  background-color: rgba(246, 247, 249, 0.75);
  /* padding-bottom:100px; */
  /* padding-left: 183px;
    padding-right:192px; */
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
  margin-top: 136px;
  height: 445px;
  width: 445px;
}
.bgdisnetworkBox {
  margin-top: 130px;
  margin-left: 173px;
  height: 240px;
  width: 404px;
}
.width-1920{
  width:1920px;
}
.algin-intem-center{
  align-items: center;
}
.bgdisnetworkIcon {
  height: 392px;
  width: 692px;
}
.scanningIcon {
  position: absolute;
  top: 0;
  left: 0;
  height: 445px;
  width: 445px;
}
.scroller {
  /* height: 961px; */
  /*flex:1*/
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
  flex:1;
  background-color: #F5F5F5;
}
.bgWhiteColor {
  background-color: white;
}
.cellBorder {
  /*border-bottom-width: 1px;*/
  /*border-bottom-color: #f1f1f1;*/
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
.marginTop59 {
  margin-top: 59px;
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
  font-size: 36px;
  color: #333333;
  font-weight: bold;
  margin-left: 60px;
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
  margin-left: 484px;
  width: 800px;
  height: 66px; /*不设置会出现tab在下方居中*/
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:94px;
}
.fontContent {
  width: 166px;
  height: 66px;
  align-items: center;
  /*justify-content: center;*/
}
.line-font{
  width: 100px;
  height: 4px;
  background-color: #44D6BA;
  margin-top: 17px;
}
.line-title{
  background-color: #E6E6E6;
  position:absolute;
  top:150px;
  width: 1920px;
  height: 3px;
}
.fontBlack {
  font-family: 'PingFangSC-Medium';
  color: #333333;
  font-size: 32px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}
.fontDark {
  font-family: 'PingFangSC-Medium';
  color: #999999;
  font-size: 32px;
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
  color: #999999;
  font-size: 24px;
  line-height: 36px;
  text-align: justify;
  vertical-align: middle;
}
.textThiredTitleBody {
  width: 1920px;
  height: 112px;
  align-items: center;
  justify-content: center;
}
.textUnbind {
  color: #333333;
  font-size: 36px;
  font-weight: bold;
}
.textUnbindBody {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 60px;
  margin-top: 50px;
}
.textOverflow {
  text-overflow: clip;
  width: 200px;
}
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;
  padding-right: 59px;
  padding-left: 60px;
  width: 1920px;
}
</style>
