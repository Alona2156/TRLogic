<template>
  <div class="alert-msg" v-if="state">
    <div class="header">
      <span class="header-text">Confirm</span>
      <span class="close" @click="closeAlert">&#10006;</span>
    </div>
    <p class="message">{{text}}</p>
    <div class="footer">
      <div class="footer-button" @click="executeCallback">yes</div>
      <div class="footer-button" @click="closeAlert">no</div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  props: ["state", "data", "text", "alertType"],
  methods: {
    closeAlert() {
      eventBus.$emit("closeAlert");
    },
    executeCallback() {
      if (this.alertType === "deleteTask") {
        eventBus.$emit("deleteTask", this.data);
      } else if (this.alertType === "deleteRecord") {
        eventBus.$emit("removeTask", this.data);
      } else if (this.alertType === "cancelEdit") {
        eventBus.$emit("cancelEdit", this.data);
      } else if (this.alertType === "deleteAllTask") {
        eventBus.$emit("deleteAllTask", this.data);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixins.scss";

.alert-msg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 70px;
  width: 400px;
  max-width: 87%;
  z-index: $z-index-alert;
  background-color: white;
  > .header {
    background-color: $pink;
    width: 100%;
    height: 30px;
    @include flex(row, space-between, center);
    > .header-text {
      color: white;
      font-weight: 800;
      margin-left: 15px;
    }
    > .close {
      color: white;
      font-size: 22px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  > .message {
    margin: 15px 0;
  }
  > .footer {
    @include flex(row, flex-end, center);
    margin: 0 auto 15px;
  }
  .footer-button {
    margin: 0 10px;
    color: white;
    font-weight: 800;
    width: 50px;
    padding: 5px 7px;
    border-radius: 4px;
    background: transparentize($green, 0.3);
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
      background: $green;
    }
    + .footer-button {
      background: transparentize(red, 0.3);
      &:hover {
        background: red;
      }
    }
  }
}
</style>
