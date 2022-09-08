import axios from 'axios'
const state = {
    loading: true,
    data: [],
    myInfo: [],
    message: 'loading ... ',
    length: 0,
    userschat: [],
    flag: 'loading',
}

const getters = {
    allUsersList: (state) => state,
}

const actions = {
    async getUsers({ state }) {
        await this.$axios.get('/api/user').then((res) => {
            state.data = []
            const users = res.data.data
            state.length = users.length
            for (let i = 0; i < users.length; i++) {
                if (users[i].type == 'user') {
                    state.data.push(users[i])
                }
            }
            state.length = users.length
            state.loading = false
        })
    },

    async getoneUser({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/user/' + id).then((res) => {
            state.data = res.data.data
            state.loading = false
        })
    },

    async DeleteUser({ state, dispatch }, dataObj) {
        state.flag = 'loading'
        state.message = 'Loading ....'
        this.$axios
            .delete('/api/user/' + dataObj)
            .then(function(res) {
                state.message = res.data.message
                state.flag = 'success'
                dispatch('getUsers')
            })
            .catch(function(error) {
                //console.log(error)
                state.flag = 'fail'
            })
    },

    async updateUsers({ state, dispatch }, Obj) {
        state.message = 'Loading ....'
        state.flag = 'loading'
        state.loading = true
        var data = JSON.stringify({
            phone: Obj.phone,
            location: Obj.location,
            details: Obj.details,
            birthday: Obj.birthday,
            price: Obj.price,
            userName: Obj.userName,
            email: Obj.email,
        })

        this.$axios.put('/api/user/' + Obj.id, data).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.data = res.data
                state.message = res.data.message
                state.flag = 'success'
                setTimeout(function() {
                    window.location.href = '/users'
                })
            } else {
                state.message = res.data.message
                state.flag = 'fail'
            }
            state.loading = false
        })
    },

    getoneUserchat({ state }, ids) {
        var urls = []
        state.userschat = []
        for (var i = 0; i < ids.length; i++) {
            var endpoint = '/api/user/' + ids[i]
            this.$axios.get(endpoint).then((res) => {
                state.userschat.push(res.data.data)
                state.loading = false
            })
        }
    },

    async updateUsers({ state, dispatch }, Obj) {
        state.message = 'Loading ....'
        state.loading = true
        var data = JSON.stringify({
            phone: Obj.phone,
            location: Obj.location,
            details: Obj.details,
            birthday: Obj.birthday,
            price: Obj.price,
            userName: Obj.userName,
            email: Obj.email,
        })

        this.$axios.put('/api/user/' + Obj.id, data).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.data = res.data
                state.message = res.data.message
                setTimeout(function() {
                    window.location.href = '/users'
                })
            } else {
                state.message = res.data.message
            }
            state.loading = false
        })
    },
    Signup({ state, dispatch }, arrayData) {
        state.message = 'Loading'
        state.flag = 'loading'
        var data = JSON.stringify({
            userName: arrayData.userName,
            password: arrayData.password,
            email: arrayData.email,
            passwordConfirm: arrayData.passwordConfirm,
            type: arrayData.type,
            location: arrayData.location,
            phone: arrayData.phone,
            details: arrayData.details,
        })
        this.$axios
            .post('/signup', data)
            .then((res) => {
                //console.log(res)
                state.loading = false
                if (res.data.status == 1) {
                    state.flag = 'success'
                    setTimeout(function() {
                        window.location.href = '/users'
                    })
                } else {
                    state.flag = 'fail'
                    alert('error')
                }
            })
            .catch(function(error) {
                if ((error.message = 'Request failed with status code 500')) {
                    state.message = 'duplicate key error collection email or user name'
                }
                state.flag = 'fail'
            })
    },

    getoneUserchat({ state }, ids) {
        var urls = []
        state.userschat = []
        for (var i = 0; i < ids.length; i++) {
            var endpoint = '/api/user/' + ids[i]
            this.$axios.get(endpoint).then((res) => {
                state.userschat.push(res.data.data)
                state.loading = false
            })
        }
    },

    async forgetpass({ state }, arrayData) {
        var data = JSON.stringify({
            email: arrayData.email,
        })
        this.$axios
            .post('/sendMail', data)
            .then((res) => {
                state.loading = false
                if (res.data.status == 1) {
                    this.$router.push('/login')
                } else {
                    alert('error')
                }
            })
            .catch((error) => {
                state.loading = false
            })
    },

    async changePassword({ state }, arrayData) {
        var data = JSON.stringify({
            email: arrayData.email,
            password: arrayData.old_password,
            newPassword: arrayData.new_password,
            passwordConfirm: arrayData.new_password_confirmation,
        })
        this.$axios
            .post('/changepassword', data)
            .then((res) => {
                state.loading = false
                if (res.data.status == 1) {
                    window.location.reload()
                } else {
                    alert('error')
                }
            })
            .catch((error) => {
                state.loading = false
            })
    },

    async changeMyPhoto({ state, dispatch }, Obj) {
        var data = new FormData()
        data.append('image', Obj.selectedFile)

        var config = { headers: { 'Content-Type': 'multipart/form-data' } }
        this.$axios.post('/api/user/photo', data, config).then((res) => {
            if (res.data.status === 1) {
                var photo = JSON.stringify({
                    photo: 'http://66.29.155.80:5003/uploads/' + res.data.data.name,
                })
                this.$axios.$put('/api/user/' + Obj.id, photo).then((res) => {
                    state.loading = false
                    if (res.status === 1) {
                        window.location.reload()
                    }
                })
            } else {
                state.loadingOptions = false
            }
        })
    },
    UpdateUserInfo({ state, dispatch }, arrayData) {
        var data = JSON.stringify({
            userName: arrayData.userName,
            email: arrayData.email,
            phone: arrayData.phone,
            birthday: arrayData.birthday,
            location: arrayData.location,
        })
        state.loading = true
        this.$axios.$put('/api/user/' + arrayData.id, data).then((res) => {
            state.loading = false
            if (res.status === 1) {
                window.location.reload()
            }
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