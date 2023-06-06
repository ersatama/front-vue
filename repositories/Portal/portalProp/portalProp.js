export default ($axios) => ({
    getDDOSSustainability(payload) {
        return $axios.post('/api/v1/portal/portalProp/getDDOSSustainability', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getReportParams(payload) {
        return $axios.post('/api/v1/portal/portalProp/getReportParams', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getApplicationEvaluation(payload) {
        return $axios.post('/api/v1/portal/portalProp/getApplicationEvaluation', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getProjectStatusesByProjectId(projectId) {
        return $axios.get('/api/v1/portal/portalProp/getProjectStatusesByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});