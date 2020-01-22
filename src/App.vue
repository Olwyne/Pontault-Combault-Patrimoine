<template>
    <div>
        <div class="topPage sticky-top">
            <div class="pageTitle">{{ pageTitle }}</div>
            <Navigation @updatePage="changeCurrentContent" />
        </div>
        <component :is="activePage"></component> 
        <!-- il faudra prévoir que dans le component il peut y avoir une balade ou un lieu en cours de consultation -->
    </div>    
</template>

<script>
import myMap from "./components/map.vue";
import Backoffice from "./view/backoffice";
import Navigation from './view/Navigation'
import Accueil from './view/Accueil'
import VisiteLibre from './view/VisiteLibre'
import Balades from './view/Balades'
import Carnet from './view/Carnet'
import Lieu from './view/Lieu'
import Balade from './view/Balade'
export default {
    name: "app",
    components: {
        Navigation,
        Accueil,
        VisiteLibre,
        Balades,
        Carnet,
        Lieu,
        Balade
    },
    data: function () {
        return {
            activePage: 'Accueil',
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
        --catCulture:#E66F13;
        --catHistoire: #741d89 ;
        --catCulte:#A21414;
        --catNature: #539312;
        --catParc:#d9d217;
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
        padding-top: 0.3em;
    }
</style>