import Vue from "vue";
import VueRouter from "vue-router";
import manyTasks from "@/components/pages/many-tasks.vue";
import oneTask from "@/components/pages/one-task.vue";
import notFound from "@/components/pages/not-found.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: manyTasks },
  { path: "/not-found", component: notFound },
  { path: "/:task", component: oneTask },
  { path: "*", component: notFound }
];

export const router = new VueRouter({
  mode: "history",
  routes
});
