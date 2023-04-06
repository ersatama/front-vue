export default ($axios) => ({
    getWhere(payload) {
        return $axios.post('/api/v1/portal/portalProject/getWhere?page='+payload.page+'&take='+payload.take, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    get(payload) {
        return $axios.get('/api/v1/portal/portalProject/get?page='+payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    linksById(id) {
        return $axios.get('/api/v1/portal/portalProject/linksById/'+id).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    firstById(id) {
        return $axios.get('/api/v1/portal/portalProject/firstById/'+id).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    filter() {
        return $axios.get('/api/v1/portal/portalProject/filter').then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    }
});