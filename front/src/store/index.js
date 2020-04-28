import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async saveTask({commit}, data) {
      await axios.post(`${process.env.VUE_APP_URL}/api/tasks`, data);
    }
  }
});
