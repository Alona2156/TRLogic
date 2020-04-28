import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    updateTasks(state, data) {
      state.tasks = data;
    }
  },
  actions: {
    async getTasks({commit}) {
      const response = await axios.get(`${process.env.VUE_APP_URL}/api/tasks`);
      commit("updateTasks", response.data.tasks);
    },

    async saveTask({commit}, data) {
      await axios.post(`${process.env.VUE_APP_URL}/api/tasks`, data);
    }
  }
});
