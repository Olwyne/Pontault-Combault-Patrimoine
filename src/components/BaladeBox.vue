<template>
    <div class="">
        <a>
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="balade.imagePath" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{ balade.title }}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                            <div><img src="../img/distance-blue.svg" /></div>
                            <div class="align-self-end km">{{ balade.distance }}</div>
                        </div>
                        <div class="baladeDuration d-flex">
                            <div><img src="../img/chronometer-blue.svg" /></div>
                            <div class="align-self-end duration">{{ balade.duration }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>

</template>

<script>
    export default {
        name:'BaladeBox',
        props:['balade'],
    }
</script>

<style>
    .baladeBox {
    margin: 1em;
}

.thumbnailSize {
    width: 9em;
    height: 7em;
    padding: 0;
}

.baladeThumbnail {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.baladeInfo {
    color: var(--darkbluePC);
}

.baladeDistance .km, .baladeDuration .duration {
    padding-left: 0.3em;
    padding-right: 0.3em;
}

.baladeDistance img, .baladeDuration img, .delete img {
    height: 1.5em;
}

.duration, .km {
    line-height: 1em;
}
</style>