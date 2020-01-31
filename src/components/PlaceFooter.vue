<template>
    <div class="placeFooter fixed-bottom nav nav-fill">
        <div @click="setActivePage(getPreviousPage), setActiveLocation(getPreviousLocation), setActiveTitle(getPreviousPage)" class="nav-item">
            <img src="../img/back-white.svg" />
            <div  class="footerText">Retour</div>
        </div>
        <div class="nav-item" @click="openMap">
            <img src="../img/route-white.svg" />
            <div class="footerText">M'y rendre</div>
        </div>
        <div class="nav-item" @click="storeLocation">
            <img v-bind:src="heart" />
            <div class="footerText">Sauvegarder</div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {

        name: 'PlaceFooter',
        props: ["lieu"],
        data: function () {
                return {
                    heart: "./img/heart-empty-white.svg",
                }
            },
        methods: {
            ...mapActions([
                'addLocationToStore',
                'setActivePage',
                'setActiveLocation',
                'setActiveTitle'
            ]),
            storeLocation(){
                const stored = this.getLocalStoreLocation
                const present = stored.filter((item) => item.name === this.lieu.name)
                if (present.length === 0) {
                    this.addLocationToStore(this.lieu)
                    const parsed = JSON.stringify(this.getLocalStoreLocation); 
                    localStorage.setItem('StorageLocations', parsed);
                     this.heart="./img/heart-full-white.svg"
                }
            },
            openMap(){
                document.location.href="http://maps.google.com/?q="+ this.lieu.gps[0] +" ," +this.lieu.gps[1]; 
            },
            readStoreLocation(){
                const stored = this.getLocalStoreLocation
                const present = stored.filter((item) => item.name === this.getActiveLocation)
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
                'getLocalStoreLocation',
                'getActiveLocation',
                'getPreviousPage',
                'getPreviousLocation'
            ])
        }

    }
</script>

<style>
    .placeFooter {
        height: 14vh;
        background-color: var(--bluePC);
        color: white;
        padding: 0;
    }

        .placeFooter img {
            height: 66%;
        }

        .placeFooter .nav-item {
            display: block;
            padding: .5rem 0rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .placeFooter .footerText {
            padding-top: 0.1em;
            font-size: 86%;
        }
</style>

