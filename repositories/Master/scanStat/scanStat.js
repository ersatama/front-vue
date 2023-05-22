export default ($axios) => ({
    getScanStat(payload) {
        return $axios.post('/api/v1/master/scanStat/getScanStat', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});