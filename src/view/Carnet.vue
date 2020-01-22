<template>
    <div>
        <BaladeCarnetBox v-for="balade in baladesCarnet" :balade="balade" :key="balade.name" />
        <LieuCarnetBox v-for="lieu in lieuxCarnet" :lieu="lieu" :key="lieu.name" />
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
                baladesCarnet: [],
                lieuxCarnet: []
            }
        },
        mounted: function(){
            if (localStorage.getItem('baladesCarnet')) {
                try {
                    this.baladesCarnet = JSON.parse(localStorage.getItem('baladesCarnet'));
                } catch(e) {
                    localStorage.removeItem('baladesCarnet');
                }
            }
            if (localStorage.getItem('lieuxCarnet')) {
                try {
                    this.lieuxCarnet = JSON.parse(localStorage.getItem('lieuxCarnet'));
                } catch(e) {
                    localStorage.removeItem('lieuxCarnet');
                }
            }
        },
        watch: {
            baladesCarnet(newBalade) {
                localStorage.baladesCarnet.push(newBalade);
            },
            lieuxCarnet(newLieu) {
                localStorage.lieuxCarnet.push(newLieu);
            }
        }
  
    }
</script>