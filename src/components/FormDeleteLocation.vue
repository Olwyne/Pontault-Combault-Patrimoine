<template>
    <div class="formDeleteLocation">
        <h1>Suppression d'un lieu</h1>
        <form
            id="DeleteLocation"
            @submit="checkFormDelete"
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
            locations: [],
            choicelocation: null

        }
    },
    mounted:function(){
        this.readLocation()
    },
    methods:{
        checkFormDelete(){
            db.ref('app/locations/'+this.choicelocation).remove().then(() => {
            console.log('Location delete!')
            })
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
      
        }
    }
}
</script>

<style >
</style>
