export default ($axios) => ({
    firstById(id) {
        return $axios.get('/api/v1/user/firstById/'+id).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.data;
        });
    },
    auth(data) {
        return $axios.post('/api/v1/user/auth', data).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.data;
        });
    }
});