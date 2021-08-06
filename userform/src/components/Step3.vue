<template>
  <div class="main">
    <div class="contents">
      <div class="about">
        <p>STEP3 ご相談内容をご記入ください</p>
      </div>

      <div class="question">
        <p>-ご相談内容-</p>
        <textarea v-model="answer.text" rows="30" cols="60"></textarea>
      </div>
    </div>

    <p>
      <router-link to="/Step2" tag="button">戻る</router-link>
      <router-link to="/" tag="button" @click.native="doConfirm">次へ進む</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Main2",
  data() {
    return {
      answer: { text: "" },
    };
  },
  methods: {
    doConfirm: function () {
      this.$store.commit("setAnswer", this.answer);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question {
  text-align: center;
}
</style>
