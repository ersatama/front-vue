export default ($axios) => ({
    getServerTesterLog(payload) {
        return $axios.post('/api/v1/master/serverTesterLog/getServerTesterLog', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});