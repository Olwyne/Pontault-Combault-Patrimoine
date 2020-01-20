<template>
    <div class="formDeleteWalk">
        <h1>Suppression d'une balade</h1>
        <form
            id="DeleteWalk"
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
            <label for="walks">Balade</label>
            <select
            id="choicewalk"
            v-model="choicewalk"
            name="choicewalk"
            >
            <option v-for="walk in walks" v-bind:key="walk" v-bind:value="walk">
                    {{walk}}
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
            walks: [],
            choicewalk: null

        }
    },
    mounted:function(){
        this.readWalks()
    },
    methods:{
        checkFormDelete(){
            db.ref('app/walks/'+this.choicewalk).remove().then(() => {
            console.log('Balade delete!')
            })
        },
        readWalks(){
            let self=this
            var query =  db.ref('app/walks/').orderByKey();
            query.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    self.walks.push(childSnapshot.key);
                });
            });
      
        }
    }
}
</script>

<style >
</style>
