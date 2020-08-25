<template>
  <div class="closeImg">
    <img src="../../../static/img/close.png">
    <el-radio-group v-model="radio1" style="margin-top:10px">
      <el-radio-button label="关"></el-radio-button>
      <el-radio-button label="开"></el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio1: '关',
    }
  },
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