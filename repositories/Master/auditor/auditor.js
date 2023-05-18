export default ($axios) => ({
    get() {
        return $axios.get('/api/v1/master/auditor/get').then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});