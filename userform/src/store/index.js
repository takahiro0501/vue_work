import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answer: {sex:'', year:'', month:'', day:'', answer1:'', answer2:'',answer3:'',text:''}
  },
  mutations: {
    setAnswer(state,payload) {
      for( const i of Object.keys(payload)){
        state.answer[i] = payload[i];
      }
    }
  },
  getters: {
    getAnswer: state => {
      return state.answer
    }
  },
  actions: {
  },
  modules: {
  }
})
