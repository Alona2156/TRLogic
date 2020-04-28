<template>
  <div class="task-wrapper">
    <p class="title">{{task.title}}</p>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in task.list" :key="index">
        <p>{{item}}</p>
        <checkboxUi :class="checkboxType" />
      </li>
    </ul>
    <textareaUi
      v-if="taskInput"
      text="New task"
      class="new-task"
      :reset="reset"
      @updateTextAreaInput="updateTextAreaInput($event)"
    >
      <template v-slot:removeTask>
        <span class="material-icons remove" @click="closeTaskInput">remove_circle_outline</span>
      </template>
      <template v-slot:saveChange>
        <span class="material-icons save" @click="saveNewTask">check_circle_outline</span>
      </template>
    </textareaUi>
    <div class="footer">
      <div class="add-task" @click="showTaskInput">&#x2b;</div>
    </div>
  </div>
</template>

<script>
import checkboxUi from "@/components/ui/checkbox-ui.vue";
import textareaUi from "@/components/ui/textarea-ui.vue";

export default {
  props: ["task", "checkboxType"],
  data() {
    return {
      taskInput: false,
      reset: false,
      newTaskText: ""
    };
  },
  components: {
    checkboxUi,
    textareaUi
  },
  methods: {
    showTaskInput() {
      this.taskInput = true;
    },
    closeTaskInput() {
      this.taskInput = false;
      this.reset = !this.reset;
    },
    updateTextAreaInput(text) {
      this.newTaskText = text;
    },
    saveNewTask() {
      const list = this.task.list.slice();
      list.push(this.newTaskText);
      this.$store.dispatch("updateTask", {
        url: this.task.url,
        list
      })
      .then(() => {
        this.closeTaskInput();
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.task-wrapper {
  width: 350px;
  border-radius: 8px;
  box-shadow: $card-shadow;
  padding: 20px 30px;
  margin: 5px;
  min-height: 160px;
  > .title {
    text-align: left;
    margin: 0 0 15px;
    font-weight: 600;
  }
  > .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .list-item {
    text-align: left;
    @include flex(row, space-between, center);
    > * {
      flex: 0 0 auto;
    }
    p {
      margin: 0;
    }
  }
}

.task-wrapper .new-task {
  margin: 10px auto 0;
  max-width: 85%;
  position: relative;
  .remove,
  .save {
    font-size: 31px;
    cursor: pointer;
  }
  .remove {
    position: absolute;
    left: -38px;
    top: calc(50% - 15px);
    color: red;
  }
  .save {
    position: absolute;
    left: 100%;
    top: calc(50% - 15px);
    color: $green;
  }
}

.task-wrapper .footer {
  margin-top: 15px;
  .add-task {
    @extend %add-task-button;
    margin-left: auto;
  }
}
</style>