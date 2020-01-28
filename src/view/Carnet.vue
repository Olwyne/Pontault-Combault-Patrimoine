<template>
    <div>
        <div class="alert alert-primary" role="alert">
             Les données du carnet de visite sont sauvegardées dans le cache du navigateur. Si vous videz votre cache, vous perdrez vos sauvegardes. 
        </div>
        <BaladeCarnetBox @click.native="setActivePage('Balade'), setActiveWalk(balade)" v-for="balade in getLocalStoreWalk" :balade="balade" :key="balade.name" />
        <LieuCarnetBox @click.native="setActivePage('Lieu'), setActiveLocation(lieu.name)" v-for="lieu in getLocalStoreLocation" :lieu="lieu" :key="lieu.name" />
    </div>
</template>

<script>
    import BaladeCarnetBox from '../components/BaladeCarnetBox'
    import LieuCarnetBox from '../components/LieuCarnetBox'
    import { mapGetters, mapActions } from 'vuex'

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
            ... mapActions([
                'setActiveLocation',
                'setActivePage',
                'setActiveWalk'
          ]),
        
        },
        computed:{
            ... mapGetters([
                'getLocalStoreLocation',
                'getLocalStoreWalk'
            ])
        }
  
    }
</script>

<style>
    .alert {
        font-size: 0.7em;
    margin: 0.5em;
    padding: 0.5em;
    color:  var(--bluePC);
    background-color: #e7f4ff;
    border-color:   var(--bluePC);
    }
</style>