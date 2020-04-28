<template>
    <div>
        <div class="questionTitle">{{question.name}}</div>
        <div class="text-center"><img class="questionImage" v-bind:src="question.photo" /></div>
        <div class="answers">
            <div class="anAnswer" @click="activePage='QuestionResult', setActivePage('QuestionResult'), setActiveTitle('Réponse')">{{question.goodAnswer}}</div>
            <div class="anAnswer" @click="activePage='QuestionResult',setActivePage('QuestionResult'), setActiveTitle('Réponse')" >{{question.wrongAnswer1}}</div>
            <div class="anAnswer" @click="activePage='QuestionResult',setActivePage('QuestionResult'), setActiveTitle('Réponse')" >{{question.wrongAnswer2}}</div>
            <div class="anAnswer" @click="activePage='QuestionResult',setActivePage('QuestionResult'), setActiveTitle('Réponse')">{{question.wrongAnswer3}}</div>
        </div>
        <div class="d-flex justify-content-center">
        <div @click="setActivePage('VisiteLibre'), setActiveTitle('Visite Libre')"  class="backIcon"><img src="../img/back-blue.svg" /> Retour </div>
        </div>
    </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Question',
        components: {

        },
        data: function () {
            return {
                location:null,
                questions:[],
                question:{
                    name:"En quelle année le hameau de Combault a-t-il été rattaché à Pontault ?",
                    description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    id: 1,
                    lastUpdate: "28/02/2020 à 09:23:06",
                    location: "Ancienne mairie de Pontault-Combault",
                    goodAnswer: "1819",
                    wrongAnswer1:"1829",
                    wrongAnswer2: "1838",
                    wrongAnswer3: "1849",
                    photo : "https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Flocations%2Fimages%2F11%20Ancienne%20mairie.jpg?alt=media&token=ebcfce01-ded9-47b5-b7d9-e6c361cacf61"
                }
            }
        },
        mounted:function(){
           
        },
        methods: {
            ... mapActions([
                    'setActivePage',
                    'setActiveTitle'
            ])
        },
        computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveTitle',
                'getGameState',
                'getPreviousPage',
            ]),
        }
        
    }
</script>

<style>
    .questionTitle {
        color: var(--darkbluePC);
        text-align: center;
        font-size: 1.3em;
        margin: 1em 0;
        line-height: 1.2em;
        padding-right: 1em;
        padding-left: 1em;
        font-weight: 500;
    }

    .questionImage {
        max-width:100%;
        max-height:30vh;
    }

    .anAnswer {
        background-color: var(--bluePC);
        padding: 0.5em;
        margin-bottom: 1em;
        color: white;
        border-radius: 1em;
        text-align:center;
    }

    .answers {
        margin: 1em 2em;
    }

    .backIcon {
        height:3em;
        width: fit-content;
    }

    .backIcon img {
        height:100%;
    }
</style>