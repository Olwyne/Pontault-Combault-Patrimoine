<template>
    <div>
        <a>
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="location.photos" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{location.name}}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                        </div>
                        <div class="baladeDuration d-flex">
                        </div>
                        <div class="modif"><img src="../img/pen.svg" /></div>
                        <div @click="removeLocationCarnet(location.name)" class="delete"><img src="../img/garbage-blue.svg" /></div>
                    </div>
                </div>
            </div>
        </a>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '../config/db'


    export default {
        name:'LieuCarnetBox',
        props:['location'],
        methods: {
            ... mapActions([
                'deleteLocationFromStore'
            ]),
            removeLocationCarnet(name) {
                 db.ref('app/locations/'+name).remove().then(() => {
                     console.log("lieu effacé")
                  })
            },

        },
        computed:{
            ... mapGetters([
                'getLocalStoreLocation',
            ]),
        },
    }
</script>