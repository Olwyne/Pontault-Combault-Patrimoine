<template>
    <div>
        <div class="homeTitle">Découvrir<br />Pontault-Combault</div>
        <img class="homeImage" src="../img/home-image.jpg" />
        <div class="homeBody">
            <div class="d-flex">
                <img class="float-left logoAsso" src="../img/logo-asso.svg" />
                <div class="caseLine">Partez à la découverte du patrimoine historique et naturel de Pontault-Combault !</div>
            </div>
            <div class="homeText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .homeTitle {
        color: var(--darkbluePC);
        text-align: center;
        font-size: 1.6em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        line-height: 1.2em;
    }

    .homeImage {
        width: 100%;
    }

    .homeBody {
        margin: 1em 2em;
    }

    .logoAsso {
        width: 7em;
        margin-right: 0.5em;
    }

    .caseLine {
        text-align: center;
        margin: auto;
    }

    .homeText {
        margin-top: 0.5em;
    }
</style>

