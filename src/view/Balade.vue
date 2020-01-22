<template>
    <div>
        <div class="marginFooter">
        <div class="baladeMap"></div>
        <div class="baladeContainer">
            <div class="placeTitle">{{ walk.name }}</div>
            <div class="d-flex justify-content-center">
                <div class="baladeDistance d-flex justify-content-center">
                    <div class="align-self-end"><img src="../img/distance-blue.svg" /></div>
                    <div class="align-self-end km">{{ walk.distance }}</div>
                </div>
                <div class="baladeDuration d-flex justify-content-center">
                    <div class="align-self-end"><img src="../img/chronometer-blue.svg" /></div>
                    <div class="align-self-end duration">{{ walk.duration }}</div>
                </div>
            </div>
        </div>
        <div class="thumbnailSize ">
            <img class="baladeThumbnail" v-bind:src="walk.photos" />
        </div>
        <div class="lieuxList">
            <!-- mettre le lien du lieu dans le src suivant -->
            <div>Sur le parcours :</div>
            <a src="" @click="updatePage('Lieu', lieuBalade)" v-for="lieuBalade in walk.locations">- {{ lieuBalade }}</a>
        </div>
        <div class="placeBody">
            <div class="placeText" v-html="walk.description" ></div>
        </div>
        </div>
        <BaladeFooter />
    </div>
</template>

<script>
    import BaladeFooter from '../components/BaladeFooter'
    
    export default {
        name: 'Balade',
        components: {
            BaladeFooter
        },
        props:["walk"],
        data: function () {
            return {
            }
        },
        methods:{
            updatePage: function (location,lieu) {
                const datas={
                    location: location,
                    lieu:lieu
                }
                this.$emit('updatePage', datas)
            },
        }
    }
</script>

<style>
    .baladeMap{
    width: 100%;    
    height: 57vh;
    }

    .baladeContainer {
        margin: 1em;
    }

    .baladeDistance, .baladeDuration, .baladeDetails {
        width: 33.3%;
        text-align: center;
        color: var(--darkbluePC);
    }
    
    .lieuxList{
        margin:2em;
        color: var(--darkbluePC);
    }

    .lieuxList a{
        color: var(--bluePC);
        display: block;
    }

    .marginFooter{
        margin-bottom: 7em;
    }
    .thumbnailSize {
        width: 9em;
        height: 7em;
        padding: center;
    }

    .baladeThumbnail {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

</style>

