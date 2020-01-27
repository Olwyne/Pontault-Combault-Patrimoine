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
        :text="'Vous êtes ici'"
        :icontest="'https://cdn0.iconfinder.com/data/icons/map-locations-glyph-1/100/pin-location-map-place-spot-position-512.png'"
      />
      <marker-popup
        v-for="(marker,i) in markerList" :key="i"
        :position="formated(marker.coord)"
        :text="marker.text"
        :icontest="marker.category"
      />
      <l-control> 
      </l-control>
    </l-map>
  </div>
</template>

<script>
  import { db } from '../config/db'
  import {LMap, LTileLayer, LMarker, LPolyline, LControl} from 'vue2-leaflet'
  import MarkerPopup from "./MarkerPopup";
  import { latLng } from "leaflet";


  export default {
    name: "maptest",
    props:["newcoords"],

    data () {
      return {
        markerList: [],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        //url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        zoom: 13,
        center: [48.801255, 2.607598],
        bounds: null, 
        attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        polyline: {
          latlngs: [],
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
        //console.log("hola"+this.polyline.latlngs)
      }
    }, 
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPolyline,
      LControl,
      MarkerPopup
    },
    methods: {
      formated(coords) {
        return latLng(coords)
      },
      increaseCenter() {
        this.center = [this.center[0] + 0.0001, this.center[1] + 0.0001]
        //console.log(this.center)
      },  
      trackPosition() {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 0,
              })
        } 
        else {
          alert(`Browser doesn't support Geolocation`)
        }
      },
      successPosition: function(position) {
        this.center = [position.coords.latitude, position.coords.longitude]
        //console.log(this.center)
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
            let catIcon;
            if (name.category == "Histoire"){
              catIcon = 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png'
            }
            if (name.category == "Culte"){
              catIcon = 'http://simpleicon.com/wp-content/uploads/map-marker-2.png'
            }
            if (name.category == "Nature"){
              catIcon = 'http://simpleicon.com/wp-content/uploads/map-marker-2.png'
            }
            if (name.category == "Culture"){
              catIcon = 'http://simpleicon.com/wp-content/uploads/map-marker-2.png'
            }
            if (name.category == "Parc"){
              catIcon = 'http://simpleicon.com/wp-content/uploads/map-marker-2.png'
            }
            let textContent = "<b>"+name.name+"</b>"+"<div><img style = 'height: 40px;' src='"+name.photos+"' alt='err'></div>"
            if(name.gps) {
            console.log(name.gps)
            self.markerList.push({coord: name.gps, text: textContent, category: catIcon})
            }
          });
        });
      },
      addWalk(){
        let self=this
        var query =  db.ref('app/walks/').orderByKey();
        query.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var name = (childSnapshot.val());
            let catIcon;
            console.log(name.gps)
            self.polyline.latlngs.push(name.gps)
            if (name.category == "Histoire"){
              self.polyline.color = "#ff66ff"
            }
            if (name.category == "Culte"){
              self.polyline.color = "#0099ff"
            }
            if (name.category == "Nature"){
              self.polyline.color = "#00ff99"
            }
            if (name.category == "Culture"){
              self.polyline.color = "#9900cc"
            }
            if (name.category == "Parc"){
              self.polyline.color = "#cc3300"
            }    
          });
        });
      }
    },
    mounted() {
      this.trackPosition()
      this.addMarkerLocation()
      this.addWalk()
    }
  };

</script>