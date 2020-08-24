import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    token: '',
    userId: '',
    echartEquipmentType: '',
    api: 'https://www.easy-mock.com/mock/5ceb8c01139fb578b06086e6/iot'
  },
  mutations: {
    settoken(state, token) {
      state.token = token
    },
    setuserId(state, userId) {
      state.userId = userId
    },
    setechartEquipmentType(state, echartEquipmentType) {
      state.echartEquipmentType = echartEquipmentType
    }
  },
  actions: {

  },
  getters: {
    api: state => {
      return state.api;
    },
    token: state => {
      return state.token;
    },
    userId: state => {
      return state.userId;
    }
  }
})
export default store