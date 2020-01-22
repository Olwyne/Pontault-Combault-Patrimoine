<template>
    <div>
        <div class="placeContainer">
            <div class="placeTitle">{{ title }}</div>
            <div class="text-center">
                <img class="placeImage" v-bind:src="imagePath" />
            </div>
            <div class="placeBody">
                <div class="placeAddress">{{ address }}</div>
                <div class="placeText">{{ description }}</div>
            </div>
        </div>
        <PlaceFooter />
    </div>
</template>

<script>
    import PlaceFooter from '../components/PlaceFooter'
    export default {
        name: 'Lieu',
        components: {
            PlaceFooter
        },
        data: function () {
            return {
                imagePath: './home-image.jpg',
                title: 'le titre du lieu 1',
                address: '66 rue adresse 1, 77340 Pontault-Combault',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, '
            }
        }
    }
</script>

<style>
    .placeContainer {
    margin-bottom:6em;
}
.placeTitle {
    color: var(--darkbluePC);
    text-align: center;
    font-size: 1.3em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    line-height: 1.2em;
    padding-right: 1em;
    padding-left: 1em;
}

.placeImage {
    text-align: center;
    max-height: 17em;
    max-width: 100%;
}

.placeBody {
    color: var(--darkbluePC);
    margin: 1em;
}

.placeAddress {
    margin: 1em;
}
</style>

