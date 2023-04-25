export default ($axios) => ({
    getUnverifiedByProjectId(payload) {
        return $axios.post('/api/v1/master/rawbase/getUnverifiedByProjectId/'+payload.id+'?take='+payload.take+'&page='+payload.page, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});