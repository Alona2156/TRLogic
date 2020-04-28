<template>
  <div class="textarea-wrapper">
    <slot name="removeTask" />
    <label class="textarea-label">
      <div class="label-text">{{ text }}</div>
      <textarea type="text" rows="3" v-model="textAreaInput" @input="updateTextAreaInput"/>
    </label>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      textAreaInput: ""
    }
  },
  methods: {
    updateTextAreaInput() {
      this.$emit("updateTextAreaInput", this.textAreaInput);
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.textarea-wrapper {
  width: 600px;
  @include flex(row, flex-start, flex-end);
  margin-bottom: 20px;
  position: relative;
  &:hover {
    .textarea-label .label-text {
      color: rgba(0, 0, 0, 0.75);
    }
    .textarea-label textarea {
      border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    }
  }
}

.textarea-label {
  @include flex(column, flex-end, flext-start);
  margin: 0;
  padding: 0;
  width: 100%;
  > .label-text {
    text-align: left;
    color: rgba(0, 0, 0, 0.54);
    cursor: default;
    font-size: 14px;
    line-height: normal;
    margin-bottom: 0;
    transform-origin: left;
    transition: color 0.1s ease, transform 0.2s ease;
    font-weight: 600;
    letter-spacing: 0.6px;
  }
  > textarea {
    resize: none;
    background: none;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
    border-radius: 0;
    color: rgba(0, 0, 0, 0.87);
    cursor: auto;
    display: block;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    outline: none;
    padding: 0;
    transition: border 0.1s ease;
    width: 100%;
  }
}

.textarea-wrapper {
  > .remove-task {
    @extend %button-style;
    background-color: red;
    font-size: 19px;
    width: 30px;
    height: 30px;
    position: absolute;
    left: -10%;
    top: calc(50% - 7px);
  }
}
</style>