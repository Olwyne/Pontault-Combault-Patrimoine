<template>
    <div>
        <div class="marginFooter">
            <div class="baladeMap">
                <l-map id="vuemap" :zoom="zoom" :center="center">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-polyline :lat-lngs="polyline.latlngs"
                                :color="polyline.color" />
                    <marker-popup :position="formated(center)"
                                  :text="'Vous êtes ici'"
                                  :icontest="'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fuser-location-darkblue.svg?alt=media&token=227a942e-1183-4252-99fe-9ea4cdebfa8e'" />
                    <marker-popup v-for="(marker,i) in markerList" :key="i"
                                  :position="formated(marker.coord)"
                                  :text="marker.text"
                                  :icontest="marker.category" />
                    <l-control>
                        <button @click="increaseCenter" class="localisationButton"><img src="../img/target-me.svg" /></button>
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
                <a src="" @click="setActivePage('Lieu', lieuBalade); setActiveLocation(lieuBalade)" v-for="lieuBalade in walk.locations" v-bind:key="lieuBalade">- {{ lieuBalade }}</a>
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

        formated(coords) {
            return latLng(coords)
        },
        increaseCenter() {
            this.center = [this.center[0] + 0.0001, this.center[1] + 0.0001]
            //console.log(this.center)
        },
        trackPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                })
            }
            else {
                alert(`Browser doesn't support Geolocation`)
            }
        },
        successPosition: function (position) {
            this.center = [position.coords.latitude, position.coords.longitude]
            //console.log(this.center)
        },
        failurePosition: function (err) {
            alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
        },
        addMarkerLocation() {
            let self = this
            var query = db.ref('app/locations/').orderByKey();
            query.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var name = (childSnapshot.val());
                        let catIcon;
                        if (name.category == "Histoire"){
                          catIcon = "https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-histoire.svg?alt=media&token=ef37c804-6ddb-4505-a3c3-c62aad80e139"
                        }
                        if (name.category == "Culte"){
                          catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-culte.svg?alt=media&token=6f1b79fd-d690-489f-abd8-4e4b964a9155'
                        }
                        if (name.category == "Nature"){
                          catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-nature.svg?alt=media&token=92822626-4c3b-47c8-9b3c-e1a4a9b96dcf'
                        }
                        if (name.category == "Culture"){
                          catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-culture.svg?alt=media&token=6fdea4b4-2d43-4027-ae24-7ad838a171e3'
                        }
                        if (name.category == "Parc"){
                          catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-parc.svg?alt=media&token=d6632431-5d31-4584-9071-b129b9f710b4'
                        }
                        let textContent = "<div class='popupTitle'>" + name.name + "</div>" + "<div class='text-center'><img class='popupImage'  src='" + name.photos + "' alt='err'></div>"
                        if (name.gps) {
                            for (var i = 0; i < self.walk.locations.length; i++) {
                                if (name.name == self.walk.locations[i]) {
                                    self.markerList.push({ coord: name.gps, text: textContent, category: catIcon })
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
                    if (name.name == self.walk.name) {
                        self.polyline.latlngs.push(name.gps)
                        if (name.category == "Histoire") {
                            self.polyline.color = "#ff66ff"
                        }
                        else if (name.category == "Culte") {
                            self.polyline.color = "#0099ff"
                        }
                        else if (name.category == "Nature") {
                            self.polyline.color = "#00ff99"
                        }
                        else if (name.category == "Culture") {
                            self.polyline.color = "#9900cc"
                        }
                        else if (name.category == "Parc") {
                            self.polyline.color = "#cc3300"
                        }
                        else {
                            self.polyline.color = "#000000"
                        }
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
    }

    .baladeDistance, .baladeDuration, .baladeDetails {
        width: 33.3%;
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
</style>

