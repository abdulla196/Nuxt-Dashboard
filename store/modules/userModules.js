const state = {
    loading: false,
    userData: [],
    menuHeader: false,
    overlay: false,
}

const getters = {
    allUsers: (state) => state,
}

const actions = {
    changeMenuHeader({ state }, data) {
        state.menuHeader = data
    },

    setOverlay({ state }, data) {
        state.overlay = data
    },

    async changeLanguage({ state }, data) {
        await this.$cookies.set('lang', data, {
            path: '/',
            maxAge: 365 * 24 * 60 * 60,
        })
        location.reload()
    },

    async getUserData({ state }) {
        // alert(1)
        state.loading = true
        state.data = []
        await this.$axios.get('/me').then((res) => {
            state.data = res.data.data
            state.cartLength = res.data.data.services.length
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