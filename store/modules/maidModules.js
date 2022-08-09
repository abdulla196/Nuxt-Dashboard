
const state = {
    loading:true,
    data: [],
    maidInfo:[],
    maidreviews:[],
    length:0,
  };
  
  const getters = {
    allMaidsList: state => state,
  };

  const actions = {
  
    async getMaids({state}) {
     await this.$axios.get("/api/user/filter/maid").then((res) => {
        const maids = res.data.data;
        state.length = maids.length;
          for (let i=0; i < maids.length; i++) {
              if(maids[i].maid.type =='maid'){
                state.data.push(maids[i].maid)
              }
          }
          state.loading = false;
      });
    },
    
async DeleteMids({ state, dispatch }, dataObj) {
  this.$axios
      .delete('/api/user/' + dataObj)
      .then(function (res) {
          alert('Maids deteled ' + res.data.message)
          state.data = []
          dispatch('getMaids')
      })
      .catch(function (error) {
          console.log(error)
      })
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

        await this.$axios.get('/api/user/filter/maidwithreview/'+id).then((res) => {
            state.maidInfo = res.data.data.maid
            state.maidreviews = res.data.data.reviews
            state.loading = false
        })
    },
    async updateMaids({ state, dispatch }, Obj) {
      console.log(Obj)
        state.loading = true
        var data = JSON.stringify({
            phone: Obj.phone,
            location: Obj.location,
            details: Obj.details,
            birthday: Obj.birthday,
            price: Obj.price,
            userName: Obj.userName,
            email: Obj.email,
            maid_paper:Obj.maid_paper
        })
        console.log(data)
        this.$axios.put('/api/user/' + Obj.id, data).then((res) => {
            state.cart = res.data
            if (res.data.status === 1) {
                state.data = res.data
                setTimeout(function(){
                  window.location.href = '/maids'})
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
  