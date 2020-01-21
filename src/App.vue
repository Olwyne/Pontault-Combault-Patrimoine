<template>
  <div>
       <myMap />
      <Backoffice />
  </div>    
</template>

<script>
import myMap from "./components/map.vue";
import Backoffice from "./view/backoffice";

export default {
  name: "app",
  components: {
    myMap,
    Backoffice
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