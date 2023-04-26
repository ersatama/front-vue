export default ($axios) => ({
    getWhere(payload) {
        return $axios.post('https://admin3.iw:1450/api/v1/portal/portalTicket/getWhere?page='+payload.page+'&take='+payload.take, payload).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        });
    },
});