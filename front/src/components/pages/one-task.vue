<template>
  <div class="outer-wrapper">
    <taskUi :task="task" />
  </div>
</template>

<script>
import taskUi from "@/components/ui/task-ui.vue";

export default {
  data() {
    return {
      task: {
        title: "task 1",
        list: [
          { title: "do 1", done: false },
          { title: "do 2", done: false },
          { title: "do 3", done: true }
        ]
      }
    };
  },
  components: {
    taskUi
  }
};
</script>

<style lang="scss">
</style>