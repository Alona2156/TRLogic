<template>
  <div class="task-wrapper">
    <slot name="delete-and-edit-buttons" />
    <p class="title">{{task.title}}</p>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in task.list" :key="index">
        <p>{{item.title}}</p>
        <checkboxUi :class="checkboxType" />
      </li>
    </ul>
  </div>
</template>

<script>
import checkboxUi from "@/components/ui/checkbox-ui.vue";

export default {
  props: ["task", "checkboxType"],
  components: {
    checkboxUi
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.task-wrapper {
  width: calc(100% / 5 - 10px);
  max-width: 300px;
  border-radius: 8px;
  box-shadow: $card-shadow;
  padding: 20px;
  margin: 5px;
  min-height: 176px;
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

@media screen and (max-width: 1050px) {
  .task-wrapper {
      width: calc(100% / 4 - 10px);
  }
}

@media screen and (max-width:850px) {
  .task-wrapper {
      width: calc(100% / 3 - 10px);
  }
}

@media screen and (max-width:660px) {
  .task-wrapper {
      width: calc(100% / 2 - 10px);
  }
}

@media screen and (max-width:480px) {
  .task-wrapper {
      width: calc(100% - 10px);
  }
}

</style>