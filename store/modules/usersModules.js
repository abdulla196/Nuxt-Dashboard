
const state = {
  loading:true,
  data: [],
  myInfo:[],
  message:'loading',
  length:0
};

const getters = {
  allUsersList: state => state,
};

const actions = {

  async getUsers({state}) {
   await this.$axios.get("/api/user").then((res) => {
    state.data = [];
      const users = res.data.data;
      state.length = users.length;
      for (let i=0; i < users.length; i++) {
        if(users[i].type =='user'){
          state.data.push(users[i])
        }
      } 
      state.length = users.length;
      state.loading = false;
    });
  },
  
  async getoneUser({ state }, id) {
    state.loading = true

    await this.$axios.get('/api/user/' + id).then((res) => {
        state.data = res.data.data
        state.loading = false
    })
},
async DeleteUser({ state, dispatch }, dataObj) {
  this.$axios
      .delete('/api/user/' + dataObj)
      .then(function (res) {
          alert('User deteled ' + res.data.message)
          dispatch('getUsers')
      })
      .catch(function (error) {
          console.log(error)
      })
},
async updateUsers({ state, dispatch }, Obj) {
  state.loading = true
  var data = JSON.stringify({
      phone: Obj.phone,
      location: Obj.location,
      details: Obj.details,
      birthday: Obj.birthday,
      price: Obj.price,
      userName: Obj.userName,
      email: Obj.email
  })
  
  this.$axios.put('/api/user/' + Obj.id, data).then((res) => {
      state.cart = res.data
      if (res.data.status === 1) {
          state.data = res.data
            state.message = res.data.message
            setTimeout(function(){
              window.location.href = '/users'})
      } else {
          state.message = res.data.message
      }
      state.loading = false
  })
},

Signup({ state, dispatch }, arrayData) {
  state.message = 'Loading';
  var data = JSON.stringify({
      "userName":arrayData.userName,
      "password":arrayData.password,
      "email":arrayData.email,
      "passwordConfirm":arrayData.passwordConfirm,
      "type":arrayData.type,
      "location":arrayData.location,
      "phone":arrayData.phone,
      "details":arrayData.details
  });
  this.$axios
      .post('/signup', data)
      .then((res) => {
        console.log(res)
          state.loading = false
          if (res.data.status == 1) {
             dispatch('routerTo')
          } else {
              alert('error')
          }
      })
      .catch(function (error) {
        if(error.message = 'Request failed with status code 500'){
          state.message = 'duplicate key error collection email or user name';
        }
      });
},
  async changePassword({ state }, arrayData) {
    var data = JSON.stringify({
      "email":arrayData.email,
      "password":arrayData.old_password,
      "newPassword":arrayData.new_password,
      "passwordConfirm":arrayData.new_password_confirmation,
  });
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
  
  async forgetpass({ state }, arrayData) {
    console.log(arrayData)
    var data = JSON.stringify({
      "email":arrayData.email
  });
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
  
  async changeMyPhoto({ state, dispatch }, Obj) {


    var data = new FormData()
    data.append('image', Obj,Obj.name)
    var config = { headers: {'Content-Type': 'multipart/form-data'} }; 
    this.$axios.post('/api/user/photo', data,config).then((res) => {
      if (res.data.status === 1) {
        window.location.reload()
      } else {
        state.loadingOptions = false
      }

    })
  },
  UpdateUserInfo({ state, dispatch }, arrayData) {
    var data = JSON.stringify({
      "userName":arrayData.userName,
      "email":arrayData.email,
      "phone":arrayData.phone,
      "birthday":arrayData.birthday,
      "details":arrayData.details,
      "location":arrayData.location,
      "price":arrayData.price
    });
    state.loading = true
    this.$axios.$put('/api/user/'+arrayData.id, data).then((res) => {
        state.loading = false
        if (res.status === 1) {
          window.location.reload()
        }

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
