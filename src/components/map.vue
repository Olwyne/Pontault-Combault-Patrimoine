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
        </l-map>
        <input type="file" @change="loadTextFromFile">
    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet'
import MarkerPopup from "./MarkerPopup";
import { latLng } from "leaflet";


export default {
  name: "maptest",
  data () {
    return {
      coords: [],
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
    geoTrack: function(json) {
        this.polyline.latlngs[0] = [48.83838, 2.58548]; 
        console.log("ok");
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      let self = this

      reader.onload = function(e) { 
        const datas = e.explicitOriginalTarget.result
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
  },
};
/*
var data = '{ "type": "Point", "coordinates": [ 2.58516, 48.83841 ] }';

var json = JSON.parse(data);
console.log(json.coordinates[1]);
console.log(json.coordinates[0]);

*/

/*
var json = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "../../geojson/track_points.geojson",
    'dataType': "geojson",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})();

console.log(json);
*/


var data = '{"type": "FeatureCollection","name": "track_points","crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },"features": [{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 0 }, "geometry": { "type": "Point", "coordinates": [ 2.58510353820228, 48.838398535246483 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 1 }, "geometry": { "type": "Point", "coordinates": [ 2.584611680353631, 48.84003605157573 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 2 }, "geometry": { "type": "Point", "coordinates": [ 2.584943670979381, 48.840355151089398 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 3 }, "geometry": { "type": "Point", "coordinates": [ 2.586372994421345, 48.840439124307728 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 4 }, "geometry": { "type": "Point", "coordinates": [ 2.589780210599342, 48.840598673034748 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 5 }, "geometry": { "type": "Point", "coordinates": [ 2.589868491659284, 48.840262780386581 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 6 }, "geometry": { "type": "Point", "coordinates": [ 2.589753598964327, 48.83967496283217 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 7 }, "geometry": { "type": "Point", "coordinates": [ 2.589038923369902, 48.838768030787392 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 8 }, "geometry": { "type": "Point", "coordinates": [ 2.588120225759716, 48.83776870701918 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 9 }, "geometry": { "type": "Point", "coordinates": [ 2.585619007841293, 48.838054230130183 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 10 }, "geometry": { "type": "Point", "coordinates": [ 2.585466631488918, 48.838390137588874 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 11 }, "geometry": { "type": "Point", "coordinates": [ 2.58548, 48.83838 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 12 }, "geometry": { "type": "Point", "coordinates": [ 2.58543, 48.83836 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 13 }, "geometry": { "type": "Point", "coordinates": [ 2.58539, 48.83835 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 14 }, "geometry": { "type": "Point", "coordinates": [ 2.58529, 48.83836 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 15 }, "geometry": { "type": "Point", "coordinates": [ 2.58518, 48.83835 ] } },{ "type": "Feature", "properties": { "track_fid": 0, "track_seg_id": 0, "track_seg_point_id": 16 }, "geometry": { "type": "Point", "coordinates": [ 2.58516, 48.83841 ] } }]}'



</script>



<style>
#vuemap {
  height: 500px;
  width: 500px;
}
</style>


