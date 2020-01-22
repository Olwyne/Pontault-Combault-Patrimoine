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
import { db,storageRef } from '../config/db'

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
    readStorageImage(){
        var imagesRef = storageRef.child('app/images');
        // Points to 'images/space.jpg'
        // Note that you can use variables to create child values
        var fileName = '42199239_2084161171635108_753778829306101760_o.jpg';
        var spaceRef = imagesRef.child(fileName);

        // File path is 'images/space.jpg'
        var path = spaceRef.fullPath

        // File name is 'space.jpg'
        var name = spaceRef.name

        // Points to 'images'
        var imagesRef = spaceRef.parent;
        console.log("image "+ name)
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
    }
  }
}
</script>