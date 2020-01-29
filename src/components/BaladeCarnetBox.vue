<template>
    <div>
        <a @click="setActivePage('Balade'), setActiveWalk(balade)">
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="balade.photos" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    
                    <div class="baladeTitle">{{ balade.name }}</div>
                  
                    <div class="d-flex justify-content-between">
                            <div class="baladeDistance d-flex">
                                <div><img src="../img/distance-blue.svg" /></div>
                                <div class="align-self-end km">{{ balade.distance }}</div>
                            </div>
                            <div class="baladeDuration d-flex">
                                <div><img src="../img/chronometer-blue.svg" /></div>
                                <div class="align-self-end duration">{{ balade.duration}}</div>
                            </div>
                            
                        <div class="delete" @click="removeWalkCarnet(balade.name), setActivePage('Carnet')" ><img src="../img/garbage-blue.svg" /></div>
                    </div>
                </div>
            </div>
        </a>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

    export default {
        name:'BaladeCarnetBox',
        props:['balade'],
         data: function () {
            return {
               
            }
        },
        methods: {
            ... mapActions([
                'deleteWalkFromStore',
                'setActivePage',
                'setActiveWalk'
            ]),
            removeWalkCarnet(name) {
                this.deleteWalkFromStore(this.balade)
                const stored = this.getLocalStoreWalk
                const parsed = JSON.stringify(stored); 
                localStorage.setItem('StorageWalk', parsed);
            },

        },
        mounted:function(){
        },
        computed:{
            ... mapGetters([
                'getLocalStoreWalk',
            ]),
        },
    }
</script>