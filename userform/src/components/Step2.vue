<template>
  <div class="main">
    <div class="contents">
      <div class="about">
        <p>STEP2 以下にお答えください</p>
      </div>

      <div class="question">
        <div class="question1" @click="showQuestion('question2')">
          <p>現在、生命保険に加入されていますか？</p>
          <label>
            <input type="radio" value="はい" v-model="answer.answer1" />はい
          </label>
          <label>
            <input type="radio" value="いいえ" v-model="answer.answer1" />いいえ
          </label>
        </div>

        <div class="question2" @click="showQuestion('question3')" v-if="question2">
          <p>
            現在入院中ですか。または、最近３ヶ月以内に医師の診察・検査の結果、入院・手術をすすめられたことはありますか？
          </p>
          <label>
            <input type="radio" value="はい" v-model="answer.answer2" />はい
          </label>
          <label>
            <input type="radio" value="いいえ" v-model="answer.answer2" />いいえ
          </label>
        </div>

        <div class="question3" v-if="question3">
          <p>
            過去５年以内に、病気やけがで、手術をうけたことまたは継続して７日以上の入院をしたことがありますか？
          </p>
          <label>
            <input type="radio" value="はい" v-model="answer.answer3" />はい
          </label>
          <label>
            <input type="radio" value="いいえ" v-model="answer.answer3" />いいえ
          </label>
        </div>
      </div>
    </div>
    <p>
      <router-link to="/" tag="button">戻る</router-link>
      <router-link to="/Step3" tag="button" @click.native="doUpdate">次へ進む</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Main2",
  data() {
    return {
      answer: { answer1: "", answer2: "", answer3: "" },
      question2: false,
      question3: false,
    };
  },
  methods: {
    showQuestion(str) {
      this[str] = true;
    },
    doUpdate: function () {
      this.$store.commit("setAnswer", this.answer);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
