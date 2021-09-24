
const state = {
    members: []
}

const mutations = {
    setMembers(state, payload) {
        state.members = payload
    },
    setUpdateMember(state, payload) {
        const newMembers = [...state.members]
        newMembers.splice(payload.index, 1)
        newMembers.splice(payload.index, 0, payload.data)
        state.members = newMembers
    },
}

const actions = {
    async getAllMembers({ commit, state }) {
        const response = await axios.get('/admin/member');
        if (response && response.data.status == 200) {
            commit('setMembers', response.data.data);
        }
        return response;
    },

    async updateBalance({ commit, state }, payload) {
        const response = await axios.put(`/admin/member/${payload.id}`, payload)
        return response;
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
