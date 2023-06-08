export default ($axios) => ({
    getConfig(payload) {
        return $axios.post('/api/v1/master/vpn/getConfig', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});