<template>
    <div>
      <form
      id="app"
      @submit="checkForm"
      novalidate="true"
    >

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
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
        <input
          type="submit"
          value="Submit"
        >
      </p>

    </form>
    </div>
</template>

<script>
// RecentDocuments.vue
import { db } from '../config/db'

export default {
  data() {
    return {
      documents: [],
      errors: [],
      name: null,
      address: null,
      category: null
    }
  },

  firebase: {
    documents: db.ref()
  },
  methods:{
        checkForm(){
          var postData = {
            name: this.name,
            category: this.category,
            address:this.address,
            gps: '48.7826000, 2.6011282',
            photos: {
              main: '4 Eglise Saint-Denis.JPG',
              photo2: '4-CPA.jpg'
            }
          };
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates[this.name] = postData;
          db.ref('app/locations').update(updates);
        },
        addLocation(name, category, address, gps) {
          var postData = {
            name: 'Eglise Saint-Denis',
            category: 'Culte',
            address:'Place du Général Leclerc (Vieux Pontault)',
            gps: '48.7826000, 2.6011282',
            photos: {
              main: '4 Eglise Saint-Denis.JPG',
              photo2: '4-CPA.jpg'
            }
          };
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates['Eglise Saint-Denis'] = postData;
          db.ref('app/locations').update(updates);
        },
        addWalk(){
          db.ref('app/walks').push({
            name: 'De Combault à Pontault',
            locations:{
              location1:'Eglise Saint-Denis',
              location2: 'Château du Bois la Croix'
            }  
          })
        }, 
        readLocation(){
          db.ref('app/locations').once('value', snapshot => {
            const documents = snapshot.val()
            console.log(documents)
          })
        },
        readWalk(){
          db.ref('app/walks').once('value', snapshot => {
            const documents = snapshot.val()
            console.log(documents)
          })
        },
        updateLocationCategory(){
    
          // db.ref('app/locations/Eglise Saint-Denis').once('value').then(function(snapshot) {
          //   var name = (snapshot.val());
          //   console.log(name.address)
           
          // });
          var postData = {
            category: 'Cultes',

          };
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates['Eglise Saint-Denis'] = postData;
          db.ref('app/locations/Eglise Saint-Denis').update(postData);


        },
        updateWalk(){
          db.ref('app/walks').update({ id: "hello" }).then(() => {
              console.log('walk updated!')
          })
        },
        readAddress(){
            db.ref('app/locations/Eglise Saint-Denis').once('value').then(function(snapshot) {
            var name = (snapshot.val());
            console.log(name.address)
           
          });
        },
        deletel(){
            db.ref('app/locations/Eglise Saint-Denis').remove().then(() => {
              console.log('Location delete!')
          })
        }
  }
}

</script>