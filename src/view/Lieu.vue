<template>
    <div>
        <div class="placeContainer">
            <div class="placeTitle">{{ location.name }}</div>
            <div class="text-center">
                <img class="placeImage" v-bind:src="location.photos" />
            </div>
            <div class="placeBody">
                <div class="placeAddress">{{  location.address }}</div>
                <div class="placeText" v-html="location.description"></div>
            </div>
        </div>
       <PlaceFooter :lieu="location"></PlaceFooter >
    </div>
</template>

<script>
    import PlaceFooter from '../components/PlaceFooter'
    import { db,storageRef } from '../config/db'
    import { mapActions, mapGetters } from 'vuex'


    export default {
        name: 'Lieu',
        components: {
            PlaceFooter
        },
        data: function () {
            return {
                lieu:null,
                location:{
                    name: null,
                    description: null,
                    photos: null,
                    address: null
                },
                toSave: []
            }
        },
        mounted: function(){
            this.lieu=this.getActiveLocation
            this.readLocation()
        },
         computed:{
            ... mapGetters([
                'getActiveLocation',
            ]),
        },
        methods:{
            addLocationCarnet(love){
                this.toSave.push(this.location)
                console.log(this.toSave)    
                this.saveLocationCarnet()   
            },
            saveLocationCarnet() {
                console.log("save")
              //  console.log(this.toSave)
                
                const parsed = JSON.stringify(this.toSave);
                localStorage.setItem('lieuxCarnet', parsed);
            },
            readLocation(){
                let self=this
                var query =  db.ref('app/locations/').orderByKey();
                query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if(childSnapshot.key==self.lieu){
                            self.location=(childSnapshot.val());
                        }
                    
                    });
                });
            }
        }
    }
</script>

<style>
    .placeContainer {
    margin-bottom:6em;
}
.placeTitle {
    color: var(--darkbluePC);
    text-align: center;
    font-size: 1.3em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    line-height: 1.2em;
    padding-right: 1em;
    padding-left: 1em;
}

.placeImage {
    text-align: center;
    max-height: 17em;
    max-width: 100%;
}

.placeBody {
    color: var(--darkbluePC);
    margin: 1em;
}

.placeAddress {
    margin: 1em;
}
</style>

