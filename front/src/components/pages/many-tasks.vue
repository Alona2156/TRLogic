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
    <addTaskButton @click.native="openNewTask"/>
    <newTaskModal :state="newTaskModal" @modalClosed="closeNewTask"/>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
import taskUi from "@/components/ui/task-ui.vue";
import addTaskButton from '@/components/ui/add-task-button.vue';
import newTaskModal from "@/components/ui/new-task-modal.vue";

export default {
  data() {
    return {
      newTaskModal: false,
      tasks: [
        {
          title: "task 1",
          url: "task-1",
          list: [
            { title: "do 1", done: false },
            { title: "do 2", done: false }
          ]
        },
        {
          title: "task 2",
          url: "task-2",
          list: [
            { title: "do 1", done: false },
            { title: "do 2", done: false }
          ]
        },
        {
          title: "task 3",
          url: "task-3",
          list: [
            { title: "do one", done: false },
            { title: "do two", done: true }
          ]
        }
      ]
    };
  },
  components: {
    taskUi,
    addTaskButton,
    newTaskModal
  },
  methods: {
    editTask(url) {
      this.$router.push(url)
    },
    showDeleteAlert(url) {
      eventBus.$emit("toggleAlert", url);
    },
    openNewTask() {
      this.newTaskModal = true;
    },
    closeNewTask() {
      this.newTaskModal = false;
    }
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