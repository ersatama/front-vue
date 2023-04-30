export default ($axios) => ({
    getWhere(payload) {
        return $axios.post('/api/v1/master/auditorTask/getWhere', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});