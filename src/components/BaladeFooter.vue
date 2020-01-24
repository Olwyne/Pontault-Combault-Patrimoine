<template>
    <div class="placeFooter fixed-bottom nav nav-fill">
        <div class="nav-item">
            <img src="../img/back-white.svg" />
            <div class="footerText">Retour</div>
        </div>
        <div class="nav-item">
            <img src="../img/route-white.svg" />
            <div class="footerText">Aller au depart</div>
        </div>
        <div class="nav-item"  @click="storeWalk">
            <img v-bind:src="heart" />
            <div class="footerText">Sauvegarder</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

    export default {
        
        name:'BaladeFooter',
        props:['walk'],
        data: function () {
                return {
                    heart: "./img/heart-empty-white.svg"
                }
            },
         methods: {
            ... mapActions([
                'addWalkToStore'
            ]),
            storeWalk(){
                const stored = this.getLocalStoreWalk
               
                const present = stored.filter((item) => item.name === this.walk.name)
                if(present.length===0){
                    this.addWalkToStore(this.walk)
                    const parsed = JSON.stringify(this.getLocalStoreWalk); 
                    localStorage.setItem('StorageWalk', parsed);
                    this.heart="./img/heart-full-white.svg"
                }
            
                
            },
            readStoreWalk(){
                const stored = this.getLocalStoreWalk
                const present = stored.filter((item) => item.name === this.getActiveWalk.name )
                if(present.length===0){
                    this.heart="./img/heart-empty-white.svg"
                }
                else{
                    this.heart="./img/heart-full-white.svg"
                }
                
               
            }
        },
        mounted: function(){
            this.readStoreWalk()
        },
        computed: {
            ... mapGetters([
                'getLocalStoreWalk',
                'getActiveWalk'
            ])
        }
    }
</script>

<style>
</style>

