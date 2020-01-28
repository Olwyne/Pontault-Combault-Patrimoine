<template>
    <div class="formAddLocation">
        <div @click="setActivePageBackoffice('ListeBackoffice')" class="backIcon"><img src="../img/back-blue.svg"/> Retour </div>

        <h1>Ajout d'une balade</h1>
        <form id="AddWalkLocation" @submit="checkFormAddWalk" novalidate="true">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>

      <div class="form-group">
        <label for="locations">Lieux à ajouter</label>
        <select v-if="locations.length" multiple id="choiceLocationAddWalk" v-model="choiceLocationAddWalk" name="choiceLocationAddWalk" class="form-control">
          <option v-for="location in locations" v-bind:key="location" >
            {{location}} 
          </option>
        </select>
      </div>
         

      <div @click="checkFormAddWalk" class="form-group btn btn-primary ">Ajouter le lieu à la balade</div>

    </form>
          
    <form id="addWalk" @submit="checkForm" novalidate="true">
        <div>
            <div> Lieux ajoutés :</div>
            <ul v-for="(locationWalk,idx) in locationsWalk"  v-bind:value="locationWalk" v-bind:key="idx">
                <li v-for="location in (locationWalk)"  v-bind:value="location" v-bind:key="location"   class="lieuAjoute">
                    {{ location }}  <span class="delete" @click="removechoice(location)" ><img src="../img/garbage-blue.svg" /></span>
                </li>
            </ul>
        </div>


            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>

            <div class="form-group">
                <label for="nameWalk">Nom de la balade</label>
                <input id="nameWalk" v-model="nameWalk" type="text" name="nameWalk" class="form-control">
            </div>
            <div class="form-group">
                <label for="duration">Durée de la balade</label>
                <input id="duration" v-model="duration" type="number" name="duration" class="form-control">
            </div>
            <div class="form-group">
                <label for="distance">Distance de la balade</label>
                <input id="distance" v-model="distance" type="number" name="distance" class="form-control">
            </div>
            <div class="form-group">
                <label for="photos">Photo</label>
                <br />
                <input type="file" id="photos" name="photos" accept="image/png, image/jpeg" @change="processFile($event)">
            </div>
            <div class="form-group">
                <RichEditorText></RichEditorText>
            </div>

            <div class="form-group">
                <label>Tracé</label>
                <p>Veuillez importer un fichier d'extension .geojson</p>
                <input type="file" id="coord" name="coord" accept="json" @change="loadTextFromFile">
                <myMap :newcoords="polyline.latlngs"></myMap>
            </div>

            <div class="form-group">
                <div @click="checkForm" class="form-group btn btn-primary "> Ajouter la balade</div>
            </div>
            <div class="progress">
                <progress id="uploader" value="0" max="100">0%</progress>
            </div>
        </form>
    </div>
</template>

<script>
import { db,storageRef,storage, firebase  } from '../config/db'
import RichEditorText from './RichEditorText'
import myMap from './map'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    RichEditorText,
    myMap
  },
  data() {
    return {
      documents: [],
      errors: [],
      nameWalk: null,
      address: null,
      categoryWalk: null,
      description: null,
      duration:null,
      distance:null,
      categories: [],
      locations: [],
      photos:{},
      choiceLocationAddWalk: [],
      locationsWalk: [],
      coord: null,
      polyline: {
          latlngs: []
      }
    }
  },
  mounted:function(){
      this.readLocation(),
      this.readCategory()
  },
  methods:{
    ... mapActions([
                'setActivePageBackoffice',
        ]),
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      let self = this
      reader.onload = function(e) { 
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
      };
      reader.readAsText(file);
    },
    processFile(event) {
      let self=this
      self.photos = event.target.files[0]
    },
    removechoice(choice){
        this.locationsWalk =this.locationsWalk.filter(function(value, index, arr){
              return value!=choice
            });

    },
    readLocation(){
      let self=this
      var query =  db.ref('app/locations/').orderByKey();
      query.once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              self.locations.push(childSnapshot.key);
          });
      });

    },
    readCategory(){
        let self=this
        var query =  db.ref('app/categories/').orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                self.categories.push(childSnapshot.val());
            });
        });
    },
    checkFormAddWalk(){
        const present = this.locationsWalk.filter((item) => item == this.choiceLocationAddWalk[0])
        if(present.length===0){
          this.locationsWalk.push(this.choiceLocationAddWalk)
        } 
        
    },
   
    checkForm(e){
        const self = this
     
       let uploadTask = storageRef.child('app/locations/images/'+this.photos.name).put(this.photos);
    
        uploadTask.on('state_changed', function(snapshot){
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = progress;
        }, function(error) {
        }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            self.url=downloadURL;
            var postData = {
              name: self.nameWalk,
              category: self.categoryWalk,
              description: self.description,
              locations:self.locationsWalk,
              gps: self.polyline.latlngs,
              photos:self.url,
              duration:self.duration,
              distance:self.distance

                  };
            var updates = {};
            updates[self.nameWalk] = postData;
            db.ref('app/walks').update(updates);
            self.setActivePageBackoffice('ListeBackoffice')

          });
        }); 
      }
  }
}
</script>

<style >
    .backIcon {
        height:3em;
        width: fit-content;
    }

    .backIcon img {
        height:100%;
    }

</style>
