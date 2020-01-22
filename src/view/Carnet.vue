<template>
    <div>
        <BaladeCarnetBox v-for="balade in baladesCarnet" :balade="balade" :key="balade.name" />
        <LieuCarnetBox v-for="lieu in lieuxCarnet" :lieu="lieu" :key="lieu.name" />
    </div>
</template>

<script>
    import BaladeCarnetBox from '../components/BaladeBox'
    import LieuCarnetBox from '../components/LieuCarnetBox'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            BaladeCarnetBox,
            LieuCarnetBox
        },
        props:["newLocation"],
        data: function () {
            return {
                baladesCarnet: [],
                lieuxCarnet: []
            }
        },
        mounted:function(){
            if (localStorage.getItem('StorageLocations')) {
                try {
                    this.lieuxCarnet = JSON.parse(localStorage.getItem('StorageLocations'));
                } catch(e) {
                    localStorage.removeItem('StorageLocations');
                }
            }
            console.log(this.lieuxCarnet)
        },
        methods: {
        
        },
        computed:{
            ... mapGetters([
                'getLocalStoreLocation'
            ])
        }
  
    }
</script>