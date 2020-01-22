<template>
    <div>
        <BaladeBox v-for="balade in balades" :balade="balade" :key="balade.title"/>
    </div>
</template>

<script>
    import BaladeBox from '../components/BaladeBox'
    export default {
        components: {
            BaladeBox
        },
        data: function () {
            return {
                balades: [
                    {
                        imagePath : './15a-CPA.jpg',
                        title: 'le titre 1',
                        distance: '5km',
                        duration: '1h'
                    },
                    {
                        imagePath : './15a-CPA.jpg',
                        title: 'le titre 2',
                        distance: '8km',
                        duration: '2h'
                    }
                ]
            }
        }
    }
</script>