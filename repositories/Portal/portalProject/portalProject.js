export default ($axios) => ({
    getByFilter(payload) {
        return $axios.post('/api/v1/portal/portalProject/getByFilter', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getWhere(payload) {
        return $axios.post('/api/v1/portal/portalProject/getWhere?page='+payload.page+'&take='+payload.take, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getAlertsByAuditorUser(user) {
        return $axios.get('/api/v1/portal/portalProject/getAlertsByAuditorUser/'+user).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    search(payload) {
        return $axios.post('/api/v1/portal/portalProject/search', payload).then(response => {
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
    getQATree(payload) {
        return $axios.post('/api/v1/portal/portalProject/getQATree', payload).then(response => {
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
    },
    getOsintById(id) {
        return $axios.get('/api/v1/portal/portalProject/getOsintById/'+id).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getQA(payload) {
        return $axios.post('/api/v1/portal/portalProject/getQA', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getActualSoftware(payload) {
        return $axios.post('/api/v1/portal/portalProject/getActualSoftware/', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getSoftReport(payload) {
        return $axios.post('/api/v1/portal/portalProject/getSoftReport/', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getSettings(payload) {
        return $axios.post('/api/v1/portal/portalProject/getSettings/', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
    getComments(payload) {
        return $axios.post('/api/v1/portal/portalProject/getComments/', payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    }
});