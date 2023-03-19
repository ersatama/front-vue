export const state = () => ({

})

export const mutations = {
    setPortalProject(state, portalProject) {
        state.portalProjects = portalProject
    }
}

export const actions = {
    async firstById(id) {
        const res = await this.$repository.portalProject.firstById(id);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async get(page) {
        const res = await this.$repository.portalProject.get(page);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
}