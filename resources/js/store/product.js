
const state = {
    products: []
}

const mutations = {
    setProducts(state, payload) {
        state.products = payload
    },
}

const actions = {
    async getAllProducts({ commit, state }) {
        const response = await axios.get('/admin/product');
        if (response && response.data.status == 200) {
            commit('setProducts', response.data.data);
        }
        return response;
    },

    async getProducts({ commit, state }) {
        const response = await axios.get('/member/get-products');
        if (response && response.data.status == 200) {
            commit('setProducts', response.data.data);
        }
        return response;
    },

    async storeProduct({ commit }, payload) {
        const response = await axios.post(`/admin/product`, payload)
        return response
    },

    async updateProduct({ commit, state }, payload) {
        const response = await axios.put(`/admin/product/${payload.id}`, payload)
        return response;
    },

    async deleteProduct({ commit }, payload) {
        const response = await axios.delete(`/admin/product/${payload}`)
        return response
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
