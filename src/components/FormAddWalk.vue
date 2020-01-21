<template>
  <div class="formAddLocation">
    <h1>Ajout d'une balade</h1>
    <form id="AddWalkLocation" @submit="checkFormAddWalk" novalidate="true">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="locations">Lieux à ajouter</label>
        <select id="choiceLocationAddWalk" v-model="choiceLocationAddWalk" name="choiceLocationAddWalk">
          <option v-for="location in locations" v-bind:key="location" v-bind:value="location">
            {{location}}
          </option>
        </select>
      </p>

      <div @click="checkFormAddWalk">Ajouter le lieu à la balade</div>

    </form>
          
    <form id="addWalk" @submit="checkForm" novalidate="true">
      <div>
        <h2> Lieux ajoutés :</h2>
        <ul>
          <li v-for="locationWalk in locationsWalk" v-bind:key="locationWalk">
            {{ locationWalk }}
          </li>
        </ul>
      </div>

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="nameWalk">Nom de la balade</label>
        <input id="nameWalk" v-model="nameWalk" type="text" name="nameWalk">
      </p>

      <p>
        <label for="categories">Categorie de la balade</label>
        <select id="categoryWalk" v-model="categoryWalk" name="categoryWalk">
          <option v-for="category in categories" v-bind:key="category" v-bind:value="category">
            {{category}}
          </option>
        </select>
      </p>
      
      <RichEditorText></RichEditorText>

      <input type="file" id="coord" name="coord" accept="json" @change="loadTextFromFile">

      <myMap :newcoords="polyline.latlngs"></myMap>
  
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  </div>
</template>

<script>
import { db } from '../config/db'
import RichEditorText from './RichEditorText'
import myMap from './map'

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
      descriptionWalk: null,
      categories: [],
      locations: [],
      choiceLocationAddWalk: null,
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
      self.coord = event.target.files[0]
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
        this.locationsWalk.push(this.choiceLocationAddWalk)
    },
    checkForm(e){
      var postData = {
        name: this.nameWalk,
        category: this.categoryWalk,
        description: this.descriptionWalk,
        locations:this.locationsWalk,
        gps: this.polyline.latlngs
      };
      var updates = {};
      updates[this.nameWalk] = postData;
      db.ref('app/walks').update(updates);

    },
  }
}
</script>

<style >
</style>
