export default ($axios) => ({
    getWhere(payload) {
        return $axios.post('/api/v1/portal/portalTicket/getWhere?page='+payload.page+'&take='+payload.take, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});