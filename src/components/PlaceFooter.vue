<template>
    <div class="placeFooter fixed-bottom nav nav-fill">
        <div class="nav-item">
            <img src="../img/back-white.svg" />
            <div>Retour</div>
        </div>
        <div class="nav-item">
            <img src="../img/route-white.svg" />
            <div>M'y rendre</div>
        </div>
        <div class="nav-item" @click="storeLocation">
            <img v-bind:src="heart" />
            <div>Sauvegarder</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
        
        name:'PlaceFooter',
        props:["lieu"],
        data: function () {
                return {
                    heart: "./img/heart-empty-white.svg"
                }
            },
        methods: {
            ... mapActions([
                'addLocationToStore'
            ]),
            storeLocation(){
                const stored = this.getLocalStoreLocation
                const present = stored.filter((item) => item.name === this.lieu.name)
                if(present.length===0){
                    this.addLocationToStore(this.lieu)
                    console.log(this.lieu)
                    const parsed = JSON.stringify(this.getLocalStoreLocation); 
                    localStorage.setItem('StorageLocations', parsed);
                     this.heart="./img/heart-full-white.svg"
                }
            },
            readStoreLocation(){
                const stored = this.getLocalStoreLocation
                const present = stored.filter((item) => item.name === this.lieu.name)
                if(present.length===0){
                    this.heart="./img/heart-empty-white.svg"
                }
                else{
                    this.heart="./img/heart-full-white.svg"
                }
            }
        },
        mounted: function(){
            this.readStoreLocation()
        },
        computed: {
            ... mapGetters([
                'getLocalStoreLocation'
            ])
        }
        
    }
</script>

<style>
.placeFooter {
    background-color: var(--bluePC);
    color: white;
    padding:0;
}

    .placeFooter img {
        height: 2.2rem;
    }

    .placeFooter .nav-item {
        display: block;
        padding: .5rem 0rem;
        width: 33.3%
    }
</style>

