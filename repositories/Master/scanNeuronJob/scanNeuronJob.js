export default ($axios) => ({
    getByProjectId(payload) {
        return $axios.get('/api/v1/master/scanNeuronJob/getByProjectId/'+payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});