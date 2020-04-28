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
            <l-map id="vuemap" :zoom="zoom" :center="center" @drag="updateDragMode(true)">
              <l-tile-layer :url="url"></l-tile-layer>
              <l-polyline
                :lat-lngs="polyline.latlngs"
                :color="polyline.color"
              />
              <marker-popup
                :position="formated(center)"
                :text="'<b>Vous êtes ici</b>'"
                :icontest="'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fme-on-map3.svg?alt=media&token=f9c62a32-96a5-4274-b244-f65f9f9418e2'"
              />
              <marker-popup
                v-for="(marker,i) in markerList" :key="i"
                :position="formated(marker.coord)"
                :text="marker.text"
                :icontest="marker.category"
                :location="marker.name"
              ></marker-popup>

              <l-control>
                  <div @click="increaseCenter(); updateDragMode(false)" class="localisationButton">
                      <img src="../img/target-me.svg" />
                  </div>
              </l-control>

            </l-map>
        </div>
        <div class="popup"
          <span class="popuptext" id="myPopup">Popup custom...</span>
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
        //url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
        //url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        zoom: 13,
        //center: [48.801255, 2.607598],
            center: [48.7825268, 2.6015003], // a supp
        bounds: null, 
        watchId : null,
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
				'setActiveLocation',
				'setQuestionLocation'
        ]),
      formated(coords) {
        return latLng(coords)
      }, 
      updateDragMode(drag){
        if (drag){
          navigator.geolocation.clearWatch(this.watchId);
          this.watchId = null;
          this.popUpQuestion2();
        }
        else {
          this.trackPosition();
          this.popUpQuestion2();
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
      successPosition: function(position) {
		this.center = [ 48.7825269, 2.6015003]
		//this.center = [position.coords.latitude, position.coords.longitude]
		this.checkPopUp(position)
		},
		checkPopUp(position){
			let self=this
			this.markerList.forEach(function(item) {
				//calcul mathématique distance entre deux coordonnées
				let a = Math.PI / 180
				let lat1 =  item.coord[0]
				let lat2 = 48.7825269
				let lon1 = item.coord[1]
				let lon2  = 2.6015003
				lat1 = lat1 * a;
				lat2 = lat2 * a;
				lon1 = lon1 * a;
				lon2 = lon2 * a;
			
				let t1 = Math.sin(lat1) * Math.sin(lat2);
				let t2 = Math.cos(lat1) * Math.cos(lat2);
				let t3 = Math.cos(lon1 - lon2);
				let t4 = t2 * t3;
				let t5 = t1 + t4;
				let rad_dist = Math.atan(-t5/Math.sqrt(-t5 * t5 +1)) + 2 * Math.atan(1);
			

				if(((rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446 * 1000)<10){
					self.setQuestionLocation(item.name)
					self.$root.$emit('QuizNotification')
					console.log(self.getQuestionLocation)
				}
                    
            });
		},
      failurePosition: function(err) {
        //alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
        console.log(" ")
      },
      measure(lat1, lon1, lat2, lon2){ 
          var R = 6378.137;
          var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
          var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          return d * 1000;
      },
      popUpQuestion(){
        var popup = document.getElementById("myPopup");
        var locQ;
          let self=this
          var query =  db.ref('app/questions/').orderByKey();
          query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var name = (childSnapshot.val());
              locQ = name.location;
              console.log(locQ);
              var query2 =  db.ref('app/locations/').orderByKey();
              query2.once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var name2 = (childSnapshot.val());
                  //console.log(name2.name);

                  if (locQ == name2.name){
                    /*if (self.measure(self.center[0], self.center[1], name2.gps[0], name2.gps[1]) < 10){
                      console.log("ok dist");
                      self.markerListPoco.push("{coord: name.gps, text: textContent, category: catIcon, name:name.name}")
                      popup.style.display = "block";
                    }
                    else {
                      console.log("erreur distance > 10m")
                      popup.style.display = "none";
                    }*/

                  }

                });
              });
            });
          });
      },

      popUpQuestion2(){
          let self=this
          var locQ;
          var query =  db.ref('app/questions/').orderByKey();
          query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var name = (childSnapshot.val());
              locQ = name.location;
              //console.log(locQ);
              var query2 =  db.ref('app/locations/').orderByKey();
              query2.once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var name2 = (childSnapshot.val());
                  //console.log(name2.name);
                  //console.log(name.location == name2.name)
                  if (name.location == name2.name){
                    if (self.measure(self.center[0], self.center[1], name2.gps[0], name2.gps[1]) < 10){
           /*           console.log("----------------");
                      console.log("ok dist");
                      console.log(self.center);
                      console.log(name2.name);

                      console.log("----------------");*/


                      var catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmy-location-nex.png?alt=media&token=657583c5-a9e5-45af-8f70-8cd90dfac952'                      
                      let textContent = "<div class='popupTitle'></div>"
                      
                      self.markerList.push({coord: name2.gps, text: textContent, category: catIcon, name:name2.name})

                      
                      //popup.style.display = "block";
                    }
                    /*else {
                      console.log("erreur distance > 10m")
                      //popup.style.display = "none";
                    }*/

                  }

                });
              });
            });
          });
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
            let textContent = "<div class='popupTitle' style='color:"+catColor+";'><b>"+name.name+"</b></div>"+"<div class='text-center'><img class='popupImage' src='"+name.photos+"' alt='err'></div>"
            if(name.gps) {
            self.markerList.push({coord: name.gps, text: textContent, category: catIcon, name:name.name})
            }
          });
        });
      },
    },
    mounted() {
		this.trackPosition()
		this.addMarkerLocation()
		this.popUpQuestion2()
		this.$root.$emit('QuizNotification')
    },
    updated: function () {
      this.$nextTick(function () {})
	},
	computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveTitle',
                'getGameState',
                'getPreviousPage',
                'getPreviousLocation',
                'getQuestionLocation'
            ]),
    },
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

    .leaflet-popup-tip-container{
        margin-top: -1px;
    }

    .leaflet-popup-content-wrapper {
        color: white;
        font-family: 'Roboto', sans-serif;
        border-radius: 0;
        width: 15em;
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