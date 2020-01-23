<template>
    <div>
        <div class="marginFooter">
        <div class="baladeMap">
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
                <button @click="increaseCenter"  class="localisationButton"><img src="../img/target-me.svg" /></button>
              </l-control>
            </l-map>
        </div>
        <div class="baladeContainer">
            <div class="placeTitle">{{ walk.name }}</div>
            <div class="d-flex justify-content-center">
                <div class="baladeDistance d-flex justify-content-center">
                    <div class="align-self-end"><img src="../img/distance-blue.svg" /></div>
                    <div class="align-self-end km">{{ walk.distance }}</div>
                </div>
                <div class="baladeDuration d-flex justify-content-center">
                    <div class="align-self-end"><img src="../img/chronometer-blue.svg" /></div>
                    <div class="align-self-end duration">{{ walk.duration }}</div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <img class="placeImage" v-bind:src="walk.photos" />
        </div>
        <div class="lieuxList">
            <!-- mettre le lien du lieu dans le src suivant -->
            <div>Sur le parcours :</div>
            <a src="" @click="setActivePage('Lieu', lieuBalade); setActiveLocation(lieuBalade)" v-for="lieuBalade in walk.locations" :key="lieuxBalade" >- {{ lieuBalade }}</a>
        </div>
        <div class="placeBody">
            <div class="placeText" v-html="walk.description" ></div>
        </div>
        </div>
        <BaladeFooter />
    </div>
</template>


<script>
  import { db } from '../config/db'
  import {LMap, LTileLayer, LMarker, LPolyline, LControl} from 'vue2-leaflet'
  import MarkerPopup from "./MarkerPopup";
  import { latLng } from "leaflet";
  import BaladeFooter from '../components/BaladeFooter'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Balade',
 
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
        },
        walk:{
          name: null,
          description: null,
          distance: null,
          duration: null,
          photos: null,
          locations: []
        },
        lieuxBalade: []
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
      MarkerPopup,
      BaladeFooter
    },
    methods: {
         ... mapActions([
                'setActiveLocation',
                'setActivePage'
          ]),
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
                for (var i = 0; i < self.walk.locations.length; i++) {
                    if (name.name == self.walk.locations[i]){
                        self.markerList.push({coord: name.gps, text: textContent, category: catIcon})
                    }
                }
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
            if (name.name == self.walk.name){
                self.polyline.latlngs.push(name.gps)
                if (name.category == "Histoire"){
                  self.polyline.color = "#ff66ff"
                }
                else if (name.category == "Culte"){
                  self.polyline.color = "#0099ff"
                }
                else if (name.category == "Nature"){
                  self.polyline.color = "#00ff99"
                }
                else if (name.category == "Culture"){
                  self.polyline.color = "#9900cc"
                }
                else if (name.category == "Parc"){
                  self.polyline.color = "#cc3300"
                }  
                else {
                    self.polyline.color = "#000000"
                }  
            }
          });
        });
      }
    },
    mounted() {
      this.trackPosition()
      this.addMarkerLocation()
      this.addWalk()
      this.walk=this.getActiveWalk
    },
    computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveWalk'
            ]),
    },
  };

</script>



<style>
    .baladeMap{
    width: 100%;    
    }

    .baladeContainer {
        margin: 1em;
    }

    .baladeDistance, .baladeDuration, .baladeDetails {
        width: 33.3%;
        text-align: center;
        color: var(--darkbluePC);
    }
    
    .lieuxList{
        margin:2em;
        color: var(--darkbluePC);
    }

    .lieuxList a{
        color: var(--bluePC);
        display: block;
    }

    .marginFooter{
        margin-bottom: 7em;
    }

</style>

