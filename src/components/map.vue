<template>
    <div>
       <l-map id="vuemap" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-polyline
                :lat-lngs="polyline.latlngs"
                :color="polyline.color"
            />
            <marker-popup
                :position="formated(center)"
                :text="text"
                :title="title"
              />
        </l-map>
    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet'
import MarkerPopup from "./MarkerPopup";
import { latLng } from "leaflet";


export default {
  name: "maptest",
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.41322, -1.219482],
      bounds: null, 
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      text: "my marker popup text",
      title: "My marker popup title",
      polyline: {
        latlngs: [
          [48.83839853524648, 2.5851035382022802],
          [48.84003605157573, 2.5846116803536305],
          [48.8403551510894, 2.584943670979381],
          [48.84043912430773, 2.5863729944213447],
          [48.84059867303475, 2.5897802105993417],
          [48.84026278038658, 2.5898684916592845],
          [48.83967496283217, 2.5897535989643266],
          [48.83876803078739, 2.589038923369902],
          [48.83776870701918, 2.5881202257597162],
          [48.83805423013018, 2.5856190078412933],
          [48.838390137588874, 2.585466631488918],
          [48.83838, 2.58548],
          [48.83836, 2.58543],
          [48.83835, 2.58539],
          [48.83836, 2.58529],
          [48.83835, 2.58518],
          [48.83841, 2.58516],
          [48.83839853524648, 2.5851035382022802]
        ],
        color: "green"
      }
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    MarkerPopup
  },
  methods: {
    formated(coords) {
        return latLng(coords)
    },
    increaseCenter() {
        this.center = [this.center[0] + 0.0001, this.center[1] + 0.0001]
        console.log(this.center)
    },  
    trackPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        })
      } else {
        alert(`Browser doesn't support Geolocation`)
      }
    },
    successPosition: function(position) {
      this.center = [position.coords.latitude, position.coords.longitude]
      console.log(this.center)
    },
    failurePosition: function(err) {
      alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
    },
  },
    mounted() {
    this.trackPosition()
  },
};
</script>

<style>
#vuemap {
  height: 500px;
  width: 500px;
}
</style>