<template>
    <div>
        <BaladeCarnetBox v-for="balade in baladesCarnet" :balade="balade" :key="balade.title" />
        <LieuCarnetBox v-for="lieu in lieuxCarnet" :lieu="lieu" :key="lieu.title" />
    </div>
</template>

<script>
    import BaladeCarnetBox from '../components/BaladeBox'
    import LieuCarnetBox from '../components/LieuCarnetBox'
    export default {
        components: {
            BaladeCarnetBox,
            LieuCarnetBox
        },
        data: function () {
            return {
                baladesCarnet: [
                    {
                        imagePath : './15a-CPA.jpg',
                        title: 'le titre balade carnet 1',
                        distance: '5km',
                        duration: '1h'
                    },
                    {
                        imagePath : './15a-CPA.jpg',
                        title: 'le titre balade carnet 2',
                        distance: '8km',
                        duration: '2h'
                    }
                ],
                lieuxCarnet: [
                    {
                        imagePath : './home-image.jpg',
                        title: 'le titre lieu 1'
                    },
                    {
                        imagePath : './home-image.jpg',
                        title: 'le titre lieu 2'
                    }
                ]
            }
        }
    }
</script>