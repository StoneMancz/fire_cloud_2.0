import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'
import echarts from 'echarts'
import './utils/flexible.js'
import VueAMap from 'vue-amap';
import VueI18n from 'vue-i18n'
import axios from "axios";
import store from './store';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VCharts);
Vue.use(VueI18n)
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: 'd131f815357afc30295997020bd15940',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});
//路由守卫
router.beforeEach((to, from, next) => {
    //不论是刷新还是跳转路由,第一个进入的就是这个路由前置钩子函数
    store.commit("settoken", localStorage.getItem("accessToken"))
    store.commit("setuserId", localStorage.getItem("userId"))
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next();
        } else {
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            //判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = "Bearer" + `${store.state.token}`;
        } else {
            config.headers.Authorization = null;
        }
        return config;
    }, err => {
        return Promise.reject(err);
    });


/* 响应拦截器 */

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效

    if (response.data.code === 2100) {

        store.commit("settoken", '')
        localStorage.setItem('accessToken', '')
        router.replace({
            path: '/login' // 到登录页重新获取token
        })
    }

    return response

}, function (error) {

    return Promise.reject(error)

})

const i18n = new VueI18n({
    locale: localStorage.getItem('Language') || 'zh', //从localStorage里获取用户中英文选择，没有则默认中文
    messages: {
        'zh': Object.assign(require('./components/Language/CN.JS'), zhLocale), // 中文语言包
        'en': Object.assign(require('./components/Language/EN.JS'), enLocale)
    },
    silentTranslationWarn: true,
})

//重点！！在注册Element时设置i18n的处理方法（这里有个小坑）
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});
//长时间未操作放回登录页面
let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut =120 * 60 * 1000 //设置超时时间: 30分钟

window.onload = function () {
    window.document.onmousedown = function () {
        localStorage.setItem("lastTime", new Date().getTime())
    }
};

function checkTimeout() {
    console.log("执行执行czcz");
    currentTime = new Date().getTime()     //更新当前时间
    lastTime = localStorage.getItem("lastTime");
    
    if (currentTime - lastTime > timeOut) { //判断是否超时
        console.log("超时超时");
        // 清除storage的数据(登陆信息和token)
        store.commit("settoken", '')
        localStorage.setItem('accessToken', '')
        // 跳到登陆页
        if (router.path == '/login') return // 当前已经是登陆页时不做跳转
        router.replace({
            path: '/login' // 到登录页重新获取token
        })
    }
}
/* 定时器 间隔30秒检测是否长时间未操作页面 */
window.setInterval(checkTimeout, 3000);

export default i18n
new Vue({
    el: '#app',
    router,
    store,
    i18n: i18n,
    components: {
        App
    },
    template: '<App/>',
    render: h => h(App)
})