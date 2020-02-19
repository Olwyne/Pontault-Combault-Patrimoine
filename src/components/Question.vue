<template>
    <div>
        <div class="questionTitle">Quel est la capitale de la France ?</div>
        <div class="text-center"><img class="questionImage" src="https://3.bp.blogspot.com/-tNS7j9vjoq4/V2z8QtE4XOI/AAAAAAAAZpY/6ryqoV1oxkQZP8FOXCBLsN6smplu5jl0ACLcB/s1600/eiffel%2Btower%2Band%2Bchamp%2Bde%2Bmars.jpg" /></div>
        <div class="answers">
            <div class="anAnswer">Londres </div>
            <div class="anAnswer">Paris</div>
            <div class="anAnswer">Lyon</div>
            <div class="anAnswer">Pari</div>
        </div>
        <div class="d-flex justify-content-center">
        <div @click="" class="backIcon"><img src="../img/back-blue.svg" /> Retour </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Question',
        components: {

        },
        data: function () {
            return {

            }
        },
        mounted:function(){
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