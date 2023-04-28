export default ($axios) => ({
    getSoftVulnByProjectId(projectId) {
        return $axios.get('/api/v1/master/projsoft/getSoftVulnByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});