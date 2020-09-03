<template>
  <div class="closeImg">
    <img src="../../../static/img/close.png" @click="SeeDeviceDetail">
    <el-radio-group v-model="radio1" style="margin-top:10px">
      <el-radio-button label="关" ></el-radio-button>
      <el-radio-button label="开" disabled></el-radio-button>
    </el-radio-group>
    <DeviceDetailsCom ref="childEquipmentDetails"></DeviceDetailsCom>
  </div>
</template>
<script>
import DeviceDetailsCom from '../../../common/components/DeviceDetails'
export default {
  data() {
    return {
      radio1: '关',
    }
  },
  props: ['deviceId'],
  methods:{
    SeeDeviceDetail() {
      this.$refs.childEquipmentDetails.openEquipmentDetails(this.deviceId)
    }
  },
  components:{
    DeviceDetailsCom
  }
}
</script>
<style lang="stylus" scoped>
.closeImg {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 210px;
  justify-content: center;
  align-items: center;

  img {
    width: 128px;
    height: 133px;
  }
}
</style>