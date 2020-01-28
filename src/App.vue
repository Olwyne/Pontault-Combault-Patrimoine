<template>
    <div>
        <!--<div class="topPage sticky-top">
            <div class="pageTitle d-flex justify-content-center"><div class="centerPageTitle">{{ pageTitle }}</div></div>
            <Navigation />
        </div>
        <component :is="this.getActivePage"  :walk="walk" :lieu="lieu"></component>-->
       <Backoffice />
      <!--<myMap />--> 
    </div>
</template>

<script>
import Backoffice from "./view/backoffice";
import Navigation from './view/Navigation'
import Accueil from './view/Accueil'
import VisiteLibre from './view/VisiteLibre'
import Balades from './view/Balades'
import Carnet from './view/Carnet'
import Lieu from './view/Lieu'
import Balade from './view/Balade'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "app",
        components: {
        Backoffice,
        Navigation,
        Accueil,
        VisiteLibre,
        Balades,
        Carnet,
        Lieu,
        Balade,
        Backoffice
    },
    data: function () {
        return {
            activePage: 'Accueil',
            pageTitle: 'Accueil',
            walk:null,
            lieu: null,
        }
    },
    methods: {
        ... mapActions([
                'addLocationToStore',
                'setActivePage',
                'addWalkToStore'
        ]),
		changeCurrentContent(props) {
			this.activePage = this.getActivePage
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
			if (this.activePage === "Balade") {
				this.walk = props.walk
				this.pageTitle = "Balade"
			}
			if (this.activePage === "Lieu") {
				this.lieu = props.lieu
				this.pageTitle = "Lieu"
			}
		}
    },
    computed:{
            ... mapGetters([
                'getActivePage'
            ]),
    },
	mounted: function(){
            this.setActivePage(this.activePage)
            if (localStorage.getItem('StorageLocations')) {
                try {
                    const lieuxCarnet = JSON.parse(localStorage.getItem('StorageLocations'));
                    lieuxCarnet.forEach(lieu => {
                         this.addLocationToStore(lieu)
                    });
                   
                } catch(e) {
                    localStorage.removeItem('StorageLocations');
                }
            }
            if (localStorage.getItem('StorageWalk')) {
                try {
                    const walkCarnet = JSON.parse(localStorage.getItem('StorageWalk'));
                    walkCarnet.forEach(walk => {
                         this.addWalkToStore(walk)
                    });
                    console.log(walkCarnet)
                   
                } catch(e) {
                    localStorage.removeItem('StorageWalk');
                }
            }         
    },
}
</script>

<style>
    :root {
        --bluePC: #5b9bd5;
        --darkbluePC: #44546a;
        --catCulture: #E66F13;
        --catHistoire: #741d89;
        --catCulte: #A21414;
        --catNature: #539312;
        --catParc: #d9d217;
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
        height: 14vh;
    }

    .pageTitle {
        color: white;
        text-align: center;
        font-size: 1.3rem;
        height: 50%;
        position: relative;
    }

    .centerPageTitle {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>