const state = {
    loading: true,
    data: [],
    oneNotification: '',
    length:0,
    message:'Loading ....'
}

const getters = {
    allnotificationList: (state) => state,
}

const actions = {
    async getNotification({ state }) {
        await this.$axios.get('/api/notification').then((res) => {
            state.data = res.data
            state.length = res.data.data.length
            state.loading = false
        })
    },
    async DeleteNotification({ state, dispatch }, dataObj) {
        state.message='Loading ....'
        this.$axios
            .delete('/api/notification/' + dataObj)
            .then(function (res) {
                state.message=res.data.message
                dispatch('getNotification')
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    async getoneNotification({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/notification/' + id).then((res) => {
            state.oneNotification = res.data.data
            state.loading = false
        })
    },
    async updateNotification({ state, dispatch }, Obj) {
        state.message='Loading ....'
        state.loading = true
        var data = JSON.stringify({
            "is_clicked": Obj.is_clicked,
            "content": Obj.content,
            "subject": Obj.subject,
            "user_id": Obj.usersId,
            "priority":Obj.priority,
        })
        this.$axios.put('/api/notification/' + Obj.id, data).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.message=res.data.message
                state.data = res.data
            } else {
                state.addressMSG = res.data.msg
            }
            state.loading = false
            setTimeout(function(){
              window.location.href = '/Notifications'})
        })
    },
    async Addnotification({ state, dispatch }, arrayData) {
        state.message='Loading ....'
        for(var i =0 ; i < arrayData.usersId.length ; i++){
            var data = JSON.stringify({
                "content":arrayData.content,
                "subject":arrayData.subject,
                "is_clicked":arrayData.is_clicked,
                "priority":arrayData.priority,
                "user_id":arrayData.usersId[i]
            });
            this.$axios
            .post('/api/notification/', data)
            .then((res) => {
                state.loading = false
                if (res.data.status == 1) {
                    if(arrayData.usersId.length < 0)
                    state.message=res.data.message
                    setTimeout(function(){
                      window.location.href = '/Notifications'})
                } else {
                    alert('error')
                }
            })
            .catch((error) => {
                state.loading = false
            })
        }
    },
}

const mutations = {}
export default {
    state,
    getters,
    actions,
    mutations,
}
