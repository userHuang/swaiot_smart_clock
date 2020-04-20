<template>
  <div class="block" @viewappear="onViewAppear" @viewdisappear="onViewDisappear">
    <div>
      <StatusBar ref="statusBar" :statusBarWhite="false"></StatusBar>
      <div class="jumpGuide" @click="jumpToHome()">
        <text class="jumpGuideText">跳过</text>
      </div>
    </div>
    <slider class="slider" interval="1000" auto-play="false" infinite="false" @change="onchange">
      <div class="frame" :key="page.title" v-for="page in pageList">
        <image class="image" resize="cover" :src="getImgPath(page.src)"></image>
        <div class="introduce">
          <text class="introduceTitleText">{{page.title}}</text>
          <text class="introduceOptionsText">{{page.content}}</text>
        </div>
        <div v-if="page.isLastPage" class="jumpExperience" @click="jumpToHome()">
          <text class="jumpExperienceText">开启智慧生活</text>
        </div>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
    <div>
      
    </div>
  </div>
</template>
<style scoped>
.block {
  justify-content: space-between;
  align-items: center;
}
  .jumpExperience {
    height: 64px;
    width: 236px;
    border-style: solid;
    border-color: #44D6BA;
    border-width: 2px;
    border-radius: 32px;
    justify-content: center;
    align-items: center;
    margin-left: 258px;
  }
  .jumpExperienceText {
    font-size: 28px;
    font-family: "PingFangSC";
    color: #44D6BA;
  }
  .introduceTitleText {
    font-size: 48px;
    color: #2F3033;
    font-family: "PingFangSC";
    margin-bottom: 24px;
  }
  .introduceOptionsText {
    font-family: "PingFangSC";
    font-size: 32px;
    color: #999999;
  }
  .introduce {
    width: 750px;
    height: 250px;
    align-items: center;
  }
  .jumpGuide {
    margin-top: 40px;
    margin-left: 640px;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .jumpGuideText {
    font-family: "PingFangSC-Regular";
    font-size: 28px;
    color: #cccccc;
  }
  .image {
    width: 750px;
    height: 618px;
  }
  .slider {
    width: 750px;
    height: 1100px;
  }
  .frame {
    width: 750px;
  }
  .indicator{
    position: absolute;
    width: 100px;
    height: 1950px;
    left: 330px;
    item-color: #E6E6E6;
    item-selected-color: #000000;
    item-size: 18px;
  }
</style>

<script>
import { getImgPath } from "../../utils/utils";
import { getService } from "../../comm/context";

let _SERVICE = getService();
let jumpToPath = _SERVICE.jumpToPath;
const storage = weex.requireModule("storage")

  export default {
    data: function () {
      return {
        pageList: [
          {
          src: 'https://tv.doubimeizhi.com/images/guide_pages/bg_01.png' ,
          title: '设备丰富',
          content: '品类多样 网罗全家',
          isLastPage: false
          },
          {
          src: 'https://tv.doubimeizhi.com/images/guide_pages/bg_02.png' ,
          title: '场景定制',
          content: '智能联动 享受生活',
          isLastPage: false
          },
          {
          src: 'https://tv.doubimeizhi.com/images/guide_pages/bg_03.png' ,
          title: '远程遥控',
          content: '千里之外 一手掌握',
          isLastPage: true
          }
        ]
      }
    },
    methods: {
      getImgPath: getImgPath,
      jumpToHome() {
        storage.setItem("termsOfService", 1, event => {});
        jumpToPath("Index.js", null, { orientation: "" });
    },
    }
  }
</script>
