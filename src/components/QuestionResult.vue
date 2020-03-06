<template>
    <div>
        <div class="questionTitle">{{question.name}}</div>
        <div class="text-center">
            <div class="result">Bonne réponse !</div>
        </div>
        <div class="resultText">
            {{question.description}}
        </div>
        <div class="d-flex justify-content-center">
            <div @click="setActivePage('VisiteLibre'), setActiveTitle('VisiteLibre')" class="backIcon"><img src="../img/back-blue.svg" /> Retour </div>
        </div>
    </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'QuestionResult',
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
        mounted: function () {
        },
        methods: {
            ... mapActions([
                    'setActivePage',
                    'setActiveTitle'
            ]),
        }
    }
</script>

<style>
    .resultText {
        margin: 1em 2em;
    }
</style>