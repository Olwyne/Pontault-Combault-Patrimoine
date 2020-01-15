<template>
    <div>
      <!-- <button @click="read">Lire</button>
      <button @click="update">Update</button> -->
      <button @click="deletel">Delete</button>
      <button @click="addLocation">Ajout Location</button>
      <button @click="addWalk">Ajout Promenade</button>
      <button @click="readAddress">Read Location</button>
      <button @click="readWalk">Read Promenade</button>
      <button @click="updateLocationCategory">Update Location</button>
      <button @click="updateWalk">Update Promenade</button>
    </div>
</template>

<script>
// RecentDocuments.vue
import { db } from '../config/db'

export default {
  data() {
    return {
      documents: [],
    }
  },

  firebase: {
    documents: db.ref()
    // locationsArr: db.ref('app/locations'), // loopable with v-for
    // locationsObj: { // can use keys, but v-for doesn't loop
    //   source: db.ref('app/locations'),
    //   asObject: true
    // },
    // walksArr: db.ref('app/walks'), // loopable with v-for
    // walksObj: { // can use keys, but v-for doesn't loop
    //   source: db.ref('app/walks'),
    //   asObject: true
    // }
  },
  methods:{
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