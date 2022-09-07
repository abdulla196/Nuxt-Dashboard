const state = {
    checkAuth: false,
    step: 1,
    Authorization: '',
    user: [],
    register: [],
    loading: false,
    checkUserStatus: false,
    loadingReg: true,
    errors: [],
    loadingupdate: false,
    sessionExpired: false,
    errorMesage: 'loading ...',
    login_flag: false,
}

const getters = {
    allAuth: (state) => state,
}

const actions = {
    async setApi({ state, dispatch }, data) {
        await this.$axios.setHeader('lang', this.$i18n.locale)
        if (this.$cookies.get('Authorization')) {
            state.Authorization = this.$cookies.get('Authorization')
            state.checkAuth = true
        }
        if (!state.checkAuth) {
            this.$router.push('/login')
        }
        await this.$axios.setHeader(
            'Authorization',
            this.$cookies.get('Authorization')
        )
    },

    async myInfo({ state }) {
        await this.$axios.get('/api/user/get/myinfo').then((res) => {
            state.user = res.data.data
            state.loading = false
        })
    },

    before({ state, dispatch }) {
        state.loading = true
        dispatch('setMsg', { msg: '', errors: [] })
    },

    routerTo() {
        window.location.href = '/'
    },

    Logout() {
        this.$cookies.remove('Authorization')
        this.$cookies.remove('myInfo')
        window.location.href = '/login'
    },

    registerAction({ state, dispatch }, arrayData) {
        dispatch('before')
            //
        var data = new FormData()

        if (state.step === 2) {
            data.append('verification_code', arrayData)
        } else state.register = arrayData

        data.append('name', state.register.name)
        data.append('phone', state.register.phone.replace(/\s/g, ''))
        data.append('email', state.register.email)
        data.append('referral', state.register.referral)
        data.append('password', state.register.password)
        data.append('password_confirmation', state.register.password)

        this.$axios
            .post('/register', data)
            .then((res) => {
                state.loading = false
                console.log(res.data.msg)
                if (res.data.status === 200) {
                    if (state.step === 1) {
                        state.step = 2
                    } else {
                        this.$cookies.set('iA', 1, {
                            path: '/',
                            maxAge: 365 * 24 * 60 * 60,
                        })
                        dispatch('routerTo')
                    }
                } else {
                    if (state.step === 1)
                        dispatch('setMsg', {
                            msg: res.data.msg,
                            errors: res.data.errors,
                            api: 'register',
                            type: 'error',
                        })
                    else
                        dispatch('setMsg', {
                            msg: res.data.msg,
                            errors: res.data.errors,
                            api: 'verification_code',
                            type: 'error',
                        })
                }
            })
            .catch((error) => {
                state.loading = false
                console.log(error.message)
                state.errorMesage = error.message
            })
    },

    LoginAction({ app, state, dispatch }, arrayData) {
        var data = JSON.stringify({
            userName: arrayData.userName,
            password: arrayData.password,
        })
        state.errorMesage = 'loading ... '
        state.loading = true
        const response = this.$axios
            .$post('/signin', data)
            .then((res) => {
                state.loading = false
                if (res.data.user.type == 'admin') {
                    if (res.status == 1) {
                        this.$cookies.set('Authorization', 'Bearer ' + res.data.token, {
                            path: '/',
                            maxAge: 365 * 24 * 60 * 60,
                        })
                        this.$cookies.set('myInfo', res.data)
                        state.errorMesage = res.message
                        state.login_flag = true
                        dispatch('routerTo')
                    } else {
                        state.errorMesage = res.message
                        state.login_flag = false
                    }
                } else {
                    state.errorMesage = "you don't have access"
                    state.login_flag = false
                }
            })

        .catch((error) => {
            state.loading = false
            console.log(error.message)
            state.errorMesage = 'Invalid user name and password combination'
        })
    },

    changeSessionExpired({ state }) {
        state.sessionExpired = false
    },
}

const mutations = {}
export default {
    state,
    getters,
    actions,
    mutations,
}