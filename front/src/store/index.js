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
    getTasks(state, data) {
      state.tasks = data;
    },
    getOneTask(state, data) {
      state.currentTask = data;
    }
  },
  actions: {
    async getTasks({commit}) {
      const response = await axios.get(`${process.env.VUE_APP_URL}/api/tasks`);
      commit("getTasks", response.data.tasks);
    },

    async getOneTask({commit}, data) {
      const response = await axios.get(`${process.env.VUE_APP_URL}/api/tasks${data}`);
      commit("getOneTask", response.data.task);
    },

    async saveTask({commit}, data) {
      await axios.post(`${process.env.VUE_APP_URL}/api/tasks`, data);
    },

    async deleteTask({commit}, data) {
      await axios.delete(`${process.env.VUE_APP_URL}/api/tasks/${data}`);
    },

    async updateTask({commit}, data) {
      const response = await axios.put(`${process.env.VUE_APP_URL}/api/tasks`, data);
      commit("getOneTask", response.data.task);
    }

  }
});
