<template>
  <div class="Dashboard">
    <div class="header">
      <div>{{displayName}}さん、ようこそ！！</div>
      <div>残高：{{remaining}} <a class="logoutBtn">ログアウト</a></div>
    </div>

    <h1>ユーザ一覧</h1>
    <p>課題４－３で対応のため未実装</p>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return {
      displayName: '',
      remaining: '-'
    }
  },
  created(){
    this.$store.dispatch('getAuthState')
      .then((displayName) => { 
        this.displayName = displayName;
      }).catch(() => {
        this.$router.push('/');
      });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Dashboard{
  width: 1000px;
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

</style>
