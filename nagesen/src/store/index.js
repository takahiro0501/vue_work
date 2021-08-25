import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    getAuthState(){
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          resolve(user.displayName);
        })
      });
    }
  },
  modules: {
  }
})
