<template>
  <backoffice />
</template>

<script>
import backoffice from "./view/backoffice.vue";

export default {
  name: "app",
  components: {
    backoffice
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>