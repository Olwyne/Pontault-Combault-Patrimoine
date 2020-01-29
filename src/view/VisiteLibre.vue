<template>
    <div>
        <div class="categoriesBar">
            <ul class="nav nav-fill">
              <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatHistoire" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
                          c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />

                    </svg>
                    </div>
                    <div class="categoriesText">Histoire</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatCulture" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />
                    </svg>
                    </div>
                    <div class="categoriesText">Culture</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatNature" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
                          c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />
                    </svg>
                    </div>
                    <div class="categoriesText">Nature</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatCulte" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div class="categoriesText">Culte</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatParc" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div class="categoriesText">Parc</div>
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
                :text="'<b>Vous êtes ici</b>'"
                :icontest="'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fuser-location-darkblue.svg?alt=media&token=227a942e-1183-4252-99fe-9ea4cdebfa8e'"
              />
              <marker-popup
                v-for="(marker,i) in markerList" :key="i"
                :position="formated(marker.coord)"
                :text="marker.text"
                :icontest="marker.category"
                :location="marker.name"
              ></marker-popup>
              <l-control>
                  <div @click="increaseCenter" class="localisationButton">
                      <img src="../img/target-me.svg" />
                  </div>
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
import {mapActions, mapGetters} from 'vuex'


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
       ... mapActions([
                'setActivePage',
                'setActiveTitle',
                'setActiveLocation'
        ]),
      formated(coords) {
        return latLng(coords)
      },
      test() {
        console.log("test")
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
            /*let textContent = "<div onclick='console.log(\""+name.name+"\")'><div class='popupTitle' style='color:"+catColor+";'><b>"+name.name+"</b></div>"+"<div class='text-center'><img class='popupImage' src='"+name.photos+"' alt='err'></div></div>"*/
            let textContent = "<div class='popupTitle' style='color:"+catColor+";'><b>"+name.name+"</b></div>"+"<div class='text-center'><img class='popupImage' src='"+name.photos+"' alt='err'></div>"
            if(name.gps) {
            //console.log(name.gps)
            self.markerList.push({coord: name.gps, text: textContent, category: catIcon, name:name.name})
            }
          });
        });
      },
      
      testFonc(){
        var elements = document.getElementsByClassName("leaflet-popup-content-wrapper");
        console.log("elements")
        console.log(elements)
        console.log(elements.click)
      },
    },
    mounted() {
      this.trackPosition()
      this.addMarkerLocation()
      //this.testFonc()
    },
    updated: function () {
      this.$nextTick(function () {
        // var test = document.querySelector('.marker').on('click', console.log('ok'));
        // console.log(test)
      })
    }
  };

</script>


<style>    
    .categoriesBar {
        color: var(--darkbluePC);
        height:11vh;
        width: 100%;
    }

    .categoriesBar ul {
        width: 100%;
    }

    .categoriesBar .nav-item {
        height:100%;
    }

    .categoriesBar .nav {
        padding-bottom: 2%;
        padding-top:2%;
        height:100%;
    }

    .categoriesBar .nav-link {
        padding:0;
        height:70%;
    }

    .icon-cat {
        height: 100%;
    }

    .categoriesText {
        height:26%;
        display: flex;
        flex-direction:column;
        font-size: 87%;
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
    
    #vuemap {
        width: 100%;
        height:75vh;
    }

    .localisationButton img {
        width: 40px;
    }

    .localisationButton {
            padding: 3px;
            background-color: white;
            box-shadow: 0 1px 5px rgba(0,0,0,0.65);
            border-radius: 4px;
            border:none;
    }

    .leaflet-bar a, leaflet-bar, .leaflet-bar a:hover {
        color:var(--darkbluePC);
    }

    /*.leaflet-popup-tip, .leaflet-popup-content-wrapper {
        background-color: var(--catCulte); 
    }*/

    .leaflet-popup-tip-container{
        margin-top: -1px;
    }

    .leaflet-popup-content-wrapper {
        color: white;
        font-family: 'Roboto', sans-serif;
        border-radius: 0;
    }

    .leaflet-popup-content{
        margin:0.7em;
        line-height: initial;
        color: #44546a;
    }

    .leaflet-container a.leaflet-popup-close-button {
        color:white;
        font-size: 1em;
        display: none;
    }
    
    .popupImage {
        max-width:100%;
        max-height: 10em;
    }

    .popupTitle {
        font-size:1em;
        text-align: center;
        
        padding-bottom: 0.7em;
    }
           
</style>