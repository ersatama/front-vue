export default ($axios) => ({
    getSoftVulnByProjectId(payload) {
        return $axios.post('/api/v1/master/projsoft/getSoftVulnByProjectId/'+payload.project_id, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});