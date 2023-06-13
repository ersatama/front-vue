export const state = () => ({
    menu: 1,
    user: null,
    portalProjectTypes: [],
    portalProjectFilter: null,
    sidebar: true,
    statuses: null,
    details: true,
    serverAvailability: true,
    projectStatistics: true,
    jobStatuses: true,
    additionalApplicationUrls: true,
    additionalInformation: true,
    projectSettings: true,
    projectSCA: true,
    projectApplicationEvaluation: true,
    projectOwaspGroup: true,
    projectAlertSettings: true,
    projectInternalComment: true,
    projectReportParams: true,
    projectQA: true,
    projectAlert: true,
    projectStats: true,
    projectPrivateData: true,
    projectAuditorsTimeTracking: true,
    projectDDOSSustainability: true,
    projectVPNConfiguration: true,
    projectOsint: true,
})

export const mutations = {
    toggleProjectOsint(state) {
        state.projectOsint  =   !state.projectOsint;
    },
    toggleProjectVPNConfiguration(state) {
        state.projectVPNConfiguration    =   !state.projectVPNConfiguration;
    },
    toggleProjectDDOSSustainability(state) {
        state.projectDDOSSustainability    =   !state.projectDDOSSustainability;
    },
    toggleProjectAuditorsTimeTracking(state) {
        state.projectAuditorsTimeTracking    =   !state.projectAuditorsTimeTracking;
    },
    toggleProjectPrivateData(state) {
        state.projectPrivateData    =   !state.projectPrivateData;
    },
    toggleProjectStats(state) {
        state.projectStats  =   !state.projectStats;
    },
    toggleProjectAlert(state) {
        state.projectAlert  =   !state.projectAlert;
    },
    toggleProjectQA(state) {
        state.projectQA =   !state.projectQA;
    },
    toggleProjectReportParams(state) {
        state.projectReportParams   =   !state.projectReportParams;
    },
    toggleProjectInternalComment(state) {
        state.projectInternalComment  =   !state.projectInternalComment;
    },
    toggleProjectAlertSettings(state) {
        state.projectAlertSettings  =   !state.projectAlertSettings;
    },
    toggleProjectOwaspGroup(state) {
        state.projectOwaspGroup  =   !state.projectOwaspGroup;
    },
    toggleProjectApplicationEvaluation(state) {
        state.projectApplicationEvaluation  =   !state.projectApplicationEvaluation;
    },
    toggleProjectSCA(state) {
        state.projectSCA   =   !state.projectSCA;
    },
    toggleProjectSettings(state) {
        state.projectSettings   =   !state.projectSettings;
    },
    toggleAdditionalInformation(state) {
        state.additionalInformation =   !state.additionalInformation;
    },
    toggleAdditionalApplicationUrls(state) {
        state.additionalApplicationUrls =   !state.additionalApplicationUrls;
    },
    toggleJobStatuses(state) {
        state.jobStatuses    =   !state.jobStatuses;
    },
    toggleProjectStatistics(state) {
        state.projectStatistics    =   !state.projectStatistics;
    },
    toggleServerAvailability(state) {
        state.serverAvailability    =   !state.serverAvailability;
    },
    toggleDetails(state) {
        state.details   =   !state.details;
    },
    setMenu(state, value) {
        state.menu  =   value;
    },
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
    async vpn_getConfig({commit}, payload){
        const res = await this.$repository.vpn.getConfig(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async scanStat_getProjectStat({commit}, payload){
        const res = await this.$repository.scanStat.getProjectStat(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
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
    async evenalerterEvent_getAlert({commit}, payload) {
        const res = await this.$repository.evenalerterEvent.getAlert(payload);
        const {status, data} = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProp_getAuditorTimetracking({commit}, payload){
        const res = await this.$repository.portalProp.getAuditorTimetracking(payload);
        const {status, data} = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProp_getDDOSSustainability({commit}, payload) {
        const res = await this.$repository.portalProp.getDDOSSustainability(payload);
        const {status, data} = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProp_getReportParams({commit}, payload){
        const res = await this.$repository.portalProp.getReportParams(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProp_getApplicationEvaluation({commit}, payload){
        const res = await this.$repository.portalProp.getApplicationEvaluation(payload);
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
    async scanJob_getJobStatuses({commit}, payload){
        const res = await this.$repository.scanJob.getJobStatuses(payload);
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
    async portalProject_getOsintById({commit}, id) {
        const res = await this.$repository.portalProject.getOsintById(id);
        const {status, data} = res
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
    async portalProject_getQA({commit}, payload){
        const res = await this.$repository.portalProject.getQA(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_getActualSoftware({commit}, payload){
        const res = await this.$repository.portalProject.getActualSoftware(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_getSoftReport({commit}, payload){
        const res = await this.$repository.portalProject.getSoftReport(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_getComments({commit}, payload){
        const res = await this.$repository.portalProject.getComments(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
    },
    async portalProject_getSettings({commit}, payload){
        const res = await this.$repository.portalProject.getSettings(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return null;
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
    async portalProject_getQATree({commit}, payload){
        const res = await this.$repository.portalProject.getQATree(payload);
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
    async portalProject_getByFilter({commit}, payload){
        const res = await this.$repository.portalProject.getByFilter(payload);
        const { status, data } = res
        if (status === 200) {
            return data;
        }
        return [];
    },
    async auditor_get({commit}){
        const res = await this.$repository.auditor.get();
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