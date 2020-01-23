<template>
    <div class="navigation">
        <ul class="nav nav-fill">
            <li class="nav-item">
                <a class="nav-link" @click="setActivePage('Accueil'),activePage='Accueil'">
                    <svg class="icon-nav" version="1.1"  x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path :class="activePage==='Accueil'?'colorNavActive':'colorNavDefault'" d="M9.6,23.8v-6.3h4.7v6.3h5.9V12.7h3.5L12,0.3L0.2,12.7h3.5v11.1H9.6z" />
                    </svg>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="setActivePage('VisiteLibre'),activePage='VisiteLibre'">
                    <svg version="1.1" class="icon-nav" x="0px" y="0px"
                         viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                        <path :class="activePage==='VisiteLibre'?'colorNavActive':'colorNavDefault'" d="M12,0.2c-4.6,0-8.3,3.7-8.3,8.3c0,6.2,8.3,15.3,8.3,15.3s8.3-9.1,8.3-15.3C20.3,3.9,16.6,0.2,12,0.2z M12,11.4
	                        c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9S13.6,11.4,12,11.4z" />
                    </svg>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="setActivePage('Balades'),activePage='Balades'">
                    <svg class="icon-nav" version="1.1" x="0px" y="0px" viewBox="0 0 463.5 463.5" style="enable-background:new 0 0 463.5 463.5;" xml:space="preserve">
                    <g>
                    <path :class="activePage==='Balades'?'colorNavActive':'colorNavDefault'" d="M246.4,78.5c21.7,0,39.3-17.6,39.3-39.3c0-21.7-17.6-39.2-39.3-39.2c-21.7,0-39.2,17.6-39.2,39.2
		C207.2,60.9,224.8,78.5,246.4,78.5z" />
                    <path :class="activePage==='Balades'?'colorNavActive':'colorNavDefault'"  d="M386.6,202.9c0-11.2-9.1-20.3-20.3-20.3h-68.5l-38.6-54.8l0.1-0.9c1.4-10.5-1.5-21.1-7.9-29.4
		c-6.4-8.4-15.9-13.9-26.4-15.2c-11.6-1.5-22.6,2.2-30.9,9.2V45.8c0-7.8-6.4-14.2-14.2-14.2h-39.4c-7.9,0-14.2,6.4-14.2,14.2v169
		c0,20.7,15.8,37.5,36,39.4l-3,7.1l-23.9,90.1l-53.7,72.2c-8,10.8-5.8,26,5,34c4.3,3.2,9.4,4.8,14.5,4.8c7.4,0,14.7-3.4,19.5-9.8
		l56.5-75.9c1.9-2.5,3.2-5.3,4-8.3l16.3-61.4l44.5,40.9l-6.1,88.6c-0.9,13.4,9.2,25,22.6,25.9c0.6,0,1.1,0.1,1.7,0.1
		c12.7,0,23.3-9.8,24.2-22.6l6.9-100.3c0.5-7.4-2.4-14.6-7.8-19.6l-46-42.2l14-90.6l19.3,27.4c3.8,5.4,10,8.6,16.6,8.6h70.9
		l1.3,232.3c0,4.5,3.6,8.1,8.1,8.1c4.5,0,8.1-3.6,8.1-8.1l-1.3-234C381.6,218.2,386.6,211.1,386.6,202.9z" />

</g>
</svg>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="setActivePage('Carnet'),activePage='Carnet'">
                    <svg version="1.1" class="icon-nav" x="0px" y="0px"
                         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g>
                         <path :class="activePage==='Carnet'?'colorNavActive':'colorNavDefault'" d="M150,240.1H392V90H150V240.1z M180.1,120h181.9v30H180.1V120z M180.1,180.1h181.9v30H180.1V180.1z" />
                        <path :class="activePage==='Carnet'?'colorNavActive':'colorNavDefault'" d="M60,0v30H30v30h30v30.3H30v30h30v30.3H30v30h30v30.3H30v30h30v30.3H30v30h30v30.3H30v30h30v30.3H30v30h30V452
		H30v30h30v30H482V0L60,0z M120,270.1V60H422v210.1H120z" />
</g>
</svg>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex'

    export default {
        data: function () {
            return {
               activePage: 'Accueil'
            }
        },
        methods: {
            ... mapActions([
                'setActivePage'
          ]),
        },
        mounted: function(){
             this.activePage=this.getActivePage
        },
         computed:{
            ... mapGetters([
                'getActivePage'
            ])
        },
    }
</script>

<style>
    .navigation {
        height:50%;
    }

    .topPage ul{
       height:100%;
    }

    .topPage .nav-item{
        height:100%;
    }

    .topPage .nav-link {
        height:100%;
    }

    .topPage .nav {
        padding-bottom: 0.2em;
    }

    .icon-nav {
        height: 100%;
    }

   .colorNavDefault {
        fill: #44546A;
    }

      .colorNavActive {
        fill: white;
    }

    .st1 {
        fill: none;
    }
</style>