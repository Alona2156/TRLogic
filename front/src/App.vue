<template>
  <div id="app">
    <router-view :key="$route.path" />
    <alert :state="showAlert" @closeAlert="hideDeleteAlert" />
    <div class="shade" :class="shadeClass"></div>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
import alert from "@/components/ui/alert.vue";

export default {
  name: "App",
  data() {
    return {
      showAlert: false,
      shadeClass: "hide"
    };
  },
  components: {
    alert
  },
  created() {
    eventBus.$on("toggleAlert", data => {
      this.showAlert = data;
      this.shadeClass = data ? "show" : "hide";
    });
  },
  methods: {
    hideDeleteAlert() {
      this.showAlert = false;
      this.shadeClass = "hide";
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  z-index: $z-index-else;
}

.outer-wrapper {
  padding: 20px;
  margin: -5px;
  width: 100%;
  height: 100%;
  @include flex(row, flex-start, flex-start);
}
</style>
