export default ($axios) => ({
    getProjectStatusesByProjectId(projectId) {
        return $axios.get('/api/v1/portal/portalProp/getProjectStatusesByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});