const state = {
    loading: true,
    data: [],
    oneReviews: '',
}

const getters = {
    allReviewsList: (state) => state,
}

const actions = {
    async getReviews({ state }) {
        await this.$axios.put('/api/review').then((res) => {
            state.data = res.data
            state.loading = false
        })
    },
    async DeleteReviews({ state, dispatch }, dataObj) {
        this.$axios
            .delete('/api/review/' + dataObj)
            .then(function (res) {
                alert('Reviews deteled ' + res.data.message)
                dispatch('getReviews')
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    async getoneReviews({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/review/' + id).then((res) => {
            state.oneReviews = res.data.data
            state.loading = false
        })
    },
    
    async getReviewsForMaid({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/review/maid/' + id).then((res) => {
            state.data = res.data.data
            state.loading = false
        })
    },
    async GetforMaid({ state,dispatch }, id) {
        state.loading = true
        console.log(id.maids)
        await this.$axios.get('/api/review/maid/'+ id.maids).then((res) => {
            state.data = res.data.data
            if(res.data.status == 1){
                console.log()
                window.location.href = '/reviews/details/'+id.maids
            }
            state.loading = false
        })
    },
    
    async updateReviews({ state, dispatch }, Obj) {
        state.loading = true
        var data = JSON.stringify({
            "rate":Obj.rate,
            "comment":Obj.comment,
            "user_id":Obj.user_id,
            "maid_id":Obj.maid_id,
        })
        const config = { headers: { 'Content-Type': 'application/json' } }
        this.$axios.put('/api/review/' + Obj.id, data, config).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.data = res.data
                this.$router.push('/reviews')
            } else {
                state.addressMSG = res.data.msg
            }
            state.loading = false
        })
    },
    AddReview({ state, dispatch }, arrayData) {
        var data = JSON.stringify({
            "users":arrayData.users,
            "maids":arrayData.maids,
            "rate":arrayData.rate,
            "comment":arrayData.comment,
        });
        this.$axios
            .post('/api/review/', data)
            .then((res) => {
                state.loading = false
                if (res.data.status == 1) {
                    this.$router.push('/reviews')
                } else {
                    alert('error')
                }
            })
            .catch((error) => {
                state.loading = false
            })
    },
}

const mutations = {}
export default {
    state,
    getters,
    actions,
    mutations,
}
