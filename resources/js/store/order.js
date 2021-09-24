
const state = {
    orders: []
}

const mutations = {
    setOrders(state, payload) {
        state.orders = payload
    },
}

const actions = {
    async getAllOrders({ commit, state }) {
        const response = await axios.get('/admin/order');
        if (response && response.data.status == 200) {
            commit('setOrders', response.data.data);
        }
        return response;
    },
    async memberOrder({ commit, state }, payload) {
        const response = await axios.post('/member/new-order', payload);
        return response;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
