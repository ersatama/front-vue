export default ($axios) => ({
    getAlert(payload) {
        return $axios.post('/api/v1/master/evenalerterEvent/getAlert', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});