<template>
    <div id="appContainer">
        <div class="topPage sticky-top">
            <div class="pageTitle d-flex justify-content-center"><div class="centerPageTitle">{{ getActiveTitle }}</div></div>
            <Navigation />
        </div>
        <UpdateNotification />
        <component :is="this.getActivePage"  :walk="walk" :lieu="lieu"></component>
    </div>
</template>

<script>
import Navigation from './view/Navigation'
import Accueil from './view/Accueil'
import VisiteLibre from './view/VisiteLibre'
import Balades from './view/Balades'
import Carnet from './view/Carnet'
import Lieu from './view/Lieu'
import Balade from './view/Balade'
import Jeu from './view/Jeu'
import UpdateNotification from './components/UpdateNotification'

    import { mapActions, mapGetters } from 'vuex'


    //Pour test
    import Question from './components/Question'
    import QuestionResult from './components/QuestionResult'

export default {
    name: "app",
        components: {
        Navigation,
        Accueil,
        VisiteLibre,
        Balades,
        Carnet,
        Lieu,
        Balade,
        Jeu,
         UpdateNotification,


        //pour tests
        Question,
        QuestionResult
    },
    data: function () {
        return {
            //activePage:  'Accueil',

            // pour test
            activePage: 'QuestionResult',


            pageTitle: 'Accueil',
            walk:null,
            lieu: null,
        }
    },
    methods: {
        ... mapActions([
                'addLocationToStore',
                'setActivePage',
                'addWalkToStore',
                'setActiveTitle'
        ]),
    },
    computed:{
            ... mapGetters([
                'getActivePage',
                'getActiveTitle'
            ]),
    },
	mounted: function(){
            this.setActivePage(this.activePage)
            this.setActiveTitle(this.pageTitle)
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
                   
                } catch(e) {
                    localStorage.removeItem('StorageWalk');
                }
            }

        this.$nextTick(() => {
             if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
            let  elem=document.getElementById("appContainer")
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
            screen.orientation.lock("portrait");
        }         
		});
           
    }
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