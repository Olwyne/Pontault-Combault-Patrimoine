<template>
    <div>
        <div class="categoriesBar">
            <ul class="nav nav-fill">
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatCulture" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />

                    </svg>
                    </div>
                    <div>Culture</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatHistoire" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />

                    </svg>
                    </div>
                    <div>Histoire</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatCulte" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div>Culte</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatNature" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div>Nature</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatParc" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div>Parc</div>
                </li>
            </ul>
        </div>
        <div class="visiteMap">
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
                <button @click="increaseCenter">Localisez-moi</button>
              </l-control>
            </l-map>
        </div>
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


<style>
    .categoriesBar {
        color: var(--darkbluePC);
    }

    .icon-cat {
        height: 2.3em;
    }

    .colorCatCulture {
        fill: var(--catCulture);
    }

    .colorCatHistoire {
        fill: var(--catHistoire);
    }

    .colorCatCulte {
        fill: var(--catCulte);
    }

    .colorCatNature {
        fill: var(--catNature);
    }

    .colorCatParc {
        fill: var(--catParc);
    }

    /*.visiteMap {
        height: 30.5em;
    }*/

        .visiteMap img {
            width: 100%;
            height: 100%;
        }
</style>