<template>
    <div class="QuizNotification" v-show="activeNotification">
        <div class="NotifText d-flex justify-content-center">
            <img class="NotifPoco" src="../img/poco-head2.png" /><p>Quiz de Poco à proximité</p>
        </div>
        <div class="d-flex justify-content-between">
            <button @click="setActivePage('Question'),activePage='Question',setActiveTitle('Question'),setPreviousPage('VisiteLibre')" type="button" class="btn NotifBtn">Faire le quiz</button><button type="button" class="btn NotifBtn">Continuer la visite</button>
        </div>
    </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex'

    export default {
        name:'QuizNotification',
        props: ["previousPage"],
        data: function () {
                return {
                   
                }
        },
        methods: {
            ... mapActions([
                    'setActivePage',
                    'setActiveTitle',
                    'setPreviousPage'
            ]),
            
           
        },
        computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveTitle',
                'getGameState',
                'getPreviousPage',
                'getPreviousLocation',
                'getQuestionLocation'
            ]),
            activeNotification(){
                 if(this.getGameState==true && this.getQuestionLocation!=null && this.getActivePage == "VisiteLibre" ){
                     return true
                 }
                 else{ 
                     return false
                }
            }
             
        },
        mounted: function(){
            this.$root.$on('QuizNotification', () => {
               this.activeNotification
            })
        }
    }
</script>

<style>
    .QuizNotification {
        background-color: var(--bluePC);
        margin: 1em;
        padding: 1em 1.3em;
        border-radius: 1em;
    }

    .NotifPoco {
       height:2em;
       margin-right: 0.5em;
    }

    .NotifText {
        color: white;
        margin-bottom: 1em;
    }

    .NotifText p{
        margin:0;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .NotifBtn{
        background-color: white;
        color:var(--darkbluePC);
        font-weight:600;
    }
</style>