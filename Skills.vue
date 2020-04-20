<template>
  <div class="skills-page scroller">
    <!-- <NavHeader :title="title" bgColor="red"></NavHeader> -->
    <div class="title">
      <div class="title-icon"></div>
      <div class="">
        <text class="title-name">全部技能</text>
      </div>
    </div>
    <div class="main">
      <div class="list-item" v-for="(skill, index) in skillDatas" :key="index">
        <div class="list-item-left">
          <div></div>
        </div>
        <div class="list-item-right">
          <div class="list-item-title">
            <text class="text-title">{{skill.title}}</text>
          </div>
          <div class="list-item-value">
            <text class="text-value" v-for="value in skill.values" :key="value">“{{value}}”</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '我的账户',
      skillDatas: [{
        title: '闹钟',
        values: ['工作日早上7点叫我起床', '星期六早上8点提醒我去机场']
      }, {
        title: '股票',
        values: ['创维股票', '今天大盘走势如何', '010810的股价多少']
      }, {
        title: '儿童',
        values: ['打开儿童模式', '播放儿歌', '粉红猪的故事', '好习惯的故事']
      }, {
        title: '闲聊',
        values: ['你多大了', '你睡了吗', '你的体重多少', '今天天气怎么样']
      }, {
        title: '股票',
        values: ['创维股票', '今天大盘走势如何', '010810的股价多少']
      }, {
        title: '儿童',
        values: ['打开儿童模式', '播放儿歌', '粉红猪的故事', '好习惯的故事']
      }]
    }
  }
}
</script>

<style>
  .skills-page {
    background-image: linear-gradient(180deg,#2A3039,#343A43);
    width: 750px;
    flex: 1;
  }

  .title {
    height: 70px;
    width: 750px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .title-icon {
    width: 8px;
    height: 30px;
    background-color: rgba(255,72,3,1);
    border-radius: 5px;
    margin-left: 20px;
    margin-right: 12px;
  }

  .title-name {
    height:70px;
    font-size:50px;
    font-family:PingFangHK-Semibold,PingFangHK;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:70px;
  }

  .main {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .list-item {
    width: 710px;
    border-radius:24px;
    /* min-height: 200px; */
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
    padding-bottom: 30px;

    flex-direction: row;
    background-color: rgba(243,245,248,0.1);
    color: #FFF;
  }

  .list-item-left {
    width:100px;
    height:100px;
    background-image: linear-gradient(45deg,rgba(8,168,111,1) 0%,rgba(35,216,161,1) 100%);
    border-radius:12px;
  }

  .list-item-right {
    display: flex;
    margin-left: 30px;
  }

  .text-title {
    font-size:36px;
    font-family:PingFangHK-Semibold,PingFangHK;
    font-weight:600;
    color:rgba(255,255,255,1);
  }

  .list-item-value {
    /* height:80px; */
    line-height:40px;
    margin-left: 10px;
    margin-top: 20px;
  }

  .text-value {
    font-size:28px;
    font-family:PingFangHK-Regular,PingFangHK;
    font-weight:400;
    color:rgba(151,155,170,1);
  }
</style>
