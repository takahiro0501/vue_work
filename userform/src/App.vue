<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.main {
  width: 600px;
  margin: 50px auto;
}

.about {
  background-color: #d7f4f3;
  border-top: 1px solid #1fd2b4;
  border-bottom: 1px solid #1fd2b4;
}

.contents {
  border-left: 1px solid #1fd2b4;
  border-right: 1px solid #1fd2b4;
  border-bottom: 1px solid #1fd2b4;

}

.question {
  text-align: left;
  margin: 20px 20px;
}

</style>
