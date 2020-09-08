<template>
  <div id="login">
    <div class="login">
      <div class="logo">
        <img src="./../../image/logo.png" alt />
      </div>
      <div class="message">
        <div class="userName">
          <div>
            <i class="el-icon-user-solid"></i>
          </div>
          <div>
            <input type="text" v-model="username" :placeholder="$t('UserName.UserNameMessage')" />
          </div>
        </div>
        <div class="password">
          <div>
            <i class="el-icon-s-platform"></i>
          </div>
          <div>
            <input type="password" v-model="password" :placeholder="$t('passWord.passwordMessage')" />
          </div>
        </div>
        <div class="btn">
          <div class="button" @click="router()">{{ $t('SignIn.SignIn') }}</div>
          <div>
            <el-select v-model="value" :placeholder="$t('Select.Select')" style="background:white">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
body,
html {
  height: 100%;
}
#login {
  width: 100%;
  height: 100%;
  background: url('./../../image/bg.png') no-repeat;
  margin: 0px;
  background-size: 100% 100%;
  background-attachment: fixed;
  overflow: hidden;
}
.login {
  width: 60%;
  height: 70%;
  background: rgba(255, 255, 255, 0.5);
  margin: 5% auto;
  overflow: hidden;
}
.logo {
  width: 30%;
  margin: 5% auto 3% auto;
}
.logo img {
  width: 100%;
}
.message {
  width: 25%;
  margin: 0 auto;
}
.userName {
  width: 100%;
  margin-top: 0.2rem;
  font-size: 0.13rem;
  line-height: 0.23rem;
  display: flex;
}
.userName div:first-child {
  flex: 1.2;
}

.userName div:last-child {
  flex: 8;
}
.password {
  font-size: 0.13rem;
  line-height: 0.23rem;
  display: flex;
}
.password div:first-child {
  flex: 1.2;
}

.password div:last-child {
  flex: 8;
}
i {
  line-height: 0.28rem;
  color: #19a0bd;
}
input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 0.08rem;
  line-height: 0.23rem;
  width: 100%;
}
.btn {
  width: 100%;
  margin: 2% auto;
  display: flex;
}
.btn div {
  flex: 1;
  height: 0.2rem;
  margin: 0 0.03rem;
  text-align: center;
  line-height: 0.2rem;
  color: #fff;
  border-radius: 5%;
  cursor: pointer;
}
.btn div:last-child {
  flex: 1.5;
}
.button {
  background: #19a0bd;
}
.button:active {
  background: #1dadcc;
}
>>> .el-select {
  margin: 0;
}
</style>
<script>
import { loginApi, detailApi } from '../../api.js'
import qs from 'qs'
export default {
  data() {
    return {
      value: localStorage.getItem('Language'),
      password: '',
      username: '',
      options: [
        {
          value: 'en-US',
          label: 'English',
        },
        {
          value: 'zh-CN',
          label: '简体中文',
        },
      ],
    }
  },
  mounted() {},
  created: function () {
    var _this = this
    document.onkeydown = function (e) {
      //按下回车提交
      let key = window.event.keyCode
      //事件中keycode=13为回车事件
      if (key == 13) {
        _this.router()
      }
    }
  },
  methods: {
    router() {
      if (this.username == '' || this.username == null) {
        this.$message.error('请输入用户名')
      } else if (this.password == '' || this.password == null) {
        this.$message.error('请输入密码')
      } else {
        this.$store.commit('settoken', '')
        localStorage.setItem('accessToken', '')
        var currentData = qs.stringify({
          username: this.username,
          password: this.password,
        })
        let this_ = this
        this.$http.post('http://srv.shine-iot.com:8060/login', currentData).then(function (res) {
          res = res.data
          if (res.code == 1000) {
            this_.$store.commit('settoken', res.data.token)
            localStorage.setItem('accessToken', res.data.token)
            this_.$store.commit('setuserId', res.data.userId)
            localStorage.setItem('userId', res.data.userId)
            this_.$router.push({ path: 'index' })
          } else {
            this_.$message.error('请输入密码')
          }
        })
      }
    },
    changeLanguage() {
      this.$i18n.locale == 'zh' ? (this.$i18n.locale = 'en') : (this.$i18n.locale = 'zh') //设置中英文模式
      localStorage.setItem('Language', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
    },
  },
  watch: {
    value(v) {
      this.changeLanguage()
    },
  },
}
</script>