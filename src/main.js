import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps"


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBQFAqPoWAnJ9EReOUj5zwmmbpI4INM5gQ",
    libraries: "places"
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
