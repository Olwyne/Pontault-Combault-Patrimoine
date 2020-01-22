<template>
    <div>
        <div class="marginFooter">
        <div class="baladeMap"></div>
        <div class="baladeContainer">
            <div class="placeTitle">{{ title }}</div>
            <div class="d-flex justify-content-center">
                <div class="baladeDistance d-flex justify-content-center">
                    <div class="align-self-end"><img src="../img/distance-blue.svg" /></div>
                    <div class="align-self-end km">{{ distance }}</div>
                </div>
                <div class="baladeDuration d-flex justify-content-center">
                    <div class="align-self-end"><img src="../img/chronometer-blue.svg" /></div>
                    <div class="align-self-end duration">{{ duration }}</div>
                </div>
            </div>
        </div>
        <div class="lieuxList">
            <!-- mettre le lien du lieu dans le src suivant -->
            <div>Sur le parcours :</div>
            <a src=""  v-for="lieuBalade in lieuxBalade">- {{ lieuBalade.name }}</a>
        </div>
        <div class="placeBody">
            <div class="placeText">{{ description }}</div>
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
        data: function () {
            return {
                imagePath: './home-image.jpg',
                title: 'le titre de la balade 1',
                duration: '3h00',
                distance: '11km',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ',
                lieuxBalade: [
                    { name: 'château du bois de la croix'},
                    { name: 'parc de la madelein'},
                    {name:  'abreuvoir des vaches'},
                    {name: 'la vieille gare vintage'}
                ]
            }
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

</style>

