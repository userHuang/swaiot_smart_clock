<template>
  <div class="clock-home">
    <div class="home-head">
      <text class="head-text">主控设备</text>
      <div class="head-add" @click="onAddDeviceClick()">
        <text class="add-icon">&#xe72f;</text>
        <text class="head-text">添加设备</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clock-home {
  background: #2A3039;
}

.home-head {
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  font-size: 36px;
}

.head-text {
  margin-left: 20px;
  font-size: 36px;
}

.head-add {
  align-self: center;
  flex-direction: row;
  margin-left: 350px;
  font-size: 36px;
}

.add-icon {
  width: 36px;
  height: 36px;
}
</style>


<script>
import { getService } from "../../comm/context";

let _SERVICE = getService();
let jumpToPath = _SERVICE.jumpToPath;

export default {
  name: "HomePage",
  methods: {
      onAddDeviceClick (){
        jumpToPath('device/AddDevice.js',null,{orientation: ''});
      }
  }
};
</script>


