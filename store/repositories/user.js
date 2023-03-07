export const state = () => ({
    user: null,
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    async firstById({commit}, id) {
        const res = await this.$repository.user.firstById(id);
        const { status, data } = res
        if (status === 200) {
            commit('setUser', data)
        } else {
            commit('setUser', null)
        }
    },
    async auth({commit}, info) {
        const res = await this.$repository.user.auth(info);
        const { status, data } = res
        if (status === 200) {
            commit('setUser', data)
        } else {
            commit('setUser', null)
        }
    },
}