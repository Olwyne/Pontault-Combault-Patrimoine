<template>
    <div>
        <BaladeCarnetBox v-for="balade in getLocalStoreWalk" :balade="balade" :key="balade.name" />
        <LieuCarnetBox v-for="lieu in getLocalStoreLocation" :lieu="lieu" :key="lieu.name" />
    </div>
</template>

<script>
    import BaladeCarnetBox from '../components/BaladeCarnetBox'
    import LieuCarnetBox from '../components/LieuCarnetBox'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            BaladeCarnetBox,
            LieuCarnetBox
        },
        data: function () {
            return {
                baladesCarnet: {
                    name:null
                },
                lieuxCarnet: {
                    name:null
                }
            }
        },
        mounted:function(){
        },
        methods: {
        
        },
        computed:{
            ... mapGetters([
                'getLocalStoreLocation',
                'getLocalStoreWalk'
            ])
        }
  
    }
</script>