<template>
  <div class="formAddLocation form-group">
    <div @click="setActivePageBackoffice('ListeBackoffice')">Retour</div>
    <h1>Ajout d'un lieu</h1>
    <form id="addLocation" novalidate="true">

      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label for="nameLocation">Nom du lieu</label>
        <input id="nameLocation" v-model="nameLocation" type="text" name="nameLocation" class="form-control">
      </div>

      <div class="form-group">
        <label for="addressLocation">Adresse du lieu</label>
        <input id="addressLocation" v-model="addressLocation" type="addressLocation" name="addressLocation"  class="form-control">
      </div>

      <div class="form-group">
        <label for="categories">Catégorie du lieu</label>
        <select id="categoryLocation" v-model="categoryLocation" name="categoryLocation" class="form-control">
          <option v-for="category in categories" v-bind:key="category" v-bind:value="category">
            {{category}}
          </option>
        </select>
      </div>
    
       <div class="form-group">
            <RichEditorText></RichEditorText>
        </div>


      <div class="form-group row">
          <div class="col">
              <label for="latitudeLocation">Latitude</label>
              <input type="number" v-model="latitudeLocation" id="latitudeLocation" name="latitudeLocation" class="form-control">
          </div>
          <div class="col">
              <label for="longitudeLocation">Longitude</label>
              <input type="number" v-model="longitudeLocation" id="longitudeLocation" name="longitudeLocation" class="form-control">
          </div>
      </div>
  
      <div class="form-group">
        <label for="photos">Photo</label>
          <br />
        <input type="file" id="photos" name="photos" accept="image/png, image/jpeg" @change="processFile($event)">
      </div>
      
      <div @click="checkForm" class="btn btn-primary form-group">Ajouter le lieu</div>
      <div class="progress">
          <progress id="uploader" value="0" max="100">0%</progress>
      </div>
    </form>
  </div>
</template>

<script>
import { db,storageRef,storage, firebase } from '../config/db'
import RichEditorText from './RichEditorText'
import {mapActions, mapGetters} from 'vuex'


export default {
  components: {
    RichEditorText,
    
  },
    data() {
        return {
          documents: [],
          errors: [],
          nameLocation: null,
          addressLocation: null,
          categoryLocation: null,
          description: null,
          photos:null,
          categories: [],
          url: null,
          latitudeLocation: null,
          longitudeLocation: null
        }
    },
    mounted:function(){
      this.readCategory()
    },
    methods:{
      ... mapActions([
                'setActivePageBackoffice',
        ]),
      processFile(event) {
        let self=this
        self.photos = event.target.files[0]
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
              name: self.nameLocation,
              category: self.categoryLocation,
              address: self.addressLocation,
              description: self.description,
              gps:{
                0: self.latitudeLocation, 
                1: self.longitudeLocation
              },
              photos:self.url
            };
            var updates = {};
            updates[self.nameLocation] = postData;
            db.ref('app/locations').update(updates);
          });
        }); 
      }
    }
}
</script>

<style>
    #uploader {
        width: 100%;
        height: 100%;
    }

    .btn-primary {
        background-color: #5b9bd5;
        border: none;
    }

        .btn-primary:hover, .btn-primary:active, .btn-primary:focus {
            background-color: #42719a;
            border: none;
        }

    progress[value] {
        /* Reset the default appearance */
        -webkit-appearance: none;
        appearance: none;
        width: 250px;
        height: 20px;
    }

        progress[value]::-webkit-progress-bar {
            background-color: #eee;
        }

        progress[value]::-webkit-progress-value {
            background-color: #5b9bd5;
        }
</style>