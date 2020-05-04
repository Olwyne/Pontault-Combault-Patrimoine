<template>
    <div>
        <div class="questionTitle">{{question.name}}</div>
        <div class="text-center"><img class="questionImage" v-bind:src="question.photo" /></div>
        <div class="answers" id="answers">
            <div class="anAnswer"  @click="activePage='QuestionResult', setActivePage('QuestionResult'), setActiveTitle('Réponse'), setAnswer(question.goodAnswer)">{{question.goodAnswer}}</div>
            <div class="anAnswer"  @click="activePage='QuestionResult',setActivePage('QuestionResult'), setActiveTitle('Réponse'), setAnswer(question.wrongAnswer1)" >{{question.wrongAnswer1}}</div>
            <div class="anAnswer"  @click="activePage='QuestionResult',setActivePage('QuestionResult'), setActiveTitle('Réponse'), setAnswer(question.wrongAnswer2)" >{{question.wrongAnswer2}}</div>
            <div class="anAnswer" @click="activePage='QuestionResult',setActivePage('QuestionResult'), setActiveTitle('Réponse'), setAnswer(question.wrongAnswer3)">{{question.wrongAnswer3}}</div>
        </div>
        <div class="d-flex justify-content-center">
        <div @click="setActivePage('VisiteLibre'), setActiveTitle('Visite Libre')"  class="backIcon"><img src="../img/back-blue.svg" /> Retour à la visite </div>
        </div>
    </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex'
 import { db } from '../config/db'

    export default {
        name: 'Question',
        components: {

        },
        data: function () {
            return {
                location:null,
                questions:[],
                question:{}
            }
        },
        mounted:function(){
           this.setQuestionLocation("Ancienne mairie de Pontault-Combault")
           if(this.getQuestions.length==0){
                this.initQuestion();
           }
           else{
               this.getQuestion()
           }
           var ul = document.getElementById('answers');
            for (var i = ul.children.length; i >= 0; i--) {
                ul.appendChild(ul.children[Math.random() * i | 0]);
            }
          
        },
        methods: {
            ... mapActions([
                    'setActivePage',
                    'setActiveTitle',
                    'setQuestionLocation',
                    'addQuestions',
                    'deleteQuestions',
                    'setAnswer'
            ]),
            initQuestion(){
                let self=this
                var query =  db.ref('app/questions/').orderByKey();
                query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        let result = childSnapshot.val()
                        if(result.location==self.getQuestionLocation){
                            self.addQuestions(childSnapshot.val())
                            self.questions=self.getQuestions
                            self.question=self.questions[0]
                        }
                      
                    });
                });
                query =  db.ref('app/locations/').orderByKey();
                query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if(childSnapshot.key==self.getQuestionLocation){
                            self.location=(childSnapshot.val());
                            self.question.photo=self.location.photos
                        }
                    
                    });
                });
                
            },
            getQuestion(){
                this.questions=this.getQuestions
                this.question=this.questions[0]
            }
        },
        computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveTitle',
                'getGameState',
                'getPreviousPage',
                'getQuestionLocation',
                'getQuestions'
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