<template>
  <div class="outer-wrapper">
    <taskUi v-for="(task, index) in tasks" :key="index" :task="task"/>
  </div>
</template>

<script>
import taskUi from "@/components/ui/task-ui.vue";

export default {
  data() {
    return {
      tasks: [
        {
          title: "task 1",
          list: [
            { title: "do 1", done: false },
            { title: "do 2", done: false },
            { title: "do 3", done: true }
          ]
        },
        {
          title: "task 2",
          list: [
            { title: "do 1", done: false },
            { title: "do 2", done: false },
            { title: "do 3", done: false }
          ]
        },
        {
          title: "task 3",
          list: [
            { title: "do one", done: false },
            { title: "do two", done: true },
            { title: "do three", done: true }
          ]
        }
      ]
    };
  },
  components: {
    taskUi
  }
};
</script>

<style>
</style>