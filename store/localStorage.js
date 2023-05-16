export const state = () => ({
    user: null,
    portalProjectTypes: [],
    portalProjectFilter: null,
    sidebar: true,
    statuses: null
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
    },
    setStatuses(state, value) {
        state.statuses  =   value;
    }
}

export const actions = {
    async scanStat_getScanStat({commit}, payload){
        const res = await this.$repository.scanStat.getScanStat(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async serverTesterLog_getServerTesterLog({commit}, payload){
        const res = await this.$repository.serverTesterLog.getServerTesterLog(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProp_getProjectStatusesByProjectId({commit}, projectId){
        const res = await this.$repository.portalProp.getProjectStatusesByProjectId(projectId);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async rawbase_getWhere({commit}, payload){
        const res = await this.$repository.rawbase.getWhere(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async scanReportRawMaster_getByProjectId({commit}, payload) {
        const res = await this.$repository.scanReportRawMaster.getByProjectId(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async scanNeuronJob_getByProjectId({commit}, id) {
        const res = await this.$repository.scanNeuronJob.getByProjectId(id);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async projsoft_getSoftVulnByProjectId({commit}, payload){
        const res = await this.$repository.projsoft.getSoftVulnByProjectId(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalJitReport_getWhere({commit}, payload){
        const res = await this.$repository.portalJitReport.getWhere(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalTicket_getWhere({commit}, payload){
        const res = await this.$repository.portalTicket.getWhere(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async auditorTask_getWhere({commit}, payload) {
        const res = await this.$repository.auditorTask.getWhere(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async scanJob_getByProjectId({commit}, projectId){
        const res = await this.$repository.scanJob.getByProjectId(projectId);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async scanNeuronJob_getJobsByProjectId({commit}, projectId) {
        const res = await this.$repository.scanJob.getJobsByProjectId(projectId);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
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
    async user_updateById({commit}, payload){
        const res = await this.$repository.user.updateById(payload);
        const { status, data } = res
        if (status === 200) {
            commit('setUser', data.data);
            return true;
        }
        return false;
    },
    async user_auth({commit}, payload) {
        const res = await this.$repository.user.auth(payload);
        const { status, data } = res
        if (status === 200) {
            commit('setUser', data.data);
            return true;
        }
        return false;
    },
    async portalProject_search({commit}, payload) {
        const res = await this.$repository.portalProject.search(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_getAlertsByAuditorUser({commit}, user){
        const res = await this.$repository.portalProject.getAlertsByAuditorUser(user);
        const { status, data } = res
        if (status === 200) {
            commit('setStatuses', data);
        }
    }
}