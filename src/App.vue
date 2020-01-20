<template>
    <div>
        <div class="topPage">
            <div class="pageTitle">{{ pageTitle }}</div>
            <Navigation @updatePage="changeCurrentContent" />
        </div>
        <component :is="activePage"></component> 
        <!-- il faudra prévoir que dans le component il peut y avoir une balade ou un lieu en cours de consultation -->
    </div>
</template>

<script>
    import Navigation from './view/Navigation'
    import Accueil from './view/Accueil'
    import VisiteLibre from './view/VisiteLibre'
    import Balades from './view/Balades'
    import Carnet from './view/Carnet'
    import Lieu from './view/Lieu'
    export default {
        name: "app",
        components: {
            Navigation,
            Accueil,
            VisiteLibre,
            Balades,
            Carnet,
            Lieu
        },
        data: function () {
            return {
                // décommenter en fin de test
                //activePage: 'Accueil',

                // supprimer en fin de test
                activePage: 'Lieu',

                pageTitle: 'Accueil'
            }
        },
        methods: {
            changeCurrentContent(destination) {
                this.activePage = destination
                if (this.activePage === "Accueil") {
                    this.pageTitle = "Accueil"
                }
                if (this.activePage === "Balades") {
                    this.pageTitle = "Balades"
                }
                if (this.activePage === "VisiteLibre") {
                    this.pageTitle = "Visite libre"
                }
                if (this.activePage === "Carnet") {
                    this.pageTitle = "Carnet de visite"
                }
            }
            
        }

    }
</script>

<style>
    :root {
        --bluePC: #5b9bd5;
        --darkbluePC: #44546a;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
    }

    .topPage {
        background-color: var(--bluePC);
    }

    .pageTitle {
        color: white;
        text-align: center;
        font-size: 1.5rem;
        padding-top: 0.5em;
        padding-bottom: 0.4em;
    }
</style>