<template>
  <div>
    <div class="app">
      <tabbar
        ref="reflectName"
        class="tabbar"
        :eeui="{ tabType: 'bottom' , tabBackgroundColor:'#565D67'}"
        @pageSelected="pageSelected"
        @tabReselect="tabReselect"
      >
        <!--页签①-->
        <tabbar-page
          ref="name_1"
          @refreshListener="refreshListener"
          :eeui="{ tabName: 'name_1', title:'首页', selectedIcon:'md-home' }"
        >
          <div>
            <HomePage></HomePage>
          </div>
        </tabbar-page>

        <!--页签②-->
        <tabbar-page
          ref="name_2"
          @refreshListener="refreshListener"
          :eeui="{ tabName: 'name_2', title:'技能', selectedIcon:'https://eeui.app/assets/images/cartoon/m8.png' , unSelectedIcon:'https://eeui.app/assets/images/cartoon/m7.png' }"
        >
          <div class="page-content">
            <Skills></Skills>
          </div>
        </tabbar-page>

        <!--页签③-->
        <tabbar-page
          ref="name_3"
          @refreshListener="refreshListener"
          :eeui="{ tabName: 'name_3', title:'智能家居', message:99, selectedIcon:'md-aperture' }"
        >
          <div class="page-content">
            <SceneModule></SceneModule>
          </div>
        </tabbar-page>

        <!--页签④-->
        <tabbar-page
          ref="name_4"
          @refreshListener="refreshListener"
          :eeui="{ tabName: 'name_4', title:'我的', dot:true, selectedIcon:'md-cog' }"
        >
          <div class="page-content">
            <Mine></Mine>
          </div>
        </tabbar-page>
      </tabbar>
    </div>
    <!-- <div v-if="showTerms">
      <service-terms ></service-terms>
    </div> -->
  </div>
</template>

<style>
.app {
  flex: 1;
}

.iconr {
  width: 100px;
  height: 100px;
  color: #ffffff;
}

.tabbar {
  width: 750px;
  flex: 1;
  padding-top: 60px;
}

.page-content {
  width: 750px;
  /* padding-top: 200px; */
  align-items: center;
  background:#2A3039;
}

.content-text {
  font-size: 24px;
}

.page-navbar {
  width: 750px;
  height: 90px;
}

.page-navbar-title {
  color: #ffffff;
  font-size: 28px;
}

.page-content-image {
  width: 480px;
  height: 480px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.iconContent {
  align-items: left;
  justify-content: left;
  flex-direction: row;
}
</style>

<script>
import Mine from "./Mine"
import HomePage from "./HomePage"
import Skills from "./Skills"
import ServiceTerms from "./ServiceTerms"
import SceneModule from "../../components/smartLife/SceneModule"
import { getService } from "../../comm/context"
import { COOCAA_ACCOUNT } from "../../comm/symbol"

const eeui = app.requireModule("eeui")

let _SERVICE = getService()
let jumpToPath = _SERVICE.jumpToPath


export default {
  components: {
    SceneModule,
    Mine,
    HomePage,
    Skills,
    ServiceTerms
  },
  data() {
    return {
      // showTerms: showTerms
    }
  },
  methods: {
    viewCode(str) {
      this.openViewCode(str);
    },
    pageSelected(params) {
      eeui.toast({
        message: "切换到第" + (params.position + 1) + "个标签页",
        gravity: "middle"
      });
    },
    tabReselect(params) {
      eeui.toast({
        message: "第" + (params.position + 1) + "个标签页被再次点击",
        gravity: "middle"
      });
      eeui.toast();
    },
    refreshListener(params) {
      setTimeout(() => {
        eeui.toast({
          message: "刷新成功：" + params.tabName,
          gravity: "middle"
        });
        this.$refs[params.tabName].refreshEnd();
      }, 1000);
    },

    clickHead() {
      jumpToPath("AuthCoocaa.js", null, { orientation: "" });
    },
    getImgPath() {
      return "";
    }
  },
  mounted () {
    // const coocaa_accout = global_object_map[COOCAA_ACCOUNT];
    // let showTerms = !coocaa_accout.is_login;
    // console.warn(`coocaa_accout.is_logi ${coocaa_accout.is_logi}`)
    // storage.getItem("termsOfService", event => {
    //   console.warn(`termsOfService: ${event.data}`)
    //   event.data === 1 && (this.showTerms = false);
    // });
  }
}
</script>
