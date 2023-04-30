export default ($axios) => ({
    getByProjectId(projectId) {
        return $axios.get('/api/v1/master/scanNeuronJob/getByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getJobsByProjectId(projectId) {
        return $axios.get('/api/v1/master/scanNeuronJob/getJobsByProjectId/'+projectId).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    }
});