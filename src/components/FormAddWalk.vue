<template>
    <div class="formAddLocation">
        <h1> Ajout d'une balade</h1>
        <form
            id="AddWalkLocation"
            @submit="checkFormAddWalk"
            novalidate="true"

        >

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="locations">Lieux</label>
            <select
            id="choicelocation"
            v-model="choicelocation"
            name="choicelocation"
            >
            <option v-for="location in locations" v-bind:key="location" v-bind:value="location">
                    {{location}}
            </option>
            </select>
        </p>

        
            <div
            @click="checkFormAddWalk"
            value="Add"
            >Add</div>

        </form>
        <form
      id="addWalk"
      @submit="checkForm"
      novalidate="true"
    >

<div>
  <h2> Lieux ajoutés :</h2>
  <ul>
          <li v-for="locationWalk in locationsWalk" v-bind:key="locationWalk">{{ locationWalk }}</li>
  </ul>
</div>

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
        >
      </p>



      <p>
        <label for="categories">Category</label>
        <select
          id="category"
          v-model="category"
          name="category"
        >

            <option v-for="category in categories" v-bind:key="category" v-bind:value="category">
                    {{category}}
            </option>

        </select>
      </p>
      <RichEditorText></RichEditorText>

                <input type="file" id="coord" name="coord"
                accept="json" @change="loadTextFromFile">

      <myMap :newcoords="polyline.latlngs"></myMap>

    
      <p>
        <input
          type="submit"
          value="Submit"
        >
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
            name: 'toto',
            address: null,
            category: null,
            description: null,
            gps: null,
            photos:null,
            main:null,

            categories: [],
            locations: [],
            choicelocation: null,
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
        console.log(e)
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
        console.log(self.polyline.latlngs)
    };
      reader.readAsText(file);
    },
      processFile(event) {
            let self=this
            self.coord = event.target.files[0]
            console.log("main : "+self.coord.name)
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
            this.locationsWalk.push(this.choicelocation)
            console.log(this.locationsWalk)

        },
        checkForm(e){

          var postData = {
            name: this.name,
            category: this.category,

            description: this.description,
            locations:this.locationsWalk,
            gps: this.polyline.latlngs
          };
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates[this.name] = postData;
          db.ref('app/walks').update(updates);

        },
    }
}
</script>

<style >
</style>
