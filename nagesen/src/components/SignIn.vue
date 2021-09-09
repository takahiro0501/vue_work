<template>
  <div class="SignIn">
    <h1>ログイン画面</h1>
    <ul>
      <li><label>メールアドレス</label><input v-model="email" placeholder="E-mail"></li>
      <li><label>パスワード</label><input v-model="password" placeholder="Password"></li>
    </ul>

    <div class="registBox"><a class="registBtn" @click="signIn">ログイン</a></div>
    <div><router-link to="/" class="loginBtn">新規登録はこちらから</router-link></div>

    <footer>
      Copyright &copy; 2019 ○○ Inc. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      email:'',
      password:''
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('signInUser', { email: this.email, password: this.password});
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul{
  padding-right: 60px;
  margin-bottom: 40px;
}

ul li{
  list-style: none;
}

label{
  display: inline-block;
  width: 130px;
}

.registBox{
  margin-bottom: 5px;
}

.registBtn{
  font-size: 20px;
  text-decoration: none;
  border: solid 1px #66a1eb;
  padding: 8px 15px;
  border-radius: 10%;
  color: #66a1eb;
  cursor: pointer;
}

.registBtn:visited, .loginBtn:visited{
  color: #66a1eb;
}

.registBtn:hover{
  color: white;
  background-color: #0086fb;
}

.loginBtn{
  text-decoration: none;
  font-size: 15px;
}

footer{
  margin-top: 50px;
}


</style>
