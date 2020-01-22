<template>
    <div>
        <BaladeBox @updatePage="updatePage"  v-for="balade in balades" :balade="balade" :key="balade.title"/>
    </div>
</template>

<script>
    import BaladeBox from '../components/BaladeBox'
    import { db,storageRef } from '../config/db'

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
            
            updatePage: function(datas){
                this.activepage=datas.location
                this.$emit('updatePage', datas)
                console.log(datas)
            }
        }
        
    }
</script>