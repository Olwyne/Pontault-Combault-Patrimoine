<template>
    <div @click="setActivePage('Lieu'), setActiveLocation(lieu.name),setActiveTitle('Lieu'),setPreviousPage('Carnet')" class="baladeBox row">
        <div class="thumbnailSize col-5">
            <img class="baladeThumbnail" v-bind:src="lieu.photos" />
        </div>
        <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
            <div class="baladeTitle">{{lieu.name}}</div>
            <div class="d-flex justify-content-between">
                <div class="baladeDistance d-flex">
                </div>
                <div class="baladeDuration d-flex">
                </div>
                <div @click.stop="removeLocationCarnet()" class="delete"><img src="../img/garbage-blue.svg" /></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

    export default {
        name:'LieuCarnetBox',
        props:['lieu'],
        methods: {
            ... mapActions([
                'deleteLocationFromStore',
                'setActivePage',
                'setActiveLocation',
                'setActiveTitle',
                'setPreviousPage'
            ]),
            removeLocationCarnet() {
                this.deleteLocationFromStore(this.lieu)
                const stored = this.getLocalStoreLocation
                const parsed = JSON.stringify(stored); 
                localStorage.setItem('StorageLocations', parsed);
            },

        },
        computed:{
            ... mapGetters([
                'getLocalStoreLocation',
            ]),
        },
    }
</script>