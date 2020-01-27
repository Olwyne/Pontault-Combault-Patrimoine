<template>
  <div class="container containerBackoffice">
	<h1>Lieux <span  @click="setActivePageBackoffice('FormAddLocation')">+</span></h1>  
    <LocationBoxBackoffice v-for="location in locations" :key="location.name" :location='location'></LocationBoxBackoffice>
	<h1>Balades <span @click="setActivePageBackoffice('FormAddWalk')">+</span></h1>
    <BaladeBoxBackoffice v-for="walk in walks" :key="walk.name" :walk='walk'></BaladeBoxBackoffice>
	
    <!-- <FormAddLocation></FormAddLocation>
    <FormDeleteLocation></FormDeleteLocation>
    <FormAddWalk></FormAddWalk>
    <FormDeleteWalk></FormDeleteWalk> -->
  </div>
</template>

<script>
// RecentDocuments.vue
import { db,storageRef } from '../config/db'
import {mapActions, mapGetters} from 'vuex'

import LocationBoxBackoffice from '../components/LocationBoxBackoffice'
import BaladeBoxBackoffice from '../components/BaladeBoxBackoffice'


import FormDeleteLocation from '../components/FormDeleteLocation'
import FormAddLocation from '../components/FormAddLocation'
import FormAddWalk from '../components/FormAddWalk'
import FormDeleteWalk from '../components/FormDeleteWalk'
    export default {
  name: "Backoffice",
  components: {
    FormDeleteLocation,
    FormAddLocation,
    FormAddWalk,
    FormDeleteWalk,
    LocationBoxBackoffice,
    BaladeBoxBackoffice
  },
  data() {
    return {
      documents: [],
      errors: [],
      locations: [],
      walks: []
    }
  },
  firebase: {
    documents: db.ref()
  },
  methods:{
      ... mapActions([
                'setActivePageBackoffice',
        ]),
    readLocations(){
        let self=this
		var query =  db.ref('app/locations/').orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				self.locations.push(childSnapshot.val());  
			});
		});
	},
	readWalks(){
        let self=this
		var query =  db.ref('app/walks/').orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				self.walks.push(childSnapshot.val());  
			});
		});
    },
  
  },
	mounted: function(){
		this.readLocations()
		this.readWalks()
	}
}
</script>

<style>
    .containerBackoffice, .containerBackoffice h1,  input, #photos, option  {
        color: #44546a;
    }
 </style>