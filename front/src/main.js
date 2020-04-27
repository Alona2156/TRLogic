import Vue from 'vue';
import "normalize.css";
import App from './App.vue';
import store from './store';
import { router } from "./routing.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
