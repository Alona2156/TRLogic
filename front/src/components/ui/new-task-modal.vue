<template>
  <div class="modal" :class="transitionClass">
    <div class="modal-header">
      <span class="title">Create new task</span>
      <span @click="closeModal">&#10006;</span>
    </div>
    <div class="modal-body">
      <section class="editor">
        <inputUi text="Title" @updateInputText="taskTitle = $event" :reset="reset" />
        <textareaUi
          v-for="task in tasks"
          :key="task.index"
          text="Task"
          @updateTextAreaInput="updateTextAreaInput($event, task.index)"
          :reset="reset"
        >
          <template v-slot:removeTask>
            <div class="remove-task" @click="removeTask(task.index)">&#x2212;</div>
          </template>
        </textareaUi>
        <div class="add-task-wrapper">
          <div class="add-task" @click="addTask">&#x2b;</div>
        </div>
      </section>
      <section class="confirm">
        <div class="save-button" @click="saveTask">save</div>
      </section>
    </div>
  </div>
</template>

<script>
import inputUi from "@/components/ui/input-ui.vue";
import textareaUi from "@/components/ui/textarea-ui.vue";

export default {
  props: ["state"],
  data() {
    return {
      transitionClass: "",
      modalIsOpen: false,
      reset: false,
      taskTitle: "",
      lastIndex: 0,
      tasks: [{ index: 0, text: "" }]
    };
  },
  components: {
    inputUi,
    textareaUi
  },
  methods: {
    openModal() {
      this.modalIsOpen = true;
      this.transitionClass = "modal-show";
    },
    closeModal() {
      this.modalIsOpen = false;
      this.transitionClass = "";
      this.resetModal();
      this.$emit("modalClosed");
    },
    resetModal() {
      let reset = this.reset;
      Object.assign(this.$data, this.$options.data());
      this.reset = !reset;
    },
    saveTask() {
      const newTask = {
        title: this.taskTitle,
        list: this.tasks.map(task => task.text)
      };
      this.$store
        .dispatch("saveTask", { task: newTask })
        .then(() => {
          this.closeModal();
          this.$store.dispatch("getTasks").catch(error => {
            console.log(error);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    addTask() {
      this.lastIndex += 1;
      this.tasks.push({ index: this.lastIndex, text: "" });
    },
    updateTextAreaInput(text, index) {
      let task = this.tasks.find(task => task.index === index);
      task.text = text;
    },
    removeTask(index) {
      this.tasks = this.tasks.filter(task => task.index !== index);
    }
  },
  watch: {
    state(val) {
      val && this.openModal();
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.modal {
  z-index: $z-index-modal-form;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  opacity: 0;
  @include flex(column, flex-start, flex-start);
  flex-wrap: nowrap;
  overflow: hidden;
  transition: transform 1s ease, opacity 0.4s ease;
}

.modal-show {
  transform: scale(1);
  opacity: 1;
  transition: transform 0.7s ease, opacity 0.3s ease 0.2s;
}

.modal-header {
  @include flex(row, space-between, center);
  background-color: $pink;
  color: white;
  width: 100%;
  height: 3.5rem;
  padding: 0 1.5rem;
  > span.title {
    font-size: 18px;
    font-weight: 600;
    cursor: default;
  }
  > span {
    cursor: pointer;
    font-size: 22px;
  }
}

.modal-body {
  background-color: white;
  width: 100%;
  flex-grow: 1;
  padding: 16px 24px;
  @include flex(column, flex-start, flex-start);
  flex-wrap: nowrap;
  overflow-y: auto;
  height: calc(100% - 56px) !important;
  max-height: unset;
  > * {
    flex: 0 0 auto;
  }
}

section.editor {
  @include flex(column, flex-start, flex-start);
  width: 90%;
  margin: auto;
  flex-grow: 1;
  > * {
    margin-bottom: 10px;
    flex: 0 0 auto;
  }
}

.modal-body .confirm {
  width: 100%;
  @include flex(row, flex-end, flex-end);
  .save-button {
    background-color: #2196f3;
    font-size: 14px;
    padding: 4px 7px;
    width: 50px;
    @extend %button-style;
  }
}

.editor .add-task-wrapper {
  width: 600px;
  margin-top: 15px;
  @include flex(row, flex-end, center);
}

.editor .add-task {
  flex: 0 0 auto;
  background-color: $green;
  @extend %button-style;
  @include flex(row, center, center);
  font-size: 20px;
}
</style>
