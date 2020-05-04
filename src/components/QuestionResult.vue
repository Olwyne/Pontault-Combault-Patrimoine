<template>
    <div>
        <div class="questionTitle">{{question.name}}</div>
        <div class="text-center">
            <div class="result" id="result">Bonne réponse !</div>
        </div>
        <div class="resultText" v-html="question.description">

        </div>
        <div class="d-flex justify-content-center">
            <div>
                <div v-if="getQuestions.length>0" @click="setActivePage('Question'), setActiveTitle('Question')" class="backIcon"><img src="../img/next-blue.svg" /> Question suivante</div>
                <div @click="setActivePage('VisiteLibre'), setActiveTitle('VisiteLibre')" class="backIcon"><img src="../img/back-blue.svg" /> Retour à la visite </div>
            </div>
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
                question:{}
            }
        },
        mounted: function () {
            this.checkAnswer();
        },
        methods: {
            ... mapActions([
                    'setActivePage',
                    'setActiveTitle',
                    'setQuestionLocation',
                    'addQuestions',
                    'deleteQuestions'
            ]),
            checkAnswer(){
                this.question=this.getQuestions[0];
                if(this.question.goodAnswer==this.getAnswer){
                  document.getElementById("result").innerHTML ="Bonne réponse ! "
                }
                else{
                    document.getElementById("result").innerHTML ="Mauvaise réponse ! "
                }
                this.deleteQuestions(this.question)
                if(this.getQuestions.length==0){
                    this.setQuestionLocation(null)
                }

            }
        },
        computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveTitle',
                'getGameState',
                'getPreviousPage',
                'getQuestionLocation',
                'getQuestions',
                'getAnswer'
            ]),
        }
    }
</script>

<style>
    .resultText {
        margin: 1em 2em;
    }
</style>