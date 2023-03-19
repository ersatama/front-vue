export default ($axios) => ({
    get(payload) {
        return $axios.get('/api/v1/portalProject/get?page='+payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    firstById(id) {
        return $axios.get('/api/v1/portalProject/firstById/'+id).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    }
});