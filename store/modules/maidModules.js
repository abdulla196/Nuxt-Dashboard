const state = {
    loading: true,
    data: [],
    maidInfo: [],
    maidreviews: [],
    length: 0,
    onemaid: [],
    message: 'Loading ....',
    flag: 'loading',
}

const getters = {
    allMaidsList: (state) => state,
}

const actions = {
    async getMaids({ state }) {
        await this.$axios.get('/api/user/filter/maid').then((res) => {
            state.data = []
            const maids = res.data.data
            state.length = maids.length
            for (let i = 0; i < maids.length; i++) {
                if (maids[i].maid.type == 'maid') {
                    state.data.push(maids[i].maid)
                }
            }
            state.loading = false
        })
    },

    async DeleteMids({ state, dispatch }, dataObj) {
        state.flag = 'loading'
        state.message = 'Loading ....'
        this.$axios
            .delete('/api/user/' + dataObj)
            .then(function(res) {
                state.message = res.data.message
                state.data = []
                state.flag = 'success'
                dispatch('getMaids')
            })
            .catch(function(error) {
                state.flag = 'fail'
                state.message = res.data.error
            })
    },
    async getoneMaids({ state }) {
        setTimeout(function() {
            state.loading = false
        }, 3000)
    },
    async getMaidWothReview({ state }, id) {
        state.loading = true
        await this.$axios
            .get('/api/user/filter/maidwithreview/' + id)
            .then((res) => {
                state.maidInfo = res.data.data.maid
                state.maidreviews = res.data.data.reviews
                state.loading = false
            })
    },
    
    async updateMaidswithphoto({ state, dispatch }, Obj) {
        state.message = 'Loading ....'
        state.loading = true
        state.flag = 'loading'
        var data_photo = new FormData()
        data_photo.append('image', Obj.photo)

        var config = { headers: { 'Content-Type': 'multipart/form-data' } }
        this.$axios.post('/api/user/photo', data_photo, config).then((res) => {
            if (res.data.status === 1) {
               
            var data_use = JSON.stringify({
                phone: Obj.phone,
                location: Obj.location,
                details: Obj.details,
                birthday: Obj.birthday,
                price: Obj.price,
                userName: Obj.userName,
                email: Obj.email,
                maid_paper: Obj.maid_paper,
                photo: 'http://66.29.155.80:5003/uploads/' + res.data.data.name
            })

            this.$axios.put('/api/user/' + Obj.id, data_use).then((res) => {
                state.cart = res.data
                if (res.data.status === 1) {
                state.flag = 'success'
                    state.data = res.data
                    state.message = res.data.message
                    setTimeout(function() {
                    window.location.href = '/maids'
                    })
                } else {
                    state.message = res.data.message
                }
                state.loading = false
            })
        }
        })
    },
    async updateMaids({ state, dispatch }, Obj) {
        state.message = 'Loading ....'
        state.loading = true
        state.flag = 'loading'
        var data = JSON.stringify({
            phone: Obj.phone,
            location: Obj.location,
            details: Obj.details,
            birthday: Obj.birthday,
            price: Obj.price,
            userName: Obj.userName,
            email: Obj.email,
            maid_paper: Obj.maid_paper,
        })
        this.$axios.put('/api/user/' + Obj.id, data).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.flag = 'success'
                state.data = res.data
                setTimeout(function() {
                    window.location.href = '/maids'
                })
            } else {
                state.flag = 'fail'
                state.message = res.data.message
            }

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