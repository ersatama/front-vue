export default ($axios) => ({
    getByProjectId(payload) {
        return $axios.post('/api/v1/master/scanReportRawMaster/getByProjectId/'+payload.id+'?take='+payload.take+'&page='+payload.page, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});