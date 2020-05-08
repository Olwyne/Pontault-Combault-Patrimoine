<template>
    <div>
        <div class="gameTitle">Découvre Pontault-Combault <br />avec Poco</div>
        <div class="text-center">
            <img class="gameImage" src="../img/poco-jeu.png" />
            </div>
        <div class="gameBody">
            <div>
                <label class="switch">
                    <input type="checkbox" v-model="toggle" true-value="true" false-value="false" @click="check()">
                    <span class="slider round"></span>
                </label>
                <div class="switchText">Faire la visite avec Poco</div>
            </div>
            <div class="gamePresentation">
                Poco te fait découvrir la ville en t'amusant. Active le jeu grâce au bouton ci-dessus puis rends-toi sur la carte
                <span>
                    <svg version="1.1" class="game-icon-map" x="0px" y="0px"
                         viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<path d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />

                    </svg>
                </span>.
                <br><br> Une notification apparaîtra si tu es à proximité d'un lieu pour lequel il existe un quizz Poco. Tu apprendras alors des faits et anectotes sur les lieux insolites de Pontault-Combault.
            </div>
        </div>
        </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

  export default {

    data () {
      return {
          toggle:true
      };
    },
    methods: {
        ... mapActions([
            'setGameState'
        ]),
        check(){
           if(this.toggle=="true"){
               this.setGameState(false)
               this.storeGame()
           }
           else if(this.toggle=="false"){
                this.setGameState(true)
                this.storeGame()
           }
        },
        storeGame(){
            const parsed = JSON.stringify(this.getGameState); 
            localStorage.setItem('GameState', parsed);
        },
    },
    mounted() {
        if (localStorage.getItem('GameState')) {
                try {
                    this.setGameState(JSON.parse(localStorage.getItem('GameState')))
                } catch(e) {
                    localStorage.removeItem('GameState');
                }
        }
        else{
            this.storeGame()
        }
        if(this.getGameState==true){
            this.toggle="true";
        }
        else{
            this.toggle="false";
        }
    },
    computed:{
        ... mapGetters([
            'getGameState'
        ])
    },
};

</script>

<style>
    .game-icon-map {
        height: 1.2em;
    }

    .gameTitle {
        color: var(--darkbluePC);
        text-align: center;
        font-size: 1.3em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        line-height: 1.2em;
        font-weight:500;
    }

    .gameImage {
        max-height: 17em;
        max-width: 100%;
    }

    .gameBody {
        margin: 1em 2em;
        color: var(--darkbluePC);
    }

    .gameBody label {
        margin: 0;
    }

    .gamePresentation {
        margin: 1em 0;
    }

    .switchText {
        margin-left: 1em;
        display: inline-block;
    }


    .switch {
        position: relative;
        display: inline-block;
        width: 3em;
        height: 100%;
    }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

        .slider:before {
            position: absolute;
            content: "";
            height: 1.5em;
            width: 1.5em;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border: solid #ccc;
        }

    input:checked + .slider {
        background-color: var(--bluePC);
    }

        input:checked + .slider:before {
            -webkit-transform: translateX(1.5em);
            -ms-transform: translateX(1.5em);
            transform: translateX(1.5em);
            border: solid var(--bluePC);
            ;
        }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

        .slider.round:before {
            border-radius: 50%;
        }
</style>

