export default ($axios) => ({
    getSoftVulnByProjectId(projectId) {
        return $axios.get('https://admin3.iw:1450/api/v1/master/projsoft/getSoftVulnByProjectId/3896348').then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});