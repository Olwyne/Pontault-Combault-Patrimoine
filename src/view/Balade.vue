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
                <button @click="increaseCenter">Localisez-moi</button>
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
        <div class="thumbnailSize ">
            <img class="baladeThumbnail" v-bind:src="walk.photos" />
        </div>
        <div class="lieuxList">
            <!-- mettre le lien du lieu dans le src suivant -->
            <div>Sur le parcours :</div>
            <a src="" @click="updatePage('Lieu', lieuBalade)" v-for="lieuBalade in walk.locations">- {{ lieuBalade }}</a>
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


  export default {
    name: 'Balade',
    components: {
        BaladeFooter,
    },
    props:["walk"],

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
        updatePage: function (location,lieu) {
            const datas={
                location: location,
                lieu:lieu
            }
        },
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
            
                });
            });
        },
    }
  }

</script>



<style>
    .baladeMap{
    width: 100%;    
    height: 57vh;
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
    .thumbnailSize {
        width: 9em;
        height: 7em;
        padding: center;
    }

    .baladeThumbnail {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

</style>

