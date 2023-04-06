export const state = () => ({
    user: null,
    portalProjectTypes: [],
    portalProjectFilter: null,
    sidebar: true,
})

export const mutations = {
    sidebar(state) {
        state.sidebar = !state.sidebar;
    },
    setUser(state, value) {
        state.user = value
    },
    setPortalProjectTypes(state, value) {
        state.portalProjectTypes    =   value;
    },
    setPortalProjectFilter(state, value) {
        state.portalProjectFilter   =   value
    }
}

export const actions = {
    async portalProjectType_get({commit}) {
        const res = await this.$repository.portalProjectType.get();
        const { status, data } = res
        if (status === 200) {
            commit('setPortalProjectTypes', data.data);
            return true;
        }
        return false;
    },
    async portalProject_filter({commit}) {
        const res = await this.$repository.portalProject.filter();
        const { status, data } = res
        if (status === 200) {
            commit('setPortalProjectFilter', data.data);
        }
    },
    async portalProject_linksById({commit}, id) {
        const res = await this.$repository.portalProject.linksById(id);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_firstById({commit}, id) {
        const res = await this.$repository.portalProject.firstById(id);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_get({commit}, payload) {
        const res = await this.$repository.portalProject.getWhere(payload);
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