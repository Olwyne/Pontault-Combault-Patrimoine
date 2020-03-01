<template>
    <div>
        <div class="marginFooter">
            <div class="baladeMap">
                <l-map id="vuemap" :zoom="zoom" :center="center" @drag="updateDragMode(true)">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-polyline :lat-lngs="polyline.latlngs"
                                :color="polyline.color" />
                    <marker-popup :position="formated(center)"
                                  :text="'<b>Vous êtes ici</b>'"
                                  :icontest="'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmy-location-nex.png?alt=media&token=657583c5-a9e5-45af-8f70-8cd90dfac952'" />


                    <marker-popup :position="formated(starter)"
                                  :text="'<b>Début de la balade</b>'"
                                  :icontest="'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fflag.svg?alt=media&token=d5b097c8-c902-4688-a762-7ce6743509ad'" />


                    <marker-popup v-for="(marker,i) in markerList" :key="i"
                                  :position="formated(marker.coord)"
                                  :text="marker.text"
                                  :icontest="marker.category" 
                                  :location="marker.name"/>

                    <l-control>
                  <div @click="increaseCenter(); updateDragMode(false)" class="localisationButton">
                      <img src="../img/target-me.svg" />
                  </div>
              </l-control>
                </l-map>
            </div>
            <div class="baladeContainer">
                <div class="placeTitle">{{ walk.name }}</div>
                <div class="underPlaceTitle">
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex justify-content-center">
                            <div class="align-self-end"><img src="../img/distance-blue.svg" /></div>
                            <div class="align-self-end km">{{ walk.distance }}</div>
                        </div>
                        <div class="baladeDetails d-flex justify-content-center"><div class="align-self-end det">Détails</div></div>
                        <div class="baladeDuration d-flex justify-content-center">
                            <div class="align-self-end"><img src="../img/chronometer-blue.svg" /></div>
                            <div class="align-self-end duration">{{ walk.duration }}</div>
                        </div>
                    </div>
                    <div class="text-center"><img class="downArrow" src="../img/down-arrow.svg" /></div>
                </div>
            </div>
            <div class="text-center">
                <img class="placeImage" v-bind:src="walk.photos" />
            </div>
            <div class="lieuxList">
                <!-- mettre le lien du lieu dans le src suivant -->
                <div>Sur le parcours :</div>
                <a src="" @click="setActivePage('Lieu', lieuBalade); setActiveLocation(lieuBalade),setActiveTitle('Lieu')" v-for="lieuBalade in walk.locations" v-bind:key="lieuBalade">- {{ lieuBalade }}</a>
            </div>
            <div class="placeBody">
                <div class="placeText" v-html="walk.description"></div>
            </div>
        </div>
        <BaladeFooter :walk="walk" />
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
        url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
        //url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        zoom: 13,
        center: [48.801255, 2.607598],
        starter: [],
        bounds: null,
        watchId : null, 
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
        balade:null,
        lieuxBalade: []
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
      LControl,
      MarkerPopup,
      BaladeFooter
    },
    methods: {
        ... mapActions([
            'setActiveLocation',
            'setActivePage',
            'setActiveTitle'
        ]),
        formated(coords) {
            return latLng(coords)
        },
        updateDragMode(drag){
            if (drag){
              navigator.geolocation.clearWatch(this.watchId);
              this.watchId = null;
            }
            else {
              this.trackPosition();
            }
        },
        increaseCenter() {
            this.center = [this.center[0] + 0.000000000001, this.center[1] + 0.000000000001]
        },  
        trackPosition() {
            if (navigator.geolocation) {
              this.watchId = navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {enableHighAccuracy: true,
                  //timeout: 15000,
                  maximumAge: 0,
                  })
            } 
            else {
              alert(`Browser doesn't support Geolocation`)
            }
        },
        successPosition: function (position) {
            this.center = [position.coords.latitude, position.coords.longitude]
        },
        failurePosition: function (err) {
            //alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
            console.log(" ")
        },
        addMarkerLocation() {
            let self = this
            var query = db.ref('app/locations/').orderByKey();
            query.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var name = (childSnapshot.val());
                        let catIcon;
            let catColor;
            if (name.category == "Histoire"){
              catIcon = "https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-histoire.svg?alt=media&token=ef37c804-6ddb-4505-a3c3-c62aad80e139"
              catColor = "#741d89"
            }
            if (name.category == "Culte"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-culte.svg?alt=media&token=6f1b79fd-d690-489f-abd8-4e4b964a9155'
              catColor = "#a21414"

            }
            if (name.category == "Nature"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-nature.svg?alt=media&token=92822626-4c3b-47c8-9b3c-e1a4a9b96dcf'
              catColor = "#539312"
            }
            if (name.category == "Culture"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-culture.svg?alt=media&token=6fdea4b4-2d43-4027-ae24-7ad838a171e3'
              catColor = "#e66f13"
            }
            if (name.category == "Parc"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-parc.svg?alt=media&token=d6632431-5d31-4584-9071-b129b9f710b4'
              catColor = "#d9d217"
            }
            let textContent = "<div class='popupTitle' style='color:"+catColor+";'><b>"+name.name+"</b></div>"+"<div class='text-center'><img class='popupImage' src='"+name.photos+"' alt='err'></div>"
                        if (name.gps) {
                            for (var i = 0; i < self.walk.locations.length; i++) {
                                if (name.name == self.walk.locations[i]) {
                                    self.markerList.push({ coord: name.gps, text: textContent, category: catIcon,name:name.name })
                                }
                            }
                        }
                    });
                });
        },
        addWalk() {
            let self = this
            var query = db.ref('app/walks/').orderByKey();
            query.once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var name = (childSnapshot.val());
                    self.start = name.gps[0]
                    if (name.name == self.walk.name) {
                        self.polyline.latlngs.push(name.gps)
                        self.polyline.color = "#5b9bd5"
                    }
                });
            });
        },
    },
    mounted: function() {
      this.trackPosition()
      this.addMarkerLocation()
      this.addWalk()
      this.walk=this.getActiveWalk
      this.starter = this.walk.gps[0]
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
    .baladeMap #vuemap {
        width: 100%;
        height: 55vh;
    }

    .baladeContainer {
        padding: 0.5em;
        height: 17vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

        .baladeContainer .placeTitle {
            margin: 0;
            height: 30%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

    .underPlaceTitle {
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 1em;
        padding-left: 1em;
    }

    .baladeDistance, .baladeDuration, .baladeDetails {
        text-align: center;
        color: var(--darkbluePC);
    }

    .downArrow {
        height: 0.9em;
    }

    .det {
        line-height: 1em;
        color: var(--darkbluePC);
    }

    .lieuxList {
        margin: 2em;
        color: var(--darkbluePC);
    }

        .lieuxList a {
            color: var(--bluePC);
            display: block;
        }

    .marginFooter {
        margin-bottom: 7em;
    }

    .leaflet-popup-tip, .leaflet-popup-content-wrapper {
      background-color: #fff; 
    }

    .leaflet-interactive {
        stroke: var(--bluePC);
        stroke-width: 6;
    }

</style>

