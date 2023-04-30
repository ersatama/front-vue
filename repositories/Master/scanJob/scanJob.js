export default ($axios) => ({
    getByProjectId(projectId) {
        return $axios.get('/api/v1/master/scanJob/getByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});