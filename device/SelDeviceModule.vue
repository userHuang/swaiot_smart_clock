<template>
  <div class="box">
    <div class="main">
      <div class="container">
        <list>
          <cell v-for="(item,index) in typeList1" :key="index" @click="clickLeftItem(index)">
            <div :class="['series-wrap',number ===index ?'sel-back':'unsel-back']" >
              <text :class="[number ===index?'series':'lighting']">{{item.leftTitle}}</text>
            </div>
          </cell>
          <cell style="height: 50px;width: 320px;">
          </cell>
        </list>
      </div>
      <div class="block-2">
        <list>
          <cell v-for="(keyItem, index0) in rightArray" :key="index0">
            <text class="television-2">{{keyItem.product_type_name}}</text>
            <div class="grid">
              <div class="col-row" v-for="(showItem) in keyItem.list" @click="clickSelItem(showItem)" :key="index0+showItem.product_model">
                <image
                  class="img"
                  :src="showItem.product_image"
                />
                <text class="kfrgwvbcb">{{showItem.product_model}}</text>
              </div>
            </div>
          </cell>
        </list>
      </div>
    </div>
  </div>
    
</template>

<script>
  import { toRefs, computed, watch, onMounted, Ref,ref, createComponent} from '@vue/composition-api'
  import { getService } from '@/comm/context'
  import {getCatalogList,getProductListByCatalogId} from '@/api/product.js'
  var _InstanceService = getService()
  let jumpToPath = _InstanceService.jumpToPath
  const meta = weex.requireModule('meta')
  import {COOCAA_ACCOUNT,NETWORK_INFO} from '@/comm/symbol'
  meta.setViewport({
    width: 750,
    reserveCssStyles: true,
  })
  export default createComponent({
    setup (){
      let  typeList=[]
      // let typeList=[{'leftTitle':'iotTest1','item_id':2,'content':{'10':[{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_2,0190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292},{'product_name':'网关','product_model':'SKY01-GWSWS','product_brand_id':1,'product_image':'https://tv.doubimeizhi.com/images/device/10_SKY01-GWSWS_pro_20190814.png','product_type_id':10,'product_type_name':'网关','config_guide_id':292}],},'index':1},{'leftTitle':'Coocaa 酷开','item_id':62,'content':{},'index':2},{'leftTitle':'电视','item_id':1,'content':{},'index':3}]
      let key = null
      let selLeftItem = 0
      const number = ref(-1)
      let load_symbols = [
        COOCAA_ACCOUNT,
      ]
      console.log('AddDevice data load_symbols:',load_symbols)
      const global_data_map = _InstanceService.getGlobalData(load_symbols)
      console.log('selDevicesetUp coocaa_account:'+JSON.stringify(global_data_map))
      let coocaa_account = global_data_map[COOCAA_ACCOUNT]
      // let network_info = _InstanceService.getReactiveObject(NETWORK_INFO)
      console.log('selDevicesetUp coocaa_account:'+JSON.stringify(coocaa_account))
      let globalState = {
        [COOCAA_ACCOUNT]: coocaa_account,
        [NETWORK_INFO]: null
      }

      console.log('getCatalogList before')
      onMounted(() => {
        console.log('getCatalogList mounted:::')
        // _InstanceService.http()
        getCatalogList(_InstanceService,(onSucess)=>{
          console.log('getCatalogList :onSucess:'+JSON.stringify(onSucess))
          let array = {}
          for (let item of onSucess) {
            let itemShow = {}
            if (item) {
              itemShow.leftTitle = item.display_name
              itemShow.item_id = item.id
              itemShow.content = {}
              itemShow.index = item.index
            }
            Vue.set(array, item.index, itemShow)
          }
          let index1 = 0
          for (let item in array) {
            if (index1 !== 0 && array[item].index < typeList[index1 - 1].index) {
              let itemTemp = typeList[index1 - 1]
              Vue.set(typeList, index1, itemTemp)
              Vue.set(typeList, index1 - 1, array[item])
            } else {
              Vue.set(typeList, index1, array[item])
            }
            index1 = index1 + 1
          }
          console.log('this.typeList:' + JSON.stringify(typeList))
          getModelList(0)
        },(response, error_msg)=>{
          ('getCatalogList :onFaild:')
        },1)
        console.log('getCatalogList mounted:after::')
      })
      function  getModelList(index) {
        if (!typeList[index]) {
          return
        }
        let content = typeList[index].content
        console.log('this.typeList:' + JSON.stringify(content))
        if (typeList[index].isLoad) {
          number.value = index
          return
        }
        // if (!this.loadingShow) {
        //   this.loadingShow = true
        // }
        let catalogId = typeList[index].item_id
        getProductListByCatalogId(_InstanceService,catalogId, (onSuceess) => {
          for (let item of onSuceess) {
            if (!content[item.product_type_id]) {
              content[item.product_type_id] = []
            }
            let showItem = {}

            showItem.product_name = item.display_name
            showItem.product_model = item.product_model
            showItem.product_brand_id = item.product_brand_id
            showItem.product_image = item.img_url
            showItem.product_type_id = item.product_type_id
            showItem.product_type_name = item.product_type_name
            showItem.config_guide_id = item.config_guide_id

            if (item.product_model === 'ZLL' || item.product_model === 'zll') {
              showItem.show_model = '通用型号'
            }
            content[item.product_type_id].push(showItem)
          }
          Vue.set(typeList[index], 'isLoad', 1)
          number.value = index
        }, (response, error_msg) => {
          ('getProductListByCatalogId :onFaild:')
        }, 1)
      }

      const rightArray = computed(()=>{
        let selIndex = number.value
        console.log('rightArray:' + JSON.stringify(selIndex))
        key = typeList[selIndex].leftTitle
        console.log('keys:' + JSON.stringify(typeList))
        let keys = Object.keys(typeList[selIndex].content)
        console.log('keys:' + JSON.stringify(keys))
        let rightArray = []
        for (let i = 0; i < keys.length; i++) {
          let list = []
          let rowSize = 5
          let array = typeList[selIndex].content[keys[i]]
          let size = array.length
          let rowNum = Math.ceil((size * 1.0) / rowSize)
          console.log('selRow:', JSON.stringify(array))
          console.log(`showList size:${size} rowNum: ${rowNum}`)
          for (let index = 0;index < size; index++){
            list.push(array[index])
          }
          // this.$nextTick(()=>{
          rightArray.push({
            product_type_id: keys[i],
            list,
            product_type_name: array[0].product_type_name
          })
          // Vue.set(rightArray,keys[i],list)
          // })
        }
        console.log('rightArray:' + JSON.stringify(rightArray))
        return rightArray
      })

      return{
        number,
        rightArray,
        typeList1:typeList,
        clickSelItem (item){
          jumpToPath('ConfigNet/NetConfigGuide.js',item,{orientation: 'landscape'})
        },
        clickLeftItem (itemIndex){
            getModelList(itemIndex)
          },
      }
    }
  })
