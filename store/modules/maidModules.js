
const state = {
    loading:true,
    data: [],
    
  };
  
  const getters = {
    allMaidsList: state => state,
  };

  const actions = {
  
    async getMaids({state}) {
     await this.$axios.get("/api/user/filter/maid").then((res) => {
        const maids = res.data.data;
          for (let i=0; i < maids.length; i++) {
              if(maids[i].maid.type =='maid'){
                state.data.push(maids[i].maid)
              }
          }
          state.loading = false;
      });
    },
    
    async getoneMaids({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/user/' + id).then((res) => {
            state.data = res.data.data
            state.loading = false
        })
    },
    
    async getMaidWothReview({ state }, id) {
        state.loading = true

        await this.$axios.get('/api/user/filter/maidwithreview/' + id).then((res) => {
            state.data = res.data.data
            state.loading = false
        })
    },
    async updateMaids({ state, dispatch }, Obj) {
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
                this.$router.push('/maids')
                setTimeout(function(){
                  window.location.reload()},500)
            } else {
                state.addressMSG = res.data.message
            }
            state.loading = false
        })
    },
  }
  
  const mutations ={
    
  }
  export default {
    state,
    getters,
    actions,
    mutations
  };
  