<template>
  <div class="header">
    <div class="logo">
      <img src="">
    </div>
    <div class="nav">
      <div v-for="(item,index) in pageData" :key="index" @click="switchTab(index)" :class="(index==tabIndex)?'activity':'normal'">
        {{item}}
      </div>
    </div>
    <div class="systemIcon">
      <img src="../../../src/static/img/info.png" alt @click="messageBox" />
      <img src="../../../src/image/language.png" alt v-if="$t('language.name') == 'zh'" @click="changeLanguage('zh')" />
      <img src="../../../src/image/language2.png" alt v-else @click="changeLanguage('en')" />
      <el-tooltip class="item" effect="light" placement="bottom">
        <img src="../../../src/image/user.png" alt />
        <div slot="content" style="cursor: pointer;" @click="loginout()">退出登录</div>
        <div slot="content" style="cursor: pointer;margin-top:10px;">系统设置</div>
      </el-tooltip>
    </div>
    <MessageBox ref="messageBoxChild"></MessageBox>
    <Alarm></Alarm>
  </div>
</template>
<script>
import { logout } from '../../api'
import MessageBox from '../../common/components/MessageBox'
import Alarm from '../../common/components/Alarm'
export default {
  components: {
    MessageBox,
    Alarm
  },
  data() {
    return {
      userId: localStorage.getItem('userId'),
      languageValue: localStorage.getItem('Language') || 'CN',
      token: localStorage.getItem('token'),
      tabIndex: 0,
      logoImg: '',
      pageData: [],
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale == 'zh' ? (this.$i18n.locale = 'en') : (this.$i18n.locale = 'zh') //设置中英文模式
      this.languageValue = this.$i18n.locale
      localStorage.setItem('Language', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
      this.changeLanguageValue()
    },
    getLogo() {
      // let this_ = this
      // this.$http.get('http://srv.shine-iot.com:8060/img/org/logo').then(function (response) {
      //   console.log('获取单位的logo')
      //   this_.logoImg=response.data
      // })
    },
    changeLanguageValue() {
      let initData = [
        this.$t('home.home'),
        this.$t('FireMonitor.FireMonitor'),
        this.$t('ElectricalMonitor.ElectricalMonitor'),
        this.$t('FacilitiesMonitor.FacilitiesMonitor'),
        this.$t('AlarmController.AlarmController'),
        this.$t('DtuGateway.DtuGateway'),
      ]
      this.pageData = initData
    },
    loginout() {
      logout().then((res) => {
        this.$router.push({ name: 'login' })
        this.$message({
          message: '退出成功',
          type: 'success',
        })
      })
    },
    switchTab(index) {
      this.tabIndex = index
      if (this.tabIndex == 0) {
        this.$router.push({ path: 'index' })
      } else if (this.tabIndex == 1) {
        this.$router.push({ path: 'fireMonitoring' })
      } else if (this.tabIndex == 2) {
        this.$router.push({ path: 'ElectricalMonitoring' })
      } else if (this.tabIndex == 3) {
        this.$router.push({ path: 'controllerList' })
      }
    },
    messageBox() {
      this.$refs.messageBoxChild.openMessage()
    },
  },
  mounted() {
    this.changeLanguageValue()
    //this.getLogo()
  },
}
</script>
<style lang="stylus" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  z-index: 4;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid #70d4fe;

  .logo {
    width: 160px;
    height: 60px;
    margin-left: 40px;
    background: rgba(255, 255, 255, 1);
  }

  .nav {
    margin-left: 29px;
    display: flex;

    .activity {
      border-bottom: 4px solid rgba(112, 212, 254, 0.6);
      padding-bottom: 10px;
      cursor: pointer;
      margin-right: 48px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }

    .normal {
      cursor: pointer;
      margin-right: 48px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(204, 204, 204, 1);
    }
  }

  .systemIcon {
    display: flex;
    position: absolute;
    right: 0px;

    img {
      cursor: pointer;
      width: 40px;
      height: 40px;
      margin-right: 40px;
    }
  }
}
</style>