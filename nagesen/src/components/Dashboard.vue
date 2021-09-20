<template>
  <div class="Dashboard">
    <div class="header">
      <div >{{displayName}}さん、ようこそ！！</div>
      <div >残高：{{remaining}} <a class="logoutBtn" @click="signOut">ログアウト</a></div>
    </div>

    <h1>ユーザ一覧</h1>
    <ul>
      <li class="sub">ユーザ名</li>
      <li v-for="(user,index) in registeredUsers" :key="index">
        <div class="name">{{user.displayName}}</div>
        <div>
          <button class="wallet" @click="openWalletModal(user)">walletを見る</button>
          <button class="wallet">送る</button>
        </div>
      </li>
    </ul>

    <wallet-modal v-if="showWallet" @from-child="closeWalletModal"></wallet-modal>

  </div>
</template>

<script>
import WalletModal from './WalletModal.vue'

export default {
  name: 'Dashboard',
  components:{
    WalletModal
  },
  data(){
    return {
      displayName: '',
      remaining: '',
      registeredUsers:[],
      showWallet: false
    }
  },
  created(){
    //ログインユーザ情報（表示名と所持金）を表示する
    this.$store.dispatch('getAuthState')
      .then(() => {
        this.displayName = this.$store.getters.displayName;
        this.remaining = this.$store.getters.money;
        //登録ユーザの情報を表示する
        this.$store.dispatch('getRegisteredUsers');
        this.registeredUsers = this.$store.getters.registeredUsers;

      }).catch(() => {
        this.$router.push('/');
      });
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOutUser');
    },
    openWalletModal(user){
      this.showWallet = true;
      this.$store.commit('chengeFocusUser',user);
    },    
    closeWalletModal(){
      this.showWallet = false;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Dashboard{
  width: 600px;
  margin: 0 auto;
}

.header{
  display: flex;
  justify-content:space-between;
}

.logoutBtn{
  font-size: 12px;
  text-decoration: none;
  border: solid 1px #66a1eb;
  padding: 5px 10px;
  border-radius: 10%;
  color: #66a1eb;
  cursor: pointer;
  margin-left: 20px;
}

.logoutBtn{
  color: #66a1eb;
}

.logoutBtn:hover{
  color: white;
  background-color: #0086fb;
}

ul li{
  display: flex;
  justify-content:space-between;
  list-style: none;
}

.sub{
  font-weight: bold;
  font-size: 20px;
  
}

.name{
  padding-left: 15px;
}

.wallet{
  margin: 2px 3px;
  padding: 5px 7px;
  background-color: #1aa1b9;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
}
</style>
