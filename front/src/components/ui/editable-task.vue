<template>
  <div class="editable-task-wrapper">
    <div class="header">
      <p class="title">{{task.title}}</p>
      <span class="material-icons close" @click="showAlertDeleteAllTask">highlight_off</span>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in task.list" :key="index">
        <span class="material-icons edit" @click="openForEdit(index)">create</span>
        <input
          class="record-input"
          :value="item.title"
          :disabled="index !== itemIndexForEdit"
          @input="item = $event.target.value"
        />
        <checkboxUi
          :class="[item.done? 'checkbox-selected' : 'checkbox-unselected']"
          @click.native="markDone(index)"
        />
        <span
          class="material-icons saveEdit"
          @click="saveEdit(index, item)"
          v-if="index === itemIndexForEdit"
        >check_circle_outline</span>
        <span
          class="material-icons removeTask"
          v-if="index === itemIndexForEdit"
          @click="showRemoveAlert(index)"
        >remove_circle_outline</span>
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
      <div class="cancel" v-if="itemIndexForEdit !== ''" @click="showCancelAlert">Cancel</div>
      <div class="add-task" @click="showTaskInput">&#x2b;</div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";

import checkboxUi from "@/components/ui/checkbox-ui.vue";
import textareaUi from "@/components/ui/textarea-ui.vue";

export default {
  props: ["task"],
  data() {
    return {
      taskInput: false,
      reset: false,
      newTaskText: "",
      itemIndexForEdit: ""
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
    closeEditInput() {
      this.itemIndexForEdit = "";
      eventBus.$emit("closeAlert");
    },
    updateTextAreaInput(text) {
      this.newTaskText = text;
    },
    openForEdit(index) {
      this.itemIndexForEdit = index;
    },
    showRemoveAlert(index) {
      eventBus.$emit("toggleAlert", {
        data: index,
        text: "Do you really want to delete record?",
        type: "deleteRecord"
      });
    },
    removeTask(index) {
      const taskList = this.task.list.filter(
        (item, itemIndex) => itemIndex !== index
      );
      this.save(taskList, this.closeEditInput);
    },
    saveEdit(index, item) {
      const taskList = this.task.list.slice();
      taskList[index].title = item;
      this.save(taskList, this.closeEditInput);
    },
    showCancelAlert() {
      eventBus.$emit("toggleAlert", {
        text: "Do you really want to discard edited data?",
        type: "cancelEdit"
      });
    },
    cancelEdit() {
      Object.assign(this.$data, this.$options.data());
      eventBus.$emit("closeAlert");
    },
    markDone(index) {
      const taskList = this.task.list.slice();
      taskList[index].done = !taskList[index].done;
      this.save(taskList, this.closeEditInput);
    },
    saveNewTask() {
      const list = this.task.list.slice();
      list.push({ title: this.newTaskText, done: false });
      this.save(list, this.closeTaskInput);
    },
    save(list, cb) {
      this.$store
        .dispatch("updateTask", {
          url: this.task.url,
          list
        })
        .then(() => {
          cb && cb();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAlertDeleteAllTask() {
      eventBus.$emit("toggleAlert", {
        data: this.task.url,
        text: "Do you really want to delete this task?",
        type: "deleteAllTask"
      });
    },
    deleteAllTask(url) {
      this.$store
        .dispatch("deleteTask", url)
        .then(() => {
          eventBus.$emit("closeAlert");
          this.$store
            .dispatch("getTasks")
            .then(() => {
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() {
    eventBus.$on("removeTask", (index) => {
      this.removeTask(index);
    });
    eventBus.$on("cancelEdit", (index) => {
      this.cancelEdit(index);
    });
    eventBus.$on("deleteAllTask", (url) => {
      this.deleteAllTask(url);
    });
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

@mixin editButtonStyle($fz, $c, $l) {
  position: absolute;
  font-size: $fz;
  cursor: pointer;
  color: $c;
  left: $l;
}

.editable-task-wrapper {
  width: 450px;
  max-width: 90%;
  overflow: auto;
  border-radius: 8px;
  box-shadow: $card-shadow;
  padding: 20px 45px 20px 30px;
  min-height: 160px;
  margin: 50px auto 10px;
  > .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .list-item {
    text-align: left;
    @include flex(row, space-between, center);
    position: relative;
    margin-bottom: 8px;
    > * {
      flex: 0 0 auto;
    }
    p {
      margin: 0;
    }
    > .record-input {
      outline: none;
      border: none;
      -webkit-appearance: none;
      border-bottom: 1px solid grey;
      flex: 1 0 auto;
      max-width: 80%;
      background-color: transparent;
      color: black;
      &:disabled {
        border-bottom: 1px solid transparent;
      }
    }
    > .edit {
      @include editButtonStyle(18px, $pink, -21px);
    }
    > .saveEdit {
      @include editButtonStyle(28px, $green, calc(100% - 68px));
    }
    > .removeTask {
      @include editButtonStyle(28px, red, calc(100% + 10px));
    }
  }
}

.editable-task-wrapper .new-task {
  margin: 10px auto 0;
  max-width: 85%;
  position: relative;
  .remove,
  .save {
    font-size: 31px;
    cursor: pointer;
    position: absolute;
    top: calc(50% - 15px);
  }
  .remove {
    left: -38px;
    color: red;
  }
  .save {
    left: 100%;
    color: $green;
  }
}

.editable-task-wrapper .header {
  @include flex(row, space-between, center);
  position: relative;
  margin-bottom: 10px;
  > title {
    text-align: left;
    margin: 0 0 15px;
    font-weight: 600;
  }
  > .close {
    position: absolute;
    font-size: 30px;
    left: 100%;
    top: -4px;
    color: red;
    cursor: pointer;
  }
}

.editable-task-wrapper .footer {
  margin-top: 15px;
  @include flex(row, space-between, center);
  .add-task {
    @extend %add-task-button;
    margin-left: auto;
  }
  .cancel {
    border: 2px solid red;
    color: red;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
  }
}

@media screen and (max-width: 480px) {
  .editable-task-wrapper .list-item > .record-input {
    max-width: 70%;
  }
}
</style>