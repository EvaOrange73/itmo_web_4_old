var table = new Vue({
    el: '#table', data: {
        points: []
    }, mounted() {
        axios.get('/task/points')
            .then(response => (this.points = response.data));
    }
})