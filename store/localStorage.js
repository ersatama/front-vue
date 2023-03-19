export const state = () => ({
    user: null,
})

export const mutations = {
    setUser(state, value) {
        state.user = value
    }
}

export const actions = {
    async portalProject_firstById({commit}, id) {
        const res = await this.$repository.portalProject.firstById(id);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_get({commit}, page) {
        const res = await this.$repository.portalProject.get(page);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return {
            count: 0,
            data: []
        };
    },
    async user_firstById({commit}, id) {
        const res = await this.$repository.user.firstById(id);
        const { status, data } = res
        if (status === 200) {
            return data.data;
        }
        return null;
    },
    async user_auth({commit}, info) {
        const res = await this.$repository.user.auth(info);
        const { status, data } = res
        if (status === 200) {
            commit('setUser', data.data);
            return true;
        }
        return false;
    },
}