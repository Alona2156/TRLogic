<template>
  <div class="add-task-button">
    <span>+</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss'>
@import "@/style/mixins.scss";

.add-task-button {
  $size: 50px;
  $dist: calc(0% + 40px);
  @include flex(row, center, center);
  cursor: pointer;
  position: fixed;
  bottom: $dist;
  right: $dist;
  background-color: $pink;
  z-index: $z-index-over-else;
  box-shadow: $button-shadow;
  height: $size;
  width: $size;
  border-radius: $size;
  > span {
    font-size: 34px;
    color: white;
  }
}
</style>
