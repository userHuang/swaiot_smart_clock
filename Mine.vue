<template>
  <div class="page">
    <div class="head" @click="clickHead()" @longpress="service.logout()">
      <div
        v-if="COOCAA_ACCOUNT.is_login"
        style="flex-direction: row; align-items: center;"
      >
        <img
          style="width: 132px;height: 132px;border-radius: 66px;"
          :src="COOCAA_ACCOUNT.avatar"
        />
        <div style="margin-left: 20px;">
          <text
            style="font-family: 'PingFangSC-Medium';font-weight: 600;font-size: 40px;color: #000000;"
            >{{COOCAA_ACCOUNT.nick_name}}</text
          >
          <text
            style="font-family: 'PingFangSC-Medium';font-size: 24px;color: #000000;padding-top: 6px;"
            >共{{FAMILY_DEVICES_COUNT}}台设备</text
          >
        </div>
      </div>
      <div v-else style="flex-direction: row; align-items: center;">
        <image
          style="width: 132px;height: 132px;border-radius: 66px;"
          :src="getImgPath('default_head_icon')"
        />
        <!-- <img style="width: 132px;height: 132px;border-radius: 66px;"  :src="COOCAA_ACCOUNT.avatar || 'http://img.52z.com/upload/news/image/20200212/20200212044719_22769.jpg'" />  -->
        <div style="margin-left: 20px;">
          <text
            style="font-family: 'PingFangSC-Medium';font-weight: 600;font-size: 40px;color: #000000;"
            >未登录</text
          >
          <text
            style="font-family: 'PingFangSC-Medium';font-size: 24px;color: #000000;padding-top: 6px;"
            >点击注册/登录</text
          >
        </div>
      </div>
      <image
        style="width:24px;height:24px;"
        :src="getImgPath('right_in_icon')"
      ></image>
    </div>
    <div
      v-for="(item, index) in [
        {
          title: '我的设备',
          icon: 'connect_icon'
        },
        {
          title: '我的收藏',
          icon: 'collect_icon'
        },
        {
          title: '辅助工具',
          icon: 'tool_icon'
        },
        {
          title: '帮助说明',
          icon: 'help_icon'
        },
        {
          title: '连接其他设备',
          icon: 'device_icon'
        },
        {
          title: '设置',
          icon: 'setting_icon'
        }
      ]"
      :key="index"
      class="commonItem"
      @click="clickItem(item, index)"
    >
      <div class="iconContent">
        <image
          style="width:48px;height:48px;"
          :src="getImgPath(item.icon)"
        ></image>
        <text
          style="font-family: 'PingFangSC-Regular';font-size: 32px;color: #000000;padding-left: 20px;"
          >{{ item.title }}</text
        >
      </div>
      <!-- <text style="margin-left: 60px;font-family: iconfont1;color: #333333;font-size: 36px">&#xe718;</text> -->
      <image
        style="width:24px;height:24px;"
        :src="getImgPath('right_in_icon')"
      ></image>
    </div>
  </div>
</template>

<script>
import {
  ref,
  toRefs,
  reactive,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  provide,
  inject
} from "@vue/composition-api";
import { ICON_FONT_MODULE, COOCAA_ACCOUNT,FAMILY_DEVICES_COUNT} from "../../comm/symbol";
import { getImgPath } from "../../utils/utils";
import { getService } from "../../comm/context";
const modal = weex.requireModule("modal");
import skyConsole from "@/comm/skyConsole.js";
let _SERVICE = getService();
let jumpToPath = _SERVICE.jumpToPath
export default {
  name: "Mine",
  setup() {
    let load_symbols = { ICON_FONT_MODULE, COOCAA_ACCOUNT,FAMILY_DEVICES_COUNT};
    const global_data_map = _SERVICE.getGlobalData(load_symbols);
    let coocaa_account = global_data_map[COOCAA_ACCOUNT];
    let device_count = global_data_map[FAMILY_DEVICES_COUNT]
    skyConsole.log("coocaa_account===", coocaa_account);
    skyConsole.log('device_count===',device_count)
    return {
      ...toRefs(global_data_map),
      service: _SERVICE,
      clickHead() {
        if (coocaa_account.is_login) {
          modal.toast({ message: "暂未开放,敬请期待!", duration: 0 });
        } else {
          jumpToPath("AuthCoocaa.js", null, { orientation: "" });
        }
      }
    };
  },
  methods: {
    getImgPath: getImgPath,
    jumpToPath:jumpToPath,
    clickItem(item, index) {
      skyConsole.log("click mine item");
      modal.toast({ message: "暂未开放,敬请期待!", duration: 0 });
    }
  }
};
</script>
<style scoped>
.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  width: 750px;
}
.head {
  width: 750px;
  height: 200px;
  padding-left: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
}
.commonItem {
  width: 750px;
  height: 104px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
}
.iconContent {
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
</style>
