<template>
  <div class="modal" :class="transitionClass">
    <div class="modal-header">
      <span @click="closeModal">&#10006;</span>
    </div>
    <div class="modal-body">
      <section class="editor"></section>
      <section class="confirm">
        <div class="save-button" @click="saveTask">save</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["state"],
  data() {
    return {
      transitionClass: "",
      modalIsOpen: false
    };
  },
  methods: {
    openModal() {
      this.modalIsOpen = true;
      this.transitionClass = "modal-show";
    },
    closeModal() {
      this.modalIsOpen = false;
      this.transitionClass = "";
      this.$emit("modalClosed");
    },
    saveTask() {
      // send save request
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
  @include flex(row, flex-end, center);
  background-color: $pink;
  color: white;
  width: 100%;
  height: 3.5rem;
  padding: 0 1.5rem;
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
    flex: 0 0 auto;
  }
}

.confirm {
  width: 100%;
  @include flex(row, flex-end, flex-end);
  .save-button {
    background-color: #2196f3;
    @include flex(row, center, center);
    padding: 6px 10px;
    color: white;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.6px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
