import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser:{
      displayName:'',
      money:''
    }
  },
  getters: {
    displayName(state) { return state.loginUser.displayName},
    money(state) { return state.loginUser.money}
  },
  mutations: {
  },
  actions: {
    //新規登録画面でのユーザ登録処理
    createUser(state,{email,password,username}){
      //１，認証ユーザの登録
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          //２，表示名の登録
          user.user.updateProfile({ displayName: username })
            .then(() => {
              //３，ユーザデータDB追加
              firebase.firestore().collection('wallet').add({
                displayName: username,
                email: email,
                money: 1000
              })
              .then(() => {
                //１～３の全ての処理が正常に完了した場合、dashboardへ移動
                router.push('/Dashboard');
              })
              .catch((err) => {
                console.log("ユーザデータ追加エラー");
                console.log(err);
              })
            }).catch((error) => {
              console.log('ユーザ認証登録エラー： ' + error.message);
          })
        })
        .catch((error) =>{
          console.log('ユーザ登録エラー： ' + error.message);
       })
    },
    //ダッシュボード移動時のログインユーザ情報取得処理
    getAuthState(){
      return new Promise((resolve) => {
        //ログインユーザ情報取得
        firebase.auth().onAuthStateChanged((user) => {
          this.state.loginUser.displayName = user.displayName;
          //ログインユーザemailからＤＢ検索
          firebase.firestore().collection('wallet').where('email','==',user.email).get()
            .then(snapshot => {
              console.log('データ取得件数:' + snapshot.size);
              //ログインユーザの所持金取得
              snapshot.forEach((postDoc) => {
                this.state.loginUser.money = postDoc.data().money;
              })
              resolve();
            })
        })
      });
    },
    //ログイン画面でのログイン処理
    signInUser(state,{email,password}){
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          router.push('/Dashboard');
        })
        .catch((error) => {
          console.log('ユーザログインエラー： ' + error.message);
      });
    },
  },
  modules: {
  }
})
