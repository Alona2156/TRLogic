<template>
  <div class="task-wrapper">
    <p class="title">{{task.title}}</p>
    <ul class="list">
      <li v-for="(item, index) in task.list" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["task"]
};
</script>

<style lang="scss">
.task-wrapper {
  width: calc(100% / 5);
  border: 1px solid #000;
  padding: 20px;
  margin: 5px;
  > .title {
    text-align: left;
    margin: 0 0 15px;
  }
  > .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
      li {
        text-align: left;
      }
  }
}
</style>