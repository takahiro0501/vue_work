import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser:{
      displayName:'',
      money:'',
      email:''
    },
    registeredUsers:[],
    focusUser:''
  },
  getters: {
    displayName(state) { return state.loginUser.displayName},
    money(state) { return state.loginUser.money},
    email(state) { return state.loginUser.email},
    registeredUsers(state) { return state.registeredUsers},
    focusUser(state)  { return state.focusUser}
  },
  mutations: {
    chengeFocusUser(state,user){
      state.focusUser = user;
    },
    chengeLoginUserMoney(state,money){
      state.loginUser.money = money;
    }
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
          if(user){
            this.state.loginUser.displayName = user.displayName;
            this.state.loginUser.email = user.email;
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
          } else {
            router.push('/SignIn').catch(() => {});
          }
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
    //ダッシュボード画面でのログアウト処理
    signOutUser(){
      firebase.auth().signOut()
        .then(() => {
          console.log("ログアウト成功");
        })
        .catch((error) => {
          console.log('ログアウトエラー：　'　+ error.message);
        })
    },
    //登録ユーザの情報を取得する
    async getRegisteredUsers(){
      await firebase.firestore().collection('wallet').get().then((querySnapshot) => {
        //配列の初期化
        this.state.registeredUsers.splice(0,this.state.registeredUsers.length);
        //DBから登録ユーザデータを保存
        querySnapshot.forEach((doc) => {
            if(this.state.loginUser.email !== doc.data().email){
              this.state.registeredUsers.push(doc.data());
            } else {
              this.state.loginUser.money = doc.data().money;
            }
        });
      });
    },
    //送金金額をDBに反映する
    async updateMoney(state,sendMoney){

      //送金元ユーザのドキュメントID取得
      const sendUserID = await this.dispatch('getDocumentID', this.state.loginUser.email);

      //送金先ユーザのドキュメントID取得
      const receiveUserID = await this.dispatch('getDocumentID', this.state.focusUser.email);

      //金額をDBに反映する
      const batch =  firebase.firestore().batch();

      //送信元ユーザの金額変更
      const sendRef = firebase.firestore().collection('wallet').doc(sendUserID);
      const resultMoney = Number(this.state.loginUser.money) - Number(sendMoney)
      this.state.loginUser.money = resultMoney;
      batch.update(sendRef, {money: resultMoney});

      //送信先ユーザの金額変更
      const receiveRef = firebase.firestore().collection('wallet').doc(receiveUserID);
      batch.update(receiveRef, {money: Number(this.state.focusUser.money) + Number(sendMoney)});

      //一括更新
      await batch.commit();

    },
    async getDocumentID(state,email){
      //対象のドキュメントID取得
      return await new Promise((resolve) => {
        firebase.firestore().collection('wallet').where('email','==',email).get()
          .then(snapshot => {
            snapshot.forEach((postDoc) => {
              resolve(postDoc.id);
          })
        })
      })
     }

  },
  modules: {
  }
})
