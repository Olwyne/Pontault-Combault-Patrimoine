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

      <div class="form-group">
        <label for="locations">Lieux à ajouter</label>
        <select multiple id="choiceLocationAddWalk" v-model="choiceLocationAddWalk" name="choiceLocationAddWalk" class="form-control">
          <option v-for="location in locations" v-bind:key="location" v-bind:value="location">
            {{location}}
          </option>
        </select>
      </div>

      <div @click="checkFormAddWalk" class="form-group btn btn-primary ">Ajouter le lieu à la balade</div>

    </form>
          
    <form id="addWalk" @submit="checkForm" novalidate="true">
        <div>
            <div> Lieux ajoutés :</div>
            <ul>
                <li v-for="locationWalk in locationsWalk" v-bind:key="locationWalk" class="lieuAjoute">
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

        <div class="form-group">
            <label for="nameWalk">Nom de la balade</label>
            <input id="nameWalk" v-model="nameWalk" type="text" name="nameWalk" class="form-control">
        </div>
        <div class="form-group">
            <RichEditorText></RichEditorText>
        </div>

        <input type="file" id="coord" name="coord" accept="json" @change="loadTextFromFile">

        <myMap :newcoords="polyline.latlngs"></myMap>

        <div class="form-group">
            <input type="submit" value="Ajouter la balade" class="btn btn-primary">
        </div>
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
      description: null,
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
        description: this.description,
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
