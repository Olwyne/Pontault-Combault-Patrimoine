<template>
    <div class="placeFooter fixed-bottom nav nav-fill">
        <div class="nav-item">
            <img src="../img/back-white.svg" />
            <div class="footerText">Retour</div>
        </div>
        <div class="nav-item">
            <img src="../img/route-white.svg" />
            <div class="footerText">M'y rendre</div>
        </div>
        <div class="nav-item" @click="storeLocation">
            <img src="../img/heart-empty-white.svg" />
            <div class="footerText">Sauvegarder</div>
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
                    
                }
            },
        methods: {
            ... mapActions([
                'addLocationToStore'
            ]),
            storeLocation(){
                const stored = this.getLocalStore
                const present = stored.filter((item) => item.name === this.lieu.name)
                if(present.length===0){
                    this.addLocationToStore(this.lieu)
                    const parsed = JSON.stringify(this.getLocalStore); 
                    localStorage.setItem('StorageLocations', parsed);
                }
                
            
            }
        },
        computed: {
            ... mapGetters([
                'getLocalStore'
            ])
        }
        
    }
</script>

<style>
.placeFooter {
    height: 10vh;
    background-color: var(--bluePC);
    color: white;
    padding:0;
}

    .placeFooter img {
        height: 80%;
    }

    .placeFooter .nav-item {
        display: block;
        padding: .5rem 0rem;
        height: 100%;
    }

    .placeFooter .footerText {
        height: 20%;
        font-size: 100%;
    }
</style>

