export default ($axios) => ({
    getWhere(payload) {
        return $axios.post('/api/v1/master/rawbase/getWhere?take='+payload.take+'&page='+payload.page, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});