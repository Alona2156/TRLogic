<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.outer-wrapper {
  padding: 20px;
  margin: -5px;
  @include flex(row, flex-start, flex-start);
}
</style>
