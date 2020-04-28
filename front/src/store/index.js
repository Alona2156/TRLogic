import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    currentTask: ""
  },
  mutations: {
    updateTasks(state, data) {
      state.tasks = data;
    },
    updateOneTask(state, data) {
      state.currentTask = data;
    }
  },
  actions: {
    async getTasks({commit}) {
      const response = await axios.get(`${process.env.VUE_APP_URL}/api/tasks`);
      commit("updateTasks", response.data.tasks);
    },

    async getOneTask({commit}, data) {
      const response = await axios.get(`${process.env.VUE_APP_URL}/api/tasks${data}`);
      commit("updateOneTask", response.data.task);
    },

    async saveTask({commit}, data) {
      await axios.post(`${process.env.VUE_APP_URL}/api/tasks`, data);
    },

    async deleteTask({commit}, data) {
      await axios.delete(`${process.env.VUE_APP_URL}/api/tasks/${data}`);
    }

  }
});
