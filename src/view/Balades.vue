<template>
    <div>
        <BaladeBox @click.native="setActivePage('Balade')"  v-for="balade in balades" :balade="balade" :key="balade.title"/>
    </div>
</template>

<script>
    import BaladeBox from '../components/BaladeBox'
    import { db,storageRef } from '../config/db'
    import { mapActions } from 'vuex'


    export default {
        components: {
            BaladeBox
        },
        data: function () {
            return {
                balades: [],
                activePage: 'Balades'
            }
        },
        mounted: function(){
            this.readWalks()
        },
        methods: {
            ... mapActions([
                'setActivePage'
          ]),
            readWalks(){
                let self=this
                var query =  db.ref('app/walks/').orderByKey();
                query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        self.balades.push(childSnapshot.val());  
                    });
                });
            },

        }
        
    }
</script>