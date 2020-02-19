<template>
    <div>
        <div class="questionTitle">Quel est la capitale de la France ?</div>
        <div class="text-center">
            <div class="result">Bonne réponse !</div>
        </div>
        <div class="resultText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="d-flex justify-content-center">
            <div @click="" class="backIcon"><img src="../img/back-blue.svg" /> Retour </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuestionResult',
        components: {

        },
        data: function () {
            return {

            }
        },
        mounted: function () {
        }
    }
</script>

<style>
    .resultText {
        margin: 1em 2em;
    }
</style>