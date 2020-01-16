import Vue from 'vue'
import App from './App.vue'
import "./plugins/vue2-leaflet";
// import "./plugins/firebase";
// import "./plugins/vuefire";

import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
