<template>
    <div class="QuizNotification">
        <div class="NotifText d-flex justify-content-center">
            <img class="NotifPoco" src="../img/poco-head2.png" /><p>Quiz de Poco à proximité</p>
        </div>
        <div class="btn">Faire le quiz</div><div class="btn">Continuer la visite</div>
    </div>
</template>

<script>
    export default {
        name:'QuizNotification',
        methods: {

        }
    }
</script>

<style>
    .QuizNotification {
        background-color: var(--bluePC);
        margin: 1em;
        padding: 1em 1.3em;
    }

    .NotifPoco {
       height:2em;
       margin-right: 0.5em;
    }

    .NotifText {
        color: white;
    }

    .NotifText p{
        margin:0;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>