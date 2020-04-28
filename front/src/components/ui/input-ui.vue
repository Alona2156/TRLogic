<template>
  <div class="input-wrapper">
    <label class="input-label">
      <div class="label-text">{{ text }}</div>
      <input type="text" v-model="inputText" @input="updateInputText(inputText)"/>
    </label>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      inputText: ""
    }
  },
  methods: {
    updateInputText(inputText) {
      this.$emit("updateInputText", inputText);
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.input-wrapper {
  width: 300px;
  height: 50px;
  @include flex(row, flex-start, flex-end);
  &:hover {
    .input-label .label-text {
      color: rgba(0,0,0,.75);
    }
    .input-label input {
      border-bottom: 2px solid rgba(0,0,0,.3);
    }
  }
}

.input-label {
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
  > input {
    height: 32px;
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
</style>