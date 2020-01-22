<template>
    <div class="placeFooter fixed-bottom nav nav-fill">
        <div class="nav-item">
            <img src="../img/back-white.svg" />
            <div>Retour</div>
        </div>
        <div class="nav-item">
            <img src="../img/route-white.svg" />
            <div>M'y rendre</div>
        </div>
        <div class="nav-item">
            <img src="../img/heart-empty-white.svg" />
            <div>Sauvegarder</div>
        </div>
    </div>
</template>

<script>
    export default {
        
        name:'PlaceFooter',
        data: function () {
                return {
                       
                }
            }
    }
</script>

<style>
.placeFooter {
    background-color: var(--bluePC);
    color: white;
    padding:0;
}

    .placeFooter img {
        height: 2.2rem;
    }

    .placeFooter .nav-item {
        display: block;
        padding: .5rem 0rem;
        width: 33.3%
    }
</style>

