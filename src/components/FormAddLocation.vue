<template>
    <div class="formAddLocation">
        <h1> Ajout d'un lieu</h1>
        <form
      id="addLocation"
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
        <label for="address">Address</label>
        <input
          id="address"
          v-model="address"
          type="address"
          name="address"
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
        <label for="gps">GPS</label>
        <input
          id="gps"
          v-model="gps"
          type="gps"
          name="gps"
        >
      </p>
      <p>
        <input
          type="submit"
          value="Submit"
        >
      </p>
      <p>
          <label for="photos">Photo</label>
            <input type="file" id="photos" name="photos"
                accept="image/png, image/jpeg">

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
            photos:null
        }
    },
    methods:{
         checkForm(e){
           var files = e.target.photos || e.dataTransfer.photos;
          var reader = new FileReader();
           reader.onload = (e) => {
               this.photos = e.target.result;
           };

          var postData = {
            name: this.name,
            category: this.category,
            address:this.address,
            gps: this.gps,
            photos: {
              main: reader.readAsDataURL(files[0]),
              photo2: '4-CPA.jpg'
            }
          };
          console.log(reader.readAsDataURL(files[0]))
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          // updates[this.name] = postData;
          // db.ref('app/locations').update(updates);
        },
    }
}
</script>

<style >
</style>
