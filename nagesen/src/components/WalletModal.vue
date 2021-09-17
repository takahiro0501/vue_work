<template>
  <div id="overlay" @click="closeModal">
    <div id="content" @click="stopEvent">
      <p>{{user.displayName}}さんの残高</p>
      <p>{{user.money}}</p>
      <div class="bottom">
        <button @click="closeModal">close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WalletModal',
  data(){
    return {
      user:''
    }
  },
  created(){
    this.user = this.$store.getters.focusUser;
  },
  methods: {
    closeModal(){
      this.$emit('from-child')
    },
    stopEvent(event){
      event.stopPropagation()
    }
  }
}
</script>

<style scoped>

/* モーダルウィンドウ設定 */
#content{
  z-index:10;
  width:200px;
  height:100px;
  background:#fff;
}

#overlay{
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

#content p{
  margin: 8px;
}

.bottom{
  background-color: #c9cac9;
  width: 200px;
  height: 40px;
}

.bottom button{
  padding: 5px;
  margin-top: 10px;
  margin-left: 130px;
  background-color: #db2341;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
}

</style>
