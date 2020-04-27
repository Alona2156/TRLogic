<template>
  <div
    class="select-item-checkbox"
  ></div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

$size: 14px;

.select-item-checkbox {
  cursor: pointer;
  border-radius: 4px;
  margin: 5px;
  width: $size;
  height: $size;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.checkbox-selected {
  border: $size/2 solid $green;
}

.checkbox-unselected {
  border: 2px solid $green;
}

.checkbox-disabled {
  cursor: not-allowed;
  border: 2px solid $grey;
}
</style>
