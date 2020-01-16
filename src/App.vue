<template>
  <div>
       <myMap />
      <backoffice />
  </div>    
</template>

<script>
import myMap from "./components/map.vue";
import backoffice from "./view/backoffice.vue";

export default {
  name: "app",
  components: {
    myMap,
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