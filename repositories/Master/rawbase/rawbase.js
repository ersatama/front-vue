export default ($axios) => ({
    getUnverifiedByProjectId(payload) {
        return $axios.post('/api/v1/master/rawbase/getUnverifiedByProjectId/'+payload.id, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});