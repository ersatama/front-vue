export default ($axios) => ({
    getUnverifiedByProjectId(payload) {
        return $axios.post('https://admin3.iw:1450/api/v1/master/rawbase/getUnverifiedByProjectId/3896348?take='+payload.take+'&page='+payload.page, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});