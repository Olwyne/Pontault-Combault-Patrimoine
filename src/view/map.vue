/* eslint-disabled */

<template>

  <l-map id="map" :zoom="zoom" :center="center" @click="addMarker">
    <l-marker v-for="(marker,i) in markerList" :key="i" :lat-lng="marker"></l-marker>
    <l-control> <button @click="getUserLocation">Localisez-moi</button> </l-control>

    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LControl } from "vue2-leaflet";

export default {
  name: "myMap",
  firebase() {
    return {
      markerList: this.$db.ref("/markerList/")
    };
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [47.472092, -0.550589],
      markerList: []
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl
  },
  methods: {
    addMarker(position) {
      this.$firebaseRefs.markerList.push([
        position.latlng.lat,
        position.latlng.lng
      ]);
      console.log(this.markerList)
    },
    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.center = [position.coords.latitude, position.coords.longitude];
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
 