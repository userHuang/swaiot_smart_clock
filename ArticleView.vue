<template>
  <div @viewappear="onViewAppear" @viewdisappear="onViewDisappear">
    <div style="width: 68;height: 68px;margin-left:30px;margin-top:80px;" @click="back()">
      <text style='font-family:iconfont1;font-size:48px;color:#3E3E3E;'>&#xe645;</text>
    </div>
    <web-view :url="url" class="webview"></web-view>
  </div>
</template>
<script>
  import { getImgPath } from '@/utils/utils.js'
  import skyConsole from '@/comm/skyConsole'
  const navigator = app.requireModule('navigator');
  export default {
    data () {
      return {
        url: '',
      }
    },
    created () {
      const params = app.config.params || {}
      skyConsole.log('params='+JSON.stringify(params))
      this.url = params.articleUrl
    },
    methods: {
      getImgPath,
      back () {
        navigator.pop({})
      }
    },
  }
</script>
<style scoped>
  .webview {
    flex: 1;
  }
</style>
