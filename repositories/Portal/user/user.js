export default ($axios) => ({
    firstById(id) {
        return $axios.get('/api/v1/portal/user/firstById/'+id).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    auth(data) {
        return $axios.post('/api/v1/portal/user/auth', data).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    updateById(data) {
        return $axios.post('/api/v1/portal/user/updateById/'+data.id, data).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    }
});