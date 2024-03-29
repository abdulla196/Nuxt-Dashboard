const state = {
    loading: true,
    data: [],
    oneReviews: '',
    length: 0,
    flag: 'loading',
}

const getters = {
    allReviewsList: (state) => state,
}

const actions = {
    async getReviews({ state }) {
        await this.$axios.get('/api/review').then((res) => {
            state.data = res.data
            state.length = res.data.data.length
            state.loading = false
        })
    },
    async DeleteReviews({ state, dispatch }, dataObj) {
        state.flag = 'loading'
        state.message = 'Loading ....'
        this.$axios
            .delete('/api/review/' + dataObj)
            .then(function(res) {
                state.message = res.data.message
                state.flag = 'success'
                dispatch('getReviews')
            })
            .catch(function(error) {
                //console.log(error)
                state.flag = 'fail'
            })
    },
    async getoneReviews({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/review/' + id).then((res) => {
            //console.log(res)
            state.oneReviews = res.data.data
            state.loading = false
        })
    },

    async getReviewsForMaid({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/review/maid/' + id).then((res) => {
            state.data = res.data.data[0]
            state.loading = false
        })
    },
    async GetforMaid({ state, dispatch }, id) {
        state.loading = true
            //console.log(id.maids)
        await this.$axios.get('/api/review/maid/' + id.maids).then((res) => {
            state.data = res.data.data
            if (res.data.status == 1) {
                //console.log()
                window.location.href = '/reviews/details/' + id.maids
            }
            state.loading = false
        })
    },

    async updateReviews({ state, dispatch }, Obj) {
        state.message = 'Loading ....'
        state.flag = 'loading'
        state.loading = true
        var data = JSON.stringify({
            rate: Obj.rate,
            comment: Obj.comment,
            user_id: Obj.user_id,
            maid_id: Obj.maid_id,
        })
        const config = { headers: { 'Content-Type': 'application/json' } }
        this.$axios.put('/api/review/' + Obj.id, data, config).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.message = res.data.message
                state.data = res.data
                setTimeout(function() {
                    window.location.href = '/reviews'
                })
                state.flag = 'success'
            } else {
                state.addressMSG = res.data.msg
                state.flag = 'fail'
            }
            state.loading = false
        })
    },
    AddReview({ state, dispatch }, arrayData) {
        state.message = 'Loading ....'
        state.flag = 'loading'
        var data = JSON.stringify({
            user_id: arrayData.users,
            maid_id: arrayData.maids,
            rate: arrayData.rate,
            comment: arrayData.comment,
        })
        this.$axios
            .post('/api/review/', data)
            .then((res) => {
                state.message = res.data.message
                state.loading = false
                if (res.data.status == 1) {
                    this.$router.push('/reviews')
                    state.flag = 'success'
                    dispatch('getReviews')
                } else {
                    state.flag = 'fail'
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