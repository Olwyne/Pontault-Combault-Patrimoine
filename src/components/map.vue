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
            <l-marker v-for="(marker,i) in markerList" :key="i" :lat-lng="marker"></l-marker>

        </l-map>
        <input type="file" @change="loadTextFromFile">
    </div>
</template>

<script>
import { db } from '../config/db'
import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet'
import MarkerPopup from "./MarkerPopup";
import { latLng } from "leaflet";


export default {
  name: "maptest",
  data () {
    return {
      markerList: [],
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
  firebase: {
    documents: db.ref()
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
    addMarkerLocation(){
      let self=this
      var query =  db.ref('app/locations/').orderByKey();
      query.once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              var name = (childSnapshot.val());
              self.markerList.push(name.gps2)
          });
      });
  
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      let self = this

      reader.onload = function(e) { 
        console.log(e)
        const datas = e.target.result
        let json = JSON.parse(datas);
        self.polyline.latlngs = [];
        for (let i = 0; i < json.features.length; i++) {
            self.polyline.latlngs.push(
               [json.features[i].geometry.coordinates[1],json.features[i].geometry.coordinates[0]]
            )
        }
        self.polyline.latlngs.push(
            [json.features[0].geometry.coordinates[1],json.features[0].geometry.coordinates[0]]

        )
        console.log(self.polyline.latlngs)
    };
      reader.readAsText(file);
    }
  },
    mounted() {
    this.trackPosition()
    this.addMarkerLocation()
  },
};

</script>



<style>
#vuemap {
  height: 500px;
  width: 500px;
}
</style>


