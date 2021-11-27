<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
require("./assets/css/app.css");

export default {
  name: 'App'
}
</script>

<style >
html,body,#app{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow: auto;
}
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
