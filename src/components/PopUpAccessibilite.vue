<template>
        <!--<div>Cette application est disponible uniquement sur mobile et tablette.</div>
        <a href="https://www.pontault-combault-patrimoine.fr/">Retourner vers le site de l'association</a>-->
        <div>
            <b-modal v-model="modalShow" centered title="BootstrapVue" hide-footer hide-header size="lg">
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
                modalShow: true,
            }
        },
        slots: {

            }
}
</script>

<style>
    .myModal {
        z-index:1031;
    }
</style>