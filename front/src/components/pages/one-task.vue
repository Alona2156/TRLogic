<template>
  <div class="outer-wrapper-one">
    <div class="home-button" @click="goHome">Go home</div>
    <taskUi :task="task" />
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
  methods: {
    goHome() {
      this.$router.push("/");
    }
  },
  created() {
    this.$store
      .dispatch("getOneTask", window.location.pathname)
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.home-button {
  margin: 20px;
  border: 2px solid $green;
  border-radius: 4px;
  padding: 4px 10px;
  font-weight: 600;
  cursor: pointer;
}

.outer-wrapper-one {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  @include flex(column, flex-start, flex-start);
}

</style>