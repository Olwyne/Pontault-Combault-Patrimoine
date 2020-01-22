<template>
    <div>
        <div class="categoriesBar">
            <ul class="nav nav-fill">
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatCulture" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />

                    </svg>
                    </div>
                    <div>Culture</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatHistoire" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />

                    </svg>
                    </div>
                    <div>Histoire</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatCulte" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div>Culte</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatNature" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div>Nature</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link">
                        <svg version="1.1" class="icon-cat" x="0px" y="0px"
                             viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path class="colorCatParc" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />



                    </svg>
                    </div>
                    <div>Parc</div>
                </li>
            </ul>
        </div>
        <div class="visiteMap">
            <img src="../img/map-test.png" />
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
            }
        },
        methods: {

        }
    }
</script>

<style>
    .categoriesBar {
        color: var(--darkbluePC);
    }

    .icon-cat {
        height: 2.3em;
    }

    .colorCatCulture {
        fill: var(--catCulture);
    }

    .colorCatHistoire {
        fill: var(--catHistoire);
    }

    .colorCatCulte {
        fill: var(--catCulte);
    }

    .colorCatNature {
        fill: var(--catNature);
    }

    .colorCatParc {
        fill: var(--catParc);
    }

    /*.visiteMap {
        height: 30.5em;
    }*/

        .visiteMap img {
            width: 100%;
            height: 100%;
        }
</style>