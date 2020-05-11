<template>
        <!--<div>Cette application est disponible uniquement sur mobile et tablette.</div>
        <a href="https://www.pontault-combault-patrimoine.fr/">Retourner vers le site de l'association</a>-->
        <div>
            <b-modal v-model="modalShow" centered hide-footer hide-header size="lg"  no-close-on-backdrop>
                <div class="text-center">
                    <div>L'application Découvrir Pontault-Combault est disponible uniquement sur mobile et tablette.</div>
                    <a href="https://www.pontault-combault-patrimoine.fr/">Aller vers le site de l'association</a>
                </div>
            </b-modal>
        </div>
</template>

<script>
export default {
    name: "PopUpAccessibilite",
        data: function () {
            return {
                modalShow: false,
            }
        },
        slots: {

            },
        mounted: function(){
            this.$nextTick(() => {
                if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
                ){
                    this.modalShow=false;
                }
                else{
                    this.modalShow=true;
                }   
            })
        }
}
</script>

<style>
    .myModal {
        z-index:1031;
    }
</style>