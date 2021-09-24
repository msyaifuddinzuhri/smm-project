import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Import modules
import member from './member'
import auth from './auth'
import product from './product'
import order from './order'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        member,
        product,
        order
    },
  plugins: [createPersistedState()]
})
