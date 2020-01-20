<template>
    <div>
     <FormAddLocation></FormAddLocation>
    <FormDeleteLocation></FormDeleteLocation>
    <FormAddWalk></FormAddWalk>
    <FormDeleteWalk></FormDeleteWalk>
    </div>
</template>

<script>
// RecentDocuments.vue
import { db } from '../config/db'
import FormDeleteLocation from '../components/FormDeleteLocation'
import FormAddLocation from '../components/FormAddLocation'
import FormAddWalk from '../components/FormAddWalk'
import FormDeleteWalk from '../components/FormDeleteWalk'



export default {
  components: {
    FormDeleteLocation,
    FormAddLocation,
    FormAddWalk,
    FormDeleteWalk,

  },
  data() {
    return {
      documents: [],
      errors: [],
    }
  },

  firebase: {
    documents: db.ref()
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