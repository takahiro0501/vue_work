import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    createUser(state,{email,password,username}){
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({ displayName: username })
            .then(() => {
              router.push('/Dashboard');
            }).catch((error) => {
              console.log('ユーザ名エラー： ' + error.message);
          })
        })
        .catch((error) =>{
          console.log('ユーザ登録エラー： ' + error.message);
       })
    },
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
