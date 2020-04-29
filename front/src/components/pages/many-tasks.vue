<template>
  <div class="outer-wrapper">
    <taskUi
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      checkboxType="checkbox-disabled"
    >
      <template v-slot:delete-and-edit-buttons>
        <div class="buttons-wrapper">
          <div @click="showDeleteAlert(task.url)">delete</div>
          <div @click="editTask(task.url)">edit</div>
        </div>
      </template>
    </taskUi>
    <addTaskButton @click.native="openNewTask" />
    <newTaskModal :state="newTaskModal" @modalClosed="closeNewTask" />
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
import taskUi from "@/components/ui/task-ui.vue";
import addTaskButton from "@/components/ui/add-task-button.vue";
import newTaskModal from "@/components/ui/new-task-modal.vue";

export default {
  data() {
    return {
      newTaskModal: false
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    taskUi,
    addTaskButton,
    newTaskModal
  },
  methods: {
    editTask(url) {
      this.$router.push(url);
    },
    showDeleteAlert(url) {
      eventBus.$emit("toggleAlert", {
        data: url,
        text: "Do you really want to delete task?",
        type: "deleteTask"
      });
    },
    deleteTask(url) {
      this.$store
        .dispatch("deleteTask", url)
        .then(() => {
          eventBus.$emit("closeAlert");
          this.$store.dispatch("getTasks").catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openNewTask() {
      this.newTaskModal = true;
    },
    closeNewTask() {
      this.newTaskModal = false;
    }
  },
  created() {
    this.$store.dispatch("getTasks").catch((error) => {
      console.log(error);
    });
    eventBus.$on("deleteTask", (url) => {
      this.deleteTask(url);
    });
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.buttons-wrapper {
  @include flex(row, space-between, center);
  margin: 0 -8px 15px;
  > * {
    background-color: white;
    color: $green;
    border: 2px solid $green;
    font-weight: 800;
    border-radius: 50px;
    padding: 2px 10px;
    cursor: pointer;
    font-size: 14px;
    letter-spacing: 0.7px;
    flex: 0 0 auto;
  }
}

.shade {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.shade.show {
  display: block;
  z-index: $z-index-shade;
}

.shade.hide {
  display: none;
}
</style>