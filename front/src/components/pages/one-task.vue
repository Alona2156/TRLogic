<template>
  <div class="outer-wrapper">
    <taskUi :task="task" checkboxType="checkbox-unselected" />
  </div>
</template>

<script>
import taskUi from "@/components/ui/editable-task.vue";

export default {
  computed: {
    task() {
      return this.$store.state.currentTask;
    }
  },
  components: {
    taskUi
  },
  created() {
    this.$store.dispatch("getOneTask", window.location.pathname).catch(error => {
      console.log(error);
    });
  }
};
</script>

<style lang="scss">
</style>