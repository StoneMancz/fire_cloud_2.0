import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index/index.vue'
import fireMonitoring from '@/components/fireMonitoring/index.vue'
import ElectricalMonitoring from '@/components/ElectricalMonitoring/ElectricalMonitoring.vue'
import controllerList from '@/components/controller/controllerList.vue'
import device from '@/components/device/device.vue'
import deviceMonitoring from '@/components/deviceMonitoring/deviceMonitoring.vue'
import login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'login',
        component: login,
        meta: { requiresAuth: false }
    },
    {
        // 首页
        path: '/login',
        name: 'login',
        component: login,
        meta: { requiresAuth: false }
    },
    {
        // 首页
        path: '/index',
        name: 'index',
        meta: {
            requireAuth: true
        },
        component: index
    },
    {
        //火灾监控
        path: '/fireMonitoring',
        name: 'fireMonitoring',
        meta: {
            requireAuth: true
        },
        component: fireMonitoring
    },
    {
        //电气火灾监控
        path: '/ElectricalMonitoring',
        name: 'ElectricalMonitoring',
        meta: {
            requireAuth: true
        },
        component: ElectricalMonitoring
    },
    {
        path: '/controllerList',
        name: 'controllerList',
        meta: {
            requireAuth: true
        },
        component: controllerList
    },
    {
        path: '/device',
        name: 'device',
        meta: {
            requireAuth: true
        },
        component: device
    },
    {
        path: '/deviceMonitoring',
        name: 'deviceMonitoring',
        meta: {
            requireAuth: true
        },
        component: deviceMonitoring
    }]
})