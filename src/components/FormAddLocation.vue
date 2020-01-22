<template>
  <div class="formAddLocation">
    <h1>Ajout d'un lieu</h1>
    <form id="addLocation" novalidate="true">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="nameLocation">Nom du lieu</label>
        <input id="nameLocation" v-model="nameLocation" type="text" name="nameLocation">
      </p>

      <p>
        <label for="addressLocation">Addresse du lieu</label>
        <input id="addressLocation" v-model="addressLocation" type="addressLocation" name="addressLocation">
      </p>

      <p>
        <label for="categories">Catégorie du lieu</label>
        <select id="categoryLocation" v-model="categoryLocation" name="categoryLocation">
          <option v-for="category in categories" v-bind:key="category" v-bind:value="category">
            {{category}}
          </option>
        </select>
      </p>
    
      <p>
        <label for="description">Description</label>
        <textarea id="description" v-model="description" name="description"></textarea>
      </p>

      <p>
        <label for="latitudeLocation">Latitude</label>
        <input type="number" v-model="latitudeLocation" id="latitudeLocation" name="latitudeLocation">
        
        <label for="longitudeLocation">Longitude</label>
        <input type="number" v-model="longitudeLocation" id="longitudeLocation" name="longitudeLocation">
      </p>
  
      <p>
        <label for="photos">Photo</label>
        <input type="file" id="photos" name="photos" accept="image/png, image/jpeg" @change="processFile($event)">
      </p>
      
      <div @click="checkForm">Ajouter le lieu</div>
  
      <progress id="uploader" value="0" max="100">0%</progress>
    </form>
  </div>
</template>

<script>
import { db,storageRef,storage, firebase } from '../config/db'

export default {
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

<style >
</style>
