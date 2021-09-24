const state = {
    isLoggedIn: false,
    isAdmin: false,
    user: {},
    token: null
}

const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },
    setUser(state, payload) {
        state.user = payload
    },
    setUserBalance(state, payload) {
        state.user.balance = payload
    },
    setToken(state, payload) {
        state.token = payload
    },
    setIsAdmin(state, payload) {
        state.isAdmin = payload
    },
}

const actions = {
    async getProducts({ commit }) {
        const response = await axios.get('/member/get-products');
        return response
    },
    async updateBalance({ commit, state }, payload) {
        const newBalance = state.user.balance - payload
        commit('setUserBalance', newBalance)
        return response
    },
    async memberLogin({ commit, state }, payload) {
        const response = await axios.post('/member/login', payload);
        if (response && response.data.status == 200) {
            commit('setUser', response.data.data.user)
            commit('setToken', response.data.data.token)
            commit('setIsLoggedIn', true)
            localStorage.setItem('token', state.token)
            localStorage.setItem('is_admin', false)
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        }
        return response
    },
    async memberLogout({ commit, state }) {
        const response = await axios.post('/member/logout');
        if (response && response.data.status == 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('is_admin');
            commit('setUser', {})
            commit('setToken', null)
            commit('setIsLoggedIn', false)
            commit('setIsAdmin', false)
            delete axios.defaults.headers.common['Authorization']
        }
        return response
    },
    async adminLogout({ commit, state }) {
        const response = await axios.post('/admin/logout');
        if (response && response.data.status == 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('is_admin');
            commit('setUser', {})
            commit('setToken', null)
            commit('setIsLoggedIn', false)
            commit('setIsAdmin', false)
            delete axios.defaults.headers.common['Authorization']
        }
        return response
    },
    async adminLogin({ commit, state }, payload) {
        const response = await axios.post('/admin/login', payload);
        if (response && response.data.status == 200) {
            commit('setUser', response.data.data.user)
            commit('setToken', response.data.data.token)
            commit('setIsLoggedIn', true)
            commit('setIsAdmin', true)
            localStorage.setItem('token', state.token)
            localStorage.setItem('is_admin', true)
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        }
        return response
    },
    async memberRegister({ commit, state }, payload) {
        const response = await axios.post('/member/register', payload);
        return response
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
