<template>
  <div class="main">
    <div class="contents">
      <div class="about">
        <p>STEP4 以下の内容をご確認ください</p>
      </div>
 
 
      <div class="question">
 
      <p>-性別-</p>
      {{answer.sex}}
      
      <p>-生年月日-</p>
      {{answer.year}}年{{answer.month}}月{{answer.day}}日

      <p>-現在、生命保険に加入されていますか？-</p>
      {{answer.answer1}}

      <p>-現在入院中ですか。または、最近３ヶ月以内に医師の診察・検査の結果、入院・手術をすすめられたことはありますか？-</p>
      {{answer.answer2}}

      <p>-過去５年以内に、病気やけがで、手術をうけたことまたは継続して７日以上の入院をしたことがありますか？-</p>
      {{answer.answer3}}

      <p>-ご相談内容-</p>
      {{answer.text}}


      </div>
    </div>

    <p>
      <router-link to="/Step2" tag="button">前へ戻る</router-link>
      <router-link to="/" tag="button">送信</router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: "Main",
  data() {
    return {
      answer: {}
    }
  },
  created: function () {
      this.answer = this.$store.getters.getAnswer ;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 750px;
}
</style>
