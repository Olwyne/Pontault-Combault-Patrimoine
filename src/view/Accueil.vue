<template>
    <div>
        <div class="homeTitle">Découvrir<br />Pontault-Combault</div>
        <img class="homeImage" src="../img/home-image.jpg" />
        <div class="homeBody">
            <div class="d-flex">
                <img class="float-left logoAsso" src="../img/logo-asso.svg" />
                <div class="caseLine">Partez à la découverte du patrimoine historique et naturel de Pontault-Combault !</div>
            </div>
            <div class="homeText">
                L'Association pour la protection du patrimoine de Pontault-Combault œuvre pour la sauvegarde et la valorisation du patrimoine de la ville.
                <br />Attachés à le faire connaître à chacun, nous avons développé cette application. Nous vous souhaitons de belles découvertes !
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style>
    .homeTitle {
        color: white;
        text-shadow: 1px 1px 9px rgba(0,0,0, 0.8);
        position: absolute;
        margin-left: 1em;
        text-shadow: 2px;
        font-size: 2em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        line-height: 1.2em;
        font-weight: 500;
    }

    .homeImage {
        width: 100%;
    }

    .homeBody {
        margin: 1em 1.5em;
    }

    .logoAsso {
        width: 5em;
        margin-right: 1em;
    }

    .caseLine {
        margin: auto;
        color: var(--darkbluePC);
        font-weight: 600;
    }

    .homeText {
        margin-top: 0.5em;
        color: var(--darkbluePC);
    }
</style>

