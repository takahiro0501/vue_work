<template>
  <div class="main">
    <div class="contents">
      <div class="about">
        <p>STEP1 お客様の情報を入力してください</p>
      </div>

      <div class="question">
        <p>-性別-</p>
        <label><input type="radio" value="male" v-model="answer.sex" />男性</label>
        <label><input type="radio" value="female" v-model="answer.sex" />女性</label>

        <p>-生年月日-</p>
        <select v-model="answer.year" @change="getDays">
          <option
            v-for="nengo in nengoes"
            :value="nengo.year"
            :key="nengo.year"
          >
            {{ nengo.label }}
          </option>
        </select>
        年

        <select v-model="answer.month" @change="getDays">
          <option v-for="n in 12" :value="n" :key="n">{{ n }}</option>
        </select>
        月

        <select v-model="answer.day">
          <option v-for="n in days_max" :value="n" :key="n">{{ n }}</option>
        </select>
        日
      </div>
    </div>
    <p>
      <router-link to="/Step2" tag="button" @click.native="doUpdate">次へ進む</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      answer: { sex: "", year: 1990, month: 1, day: 1 },
      nengoes: [],
      days_max: "",
    };
  },
  mounted() {
    this.nengoes = this.genereate();
  },
  created: function () {
    this.getDays();
  },
  methods: {
    genereate() {
      const nengoes = [];
      for (let y = 2020; y > 1960; y--) {
        if (y > 2018) {
          nengoes.push({ year: y, label: `${y}年 (令和${y - 2018})` });
        } else if (y > 1988) {
          nengoes.push({ year: y, label: `${y}年 (平成${y - 1988})` });
        } else if (y > 1925) {
          nengoes.push({ year: y, label: `${y}年 (昭和${y - 1925})` });
        } else if (y > 1911) {
          nengoes.push({ year: y, label: `${y}年 (大正${y - 1911})` });
        }
      }
      return nengoes;
    },
    getDays: function () {
      this.days_max = new Date(
        this.answer.year,
        this.answer.month,
        0
      ).getDate();
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
