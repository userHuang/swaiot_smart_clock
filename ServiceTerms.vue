<template>
  <div class="dialog-back">
    <div class="dialog-box" v-if="isShowDialog">
      <text class="dialog-title">提示</text>
      <div class="dialog-content-box">
        <text class="dialog-content-text">
          欢迎您使用小维智联！
          在您使用前请认真阅读并充分理解《隐私政策》、《服务条款》全部内容，您需同意后才能使用我们的服务；
          如对条款中的内容有任何疑问，您可向隐私政策中提供的邮箱反馈。如果您不同意本条款和政策中的任何内容，您应立即停止使用小维智联服务。
        </text>
      </div>
      <div class="agree-Content" @click="clickAgreeIcon()">
        <div
          class="dialog-content-buttom"
          :class="[isClickedAgree? 'colorBgBlueBlue' : 'colorGrey1']"
        >
          <image
            v-if="isClickedAgree"
            style="width: 32px;height: 32px;"
            :src="getImgPath('ic_choose_white')"
          />
          <image v-else style="width: 32px;height: 32px;" :src="getImgPath('ic_choose_grey')" />
        </div>
        <div class="terms">
          <text class="terms-text">已阅读并同意</text>
          <text class="terms-link" @click="clickJumpService()">《服务条款》</text>
          <text class="terms-text">和</text>
          <text class="terms-link" @click="clickjumpPrivacy()">《隐私政策》</text>
        </div>
      </div>
      <div class="agree-box" @click="clickAgree()">
        <text class="agree-text">同意并继续</text>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dialog-back {
  background-color: #2b2424;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-box {
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  height: 660px;
  position: relative;
  background-color: #ffffff;
  border-radius: 16px;
}

.dialog-title {
  align-self: center;
  font-family: "Roboto-Medium";
  font-size: 36px;
  color: #3e3e3e;
  font-weight: bold;
  margin-top: 16px;
}

.dialog-content-box {
  width: 484px;
  height: 330px;
}

.dialog-content-text {
  flex: 1;
  font-family: "Roboto-Regular";
  font-size: 27px;
  color: #3e3e3e;
  margin-left: 10px;
  line-height: 35px;
}

.dialog-content-buttom {
  align-items: center;
  display: inline-block;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-width: 2px;
  border-radius: 16px;
  border-style: solid;
}
.agree-content {
  width: 494px;
  flex-direction: row;
  margin-bottom: 40px;
  margin-top: 20px;
  display: inline-block;
}

.terms {
  flex-direction: row;
  flex-wrap: wrap;
}

.terms-text {
  font-family: "Roboto-Regular";
  font-size: 24px;
  color: #3e3e3e;
}

.terms-link {
  font-family: "Roboto-Regular";
  font-size: 24px;
  color: #00ceff;
}

.agree-box {
  width: 544px;
  height: 88px;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  border-radius: 16px;
}

.agree-text {
  font-family: "Roboto-Bold";
  font-size: 32px;
  color: #3e3e3e;
  font-weight: bold;
}

.colorBgBlueBlue {
  background-color: #44d6ba;
  border-color: #44d6ba;
}
.colorGrey1 {
  border-color: #d1d1d1;
}
</style>
<script>
import { COOCAA_ACCOUNT } from "../../comm/symbol"
import { getService } from "../../comm/context"
import { getImgPath } from "../../utils/utils"

const storage = weex.requireModule("storage")
const modal = weex.requireModule("modal")

let _SERVICE = getService()
let jumpToPath = _SERVICE.jumpToPath

export default {
  data() {
    return {
      isShowDialog: true,
      isClickedAgree: false
    };
  },
  methods: {
    jumpToPath,
    getImgPath,
    clickJumpService() {
      this.jumpToPath("terms/TermOfService.js", null, { orientation: "" });
      // if (this.networkInfo.isConnect === false) {
      //   modal.toast("网络连接失败，请检查网络");
      //   return;
      // } else {
      //   this.jumpToPath("TermOfService.js");
      // }
    },

    clickjumpPrivacy() {
      this.jumpToPath("terms/PrivacyPolicy.js", null, { orientation: "" });
      // if (this.networkInfo.isConnect === false) {
      //   modal.toast("网络连接失败，请检查网络");
      //   return;
      // } else {
      //   this.jumpToPath("PrivacyPolicy.js");
      // }
    },

    clickAgreeIcon() {
      this.isClickedAgree = !this.isClickedAgree;
    },

    clickAgree() {
      if (this.isClickedAgree) {
        jumpToPath("GuidePage.js", null, { orientation: "" });
      } else {
        modal.toast({ message: "请阅读并同意以上条款", duration: 2 });
      }
    }
  },

  beforeCreate() {
    const global_object_map = _SERVICE.getGlobalData([COOCAA_ACCOUNT])
    const coocaa_accout = global_object_map[COOCAA_ACCOUNT]
    if (coocaa_accout.is_login ) {
      jumpToPath("Index.js", null, { orientation: "" });
    }
    else{
      storage.getItem( 'termsOfService',event => {
        console.error(`beforeCreate: ${event.data}`)
        event.data == 1 && jumpToPath("Index.js", null, { orientation: "" });
      })
    }
  }

};
</script>