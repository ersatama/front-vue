export default ($axios) => ({
    getJobStatuses(payload) {
        return $axios.post('/api/v1/master/scanJob/getJobStatuses', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getByProjectId(projectId) {
        return $axios.get('/api/v1/master/scanJob/getByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});