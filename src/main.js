import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "./plugins/vue2-leaflet";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Vue from 'vue'
import App from './App.vue'
// import "./plugins/firebase";
// import "./plugins/vuefire";

import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')