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
    //ユーザ登録
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
    //ログインユーザ取得
    getAuthState(){
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          resolve(user.displayName);
        })
      });
    },
    //ユーザログイン
    signInUser(state,{email,password}){
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          router.push('/Dashboard');
        })
        .catch((error) => {
          console.log('ユーザログインエラー： ' + error.message);
      });
    }
  },
  modules: {
  }
})
