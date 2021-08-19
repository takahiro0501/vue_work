<template>
  <div class="list">
    <table>
      <tr>
        <th>ID</th>
        <th>コメント</th>
        <th>状態</th>
        <th></th>
      </tr>
      <tr v-for="(todo, index) in todos" :key="index">
        <td>
          {{ todo.id }}
        </td>
        <td>
          {{ todo.comment }}
        </td>
        <td>
          <button @click="$emit('change', index)">{{ todo.state }}</button>
        </td>
        <td>
          <button @click="$emit('remove', index)">削除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    todos: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
