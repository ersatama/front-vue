export default ($axios) => ({
    getScanStat(payload) {
        return $axios.post('https://admin3.iw:1450/api/v1/master/scanStat/getScanStat', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});