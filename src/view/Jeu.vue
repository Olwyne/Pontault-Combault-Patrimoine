<template>
    <div>
        <div class="gameTitle">Découvre Pontault-Combault <br />avec Poco</div>
        <div class="text-center">
            <img class="gameImage" src="../img/poco-bientot.png" />
            </div>
            <div class="gameBody">
                <div class="gamePresentation">Poco te fait découvrir le ville en t'amusant. Au fil de ta balade tu débloqueras des quizz et des badges. </div>
                <div>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                    <div class="switchText">Faire la visite avec Poco</div>
                </div>
            </div>
        </div>
</template>

<script>
</script>

<style>
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

