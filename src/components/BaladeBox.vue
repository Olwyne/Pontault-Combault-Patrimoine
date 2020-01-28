<template>
    <div class="" @click="updatePage('Balade', balade)">
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="balade.photos" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{ balade.name }}</div>
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
    </div>

</template>

<script>
    export default {
        name:'BaladeBox',
        props:['balade'],
        methods:{
            updatePage: function (location,balade) {
                const datas={
                    location: location,
                    walk:balade
                }
                this.$emit('updatePage', datas)
            },
        }
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
    padding-right: 0;
}

.baladeDistance .km, .baladeDuration .duration {
    padding-left: 0.3em;
}

.baladeDistance img, .baladeDuration img, .delete img {
    height: 1.5em;
}

.duration, .km {
    line-height: 1em;
}
</style>