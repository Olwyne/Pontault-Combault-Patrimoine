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

        <p>
            <input
            type="submit"
            value="Add"
            >
        </p>

        </form>
        <form
      id="addWalk"
      @submit="checkForm"
      novalidate="true"
    >

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
          <option>Culte</option>
          <option>Histoire</option>
        </select>
      </p>
        
        <p>
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          name="description"
        >

      
        </textarea>
      </p>


    
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

export default {
    data() {
        return {
           documents: [],
            errors: [],
            name: null,
            address: null,
            category: null,
            description: null,
            gps: null,
            photos:null,
            main:null,
            locations: [],
            choicelocation: null,
            locationsWalk: []
        }
    },
    mounted:function(){
        this.readLocation()
    },
    methods:{
         readLocation(){
            let self=this
            var query =  db.ref('app/locations/').orderByKey();
            query.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    self.locations.push(childSnapshot.key);
                });
            });
            console.log("test " +self.locationsWalk)
        },
        checkFormAddWalk(){
            let self=this
            self.locationsWalk.push(this.choicelocation)
        },
        checkForm(e){

          var postData = {
            name: this.name,
            category: this.category,
            address:this.address,
            gps: this.gps,
            photos: {
              main: this.photos.name,
              photo2: '4-CPA.jpg'
            }
          };
          console.log("photo: "+ photos.name)
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates[this.name] = postData;
          db.ref('app/locations').update(updates);
        },
    }
}
</script>

<style >
</style>
