require('./bootstrap');

import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './utils/vuetify'
import axios from 'axios'


Vue.use(Notifications)
Vue.component('pagination', require('laravel-vue-pagination'));

axios.defaults.baseURL = 'http://localhost:8000/api/v1/'
axios.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
Vue.config.productionTip = false
Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    render: h => h(App),
});
