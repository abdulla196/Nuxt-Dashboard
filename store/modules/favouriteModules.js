const state = {
    loading: true,
    data: [],
    oneFavourite: '',
    length:0,
    user_length:[],
    num_user_fav:0,
    message:'Loading ....'
}

const getters = {
    allFavouriteList: (state) => state,
}

const actions = {
    async getFavourite({ state },id) {
        await this.$axios.get('/api/favourite').then((res) => {
            state.data = res.data
            state.length = res.data.data.length;
            var fav = res.data.data
            for (let i=0; i < fav.length; i++) {
                if(fav[i].maid_id == id){
                    state.user_length.push(fav[i].user_id)
                }
            }
            state.loading = false
        })
    },
    
    async getCountFavUser({ state }, id) {
        await this.$axios.get('/api/favourite/countForOne/' + id).then((res) => {
            state.num_user_fav = res.data.data
            state.loading = false
        })
    },
    async DeleteFavourite({ state, dispatch }, dataObj) {
        state.message='Loading ....'
        this.$axios
            .delete('/api/favourite/' + dataObj)
            .then(function (res) {
                state.message=res.data.message
                dispatch('getFavourite')
            })
            .catch(function (error) {
                state.message=error
            })
    },
    async getoneFavourite({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/favourite/' + id).then((res) => {
            state.oneFavourite = res.data.data
            state.loading = false
        })
    },
    async updateFavourite({ state, dispatch }, Obj) {
        state.message='Loading ....'
        state.loading = true
        var data = JSON.stringify({
            "user_id": Obj.user_id,
            "maid_id": Obj.maid_id
        })
        const config = { headers: { 'Content-Type': 'application/json' } }
        this.$axios.put('/api/favourite/' + Obj.id, data, config).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.data = res.data
                state.message=res.data.message
                setTimeout(function(){
                  window.location.href = '/favourite'})
            } else {
                state.message=res.data.message
            }
            state.loading = false
        })
    },
    AddFavourite({ state, dispatch }, arrayData) {
        state.message='Loading ....'
        var data = JSON.stringify({
            "user_id":arrayData.users,
            "maid_id":arrayData.maids
        });
        this.$axios
            .post('/api/favourite/', data)
            .then((res) => {
                state.loading = false
                if (res.data.status == 1) {
                    state.message=res.data.message
                } else {
                    
                state.message=res.data.message
                }
                this.$router.push('/favourite')
                dispatch('getFavourite')
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
