<template>
  <div id="overlay" @click="closeModal">
    <div id="content" @click="stopEvent">
      <p>あなたの残高：{{user.money}}</p>
      <p>送る金額</p>
      <input type="number" class="input" v-model="sendMoney">
      <div class="bottom">
        <button @click="closeModal">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendModal',
  data(){
    return {
      user:'',
      sendMoney:''
    }
  },
  created(){
    this.user = this.$store.getters.focusUser;
  },
  methods: {
    closeModal(){
      this.$emit('from-child',this.sendMoney);
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
  height:140px;
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

.input{
  margin: 8px 0;
}
</style>
