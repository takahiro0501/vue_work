<template>
  <div id="app">
    <h1>ToDoリスト（VUE版）</h1>
    <label><input type="radio" v-model="state" value="all" />すべて</label>
    <label><input type="radio" v-model="state" value="active" />作業中</label>
    <label><input type="radio" v-model="state" value="completed" />完了</label>

    <list
      :todos="filterTodos"
      @remove="removeTask"
      @change="changeState"
    ></list>

    <h2>新規タスクの追加</h2>
    <input v-model="task" size="20" /><button class="button" @click="addTask">
      追加
    </button>
  </div>
</template>

<script>
import list from "@/components/list.vue";

export default {
  name: "app",
  components: {
    list,
  },
  data() {
    return {
      state: "all",
      task: "",
      todos: [],
    };
  },
  methods: {
    //新規タスクの追加
    addTask() {
      this.todos.push({
        comment: this.task,
        state: "作業中",
        id: this.todos.length,
      });
      this.task = "";
    },
    //タスクの削除、IDの降り直し
    removeTask(index) {
      this.todos.splice(index, 1);  
      this.todos.forEach((todo,index) => {
        todo.id = index;
      });
    },
    //タスク状態の変更
    changeState(index) {
      this.todos[index].state == "作業中"
        ? (this.todos[index].state = "完了")
        : (this.todos[index].state = "作業中");
    },
  },
  computed: {
    //ラジオボタン（すべて、作業中、完了）選択時の動作
    filterTodos() {
      if (this.state == "all") {
        return this.todos;
      } else if (this.state == "active") {
        return this.todos.filter((todo) => todo.state == "作業中");
      } else {
        return this.todos.filter((todo) => todo.state == "完了");
      }
    },
  },
};
</script>

<style>
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}

.button {
  margin: 10px;
}

ul {
  list-style-type: none;
}

table td {
  padding: 0;
  margin: 0;
}
</style>
