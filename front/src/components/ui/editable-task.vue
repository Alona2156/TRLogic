<template>
  <div class="editable-task-wrapper">
    <p class="title">{{task.title}}</p>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in task.list" :key="index">
        <span class="material-icons edit" @click="openForEdit(index)">create</span>
        <input
          :value="item"
          :disabled="index !== itemIndexForEdit"
          @input="item = $event.target.value"
        />
        <checkboxUi :class="checkboxType" />
        <span
          class="material-icons saveEdit"
          @click="saveEdit(index, item)"
          v-if="index === itemIndexForEdit"
        >check_circle_outline</span>
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
      <div class="cancel" v-if="itemIndexForEdit !== ''" @click="cancelEdit">Cancel</div>
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
    },
    updateTextAreaInput(text) {
      this.newTaskText = text;
    },
    openForEdit(index) {
      this.itemIndexForEdit = index;
    },
    saveEdit(index, item) {
      const taskList = this.task.list.slice();
      taskList[index] = item;
      this.save(taskList, this.closeEditInput);
    },
    cancelEdit() {
      Object.assign(this.$data, this.$options.data());
    },
    saveNewTask() {
      const list = this.task.list.slice();
      list.push(this.newTaskText);
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
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.editable-task-wrapper {
  width: 450px;
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
    position: relative;
    margin-bottom: 8px;
    > * {
      flex: 0 0 auto;
    }
    p {
      margin: 0;
    }
    > input {
      outline: none;
      border: none;
      -webkit-appearance: none;
      border-bottom: 1px solid grey;
      flex: 1 0 auto;
      max-width: 80%;
      &:disabled {
        border-bottom: 1px solid transparent;
      }
    }
    > .edit {
      position: absolute;
      left: -21px;
      font-size: 18px;
      color: $pink;
      cursor: pointer;
    }
    > .saveEdit {
      position: absolute;
      font-size: 28px;
      cursor: pointer;
      color: $green;
      left: calc(100% - 68px);
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
</style>