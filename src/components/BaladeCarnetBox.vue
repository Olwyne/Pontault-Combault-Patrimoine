<template>
    <div>
        <a>
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="baladeCarnet.imagePath" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{ baladeCarnet.title }}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                            <div><img src="img/distance-blue.svg" /></div>
                            <div class="align-self-end km">{{ baladeCarnet.distance }}</div>
                        </div>
                        <div class="baladeDuration d-flex">
                            <div><img src="img/chronometer-blue.svg" /></div>
                            <div class="align-self-end duration">{{ baladeCarnet.duration}}</div>
                        </div>
                        <div class="delete"><img src="../img/garbage-blue.svg" /></div>
                    </div>
                </div>
            </div>
        </a>
    </div>

</template>

<script>
    export default {
        name:'BaladeCarnetBox',
        props:['baladeCarnet'],
    }
</script>