</script>

<style scoped>
  .box {
    display: flex;
    position: relative;
    align-items: flex-start;
    flex-direction: column;
    background-color: #f5f5f5;
    /* width: 1920px; */
    height: 1200px;
  }
  .hd {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 17px;
    height: 32px;
  }
  .signal-wrap {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-end;
    width: 1698px;
    height: 32px;
  }
  .signal {
    width: 30px;
    height: 30px;
  }
  .icon-test {
    margin-left: 15px;
    width: 30px;
    height: 30px;
  }
  .percent {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 15px;
    max-width: 89px;
    height: 29px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 29px;
    white-space: nowrap;
    color: #333333;
    font-family: Helvetica;
    font-size: 24px;
    font-weight: normal;
  }
  .iconmyphotos {
    margin-left: 16px;
    width: 44px;
    height: 30px;
  }
  .bd {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 23px;
    padding-right: 59px;
    padding-left: 59px;
    width: 1920px;
  }
  .block {
    display: flex;
    position: relative;
    flex-direction: row;
    width: 983px;
    height: 54px;
  }
  .empty {
    position: absolute;
    top: 24px;
    left: 2px;
    border-top-width: 3px;
    border-top-style: solid;
    border-top-color: rgba(51, 51, 51, 1.00);
    width: 29px;
    height: 4px;
  }
  .fanhui {
    position: relative;
    margin-top: 16px;
    width: 20px;
    height: 20px;
  }
  .nearby-home-appliances {
    margin-top: 2px;
    margin-left: 520px;
    line-height: 45px;
    letter-spacing: 0;
    white-space: nowrap;
    color: #999999;
    font-size: 32px;
    font-weight: 400;
  }
  .select-device {
    margin-top: 2px;
    margin-left: 177px;
    line-height: 45px;
    letter-spacing: 0;
    /*white-space: nowrap;*/
    color: #333333;
    font-size: 32px;
    font-weight: 600;
  }
  .group {
    display: flex;
    flex-direction: row;
  }
  .third-party-import {
    margin-top: 2px;
    line-height: 45px;
    letter-spacing: 0;
    white-space: nowrap;
    color: #999999;
    font-size: 32px;
    font-weight: 400;
  }
  .outer {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row;
    margin-left: 133px;
    border-radius: 10px;
    background-color: rgba(230,230,230,0.60);
    width: 360px;
    height: 54px;
  }
  .div {
    display: flex;
    position: relative;
    align-items: flex-start;
    flex-direction: row;
    margin-top: -3px;
    margin-left: 20px;
    border-width: 2px;
    border-style: solid;
    border-radius: 14.938578216113456px;
    border-color: rgba(153,153,153,1.00);
    width: 17px;
    height: 17px;
  }
  .pic {
    position: absolute;
    bottom: 16px;
    left: 33px;
    width: 8px;
    height: 9px;
  }
  .info {
    margin-left: 13px;
    max-width: 310px;
    height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 28px;
    letter-spacing: 1.67px;
    white-space: nowrap;
    color: #999999;
    font-size: 20px;
    font-weight: 400;
  }
  .submain {
    display: flex;
    position: relative;
    margin-top: 21px;
    /*border-top-width: 2px;*/
    /*border-top-style: solid;*/
    /*!*border-top-color: rgba(230, 230, 230, 1.00);*!*/
    /*width: 1920px;*/
    /*height: 3px;*/
  }
  .main {
    display: flex;
    position: relative;
    flex-direction: row;
    width: 1920px;
    height: 1900px;
  }
  .container {
    display: flex;
    align-items: left;
    flex-direction: column;
    background-color: #ebebeb;
    width: 320px;
    height: 1900px;
  }
  .series-wrap {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 320px;
    height: 120px;
  }
  .sel-back{
    background-color: #f5f5f5;
  }
  .unsel-back{
    background-color: transparent;
  }
  .series {
    max-width: 308px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
    letter-spacing: 0.14px;
    white-space: nowrap;
    color: #333333;
    font-size: 28px;
    font-weight: 600;
  }
  .television {
    margin-top: 40px;
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
    letter-spacing: 0.14px;
    white-space: nowrap;
    color: #666666;
    font-size: 28px;
    font-weight: 400;
  }
  .lighting {
    /*margin-top: 80px;*/
    max-width: 176px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
    letter-spacing: 0.14px;
    white-space: nowrap;
    color: #666666;
    font-size: 28px;
    font-weight: 400;
  }
  .washing-machine {
    margin-top: 80px;
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
    letter-spacing: 0.14px;
    white-space: nowrap;
    color: #666666;
    font-size: 28px;
    font-weight: 400;
  }
  .block-2 {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 60px;
    height: 1050px;
  }
  .television-2 {
    margin-top: 40px;
    /*max-width: 1527px;*/
    margin-left: 40px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 50px;
    letter-spacing: 0.18px;
    white-space: nowrap;
    color: #333333;
    font-size: 36px;
    font-weight: 600;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    /*justify-content: space-between;*/
    margin-top: 30px;
    width: 1481px;
  }
  .col-5 {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 16px;
    background-color: #e6e6e6;
    width: 260px;
    height: 220px;
  }
  .col-row {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-left: 35px;
    border-radius: 16px;
    background-color: #e6e6e6;
    margin-bottom: 20px;
    /*margin-left: 20px;*/
    width: 260px;
    height: 220px;
  }
  .img {
    width: 140px;
    height: 140px;
  }
  .kfrgwvbcb {
    margin-top: 17px;
    max-width: 227px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 28px;
    white-space: nowrap;
    color: #333333;
    font-size: 20px;
    font-weight: 400;
  }
  .kfrgwvbcb-5 {
    margin-top: 17px;
    max-width: 228px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 28px;
    white-space: nowrap;
    color: #333333;
    font-size: 20px;
    font-weight: 400;
  }
  .air-conditioner-2 {
    margin-top: 60px;
    max-width: 1527px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 50px;
    letter-spacing: 0.18px;
    white-space: nowrap;
    color: #333333;
    font-size: 36px;
    font-weight: 600;
  }
  .col-5-3 {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 16px;
    background-color: #e6e6e6;
    width: 260px;
    height: 210px;
  }
  .img-3 {
    margin-top: 16px;
    width: 140px;
    height: 140px;
  }
  .div-2 {
    position: absolute;
    top: 146px;
    left: 908px;
    border-top-width: 4px;
    border-top-style: solid;
    border-top-color: rgba(68, 214, 186, 1.00);
    width: 104px;
    height: 5px;
  }
</style>
