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
       {{newcoords}}
    </div>
</template>

<script>
import { db } from '../config/db'
import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet'
import MarkerPopup from "./MarkerPopup";
import { latLng } from "leaflet";


export default {
  name: "maptest",
  props:["newcoords"],
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
        latlngs: [ ],
        color: "green"
      }
    };
  },
  firebase: {
    documents: db.ref()
  },

  watch:{
  
   newcoords:function(){
      this.polyline.latlngs=this.newcoords
    }
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


