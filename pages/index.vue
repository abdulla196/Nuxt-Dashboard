<template>
<div  v-if="!this.$store.state.auth.checkAuth">
  <Login />
</div>
<div class="my-5" v-else>
  <h1 class="text-center">welcome dashboard</h1>
  <div class="container">
    <v-row class="m-3">
      <v-card class="col-md-3 col-12 mx-2 my-2 them--success" style="background: blanchedalmond;">
        <div class="text-center">
            <h3 class="headline mb-2">users</h3>
            <h3 class="headline mb-0">{{allUsersList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="background: burlywood;">
        <div class="text-center">
            <h3 class="headline mb-2">maids</h3>
            <h3 class="headline mb-0">{{allMaidsList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="background: #ffb23e;">
        <div class="text-center">
            <h3 class="headline mb-2">Notification</h3>
            <h3 class="headline mb-0">{{allnotificationList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="background: #48ba48;">
        <div class="text-center">
            <h3 class="headline mb-2">reviews</h3>
            <h3 class="headline mb-0">{{allReviewsList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="background: #99ba48;">
        <div class="text-center">
            <h3 class="headline mb-2">Favourite</h3>
            <h3 class="headline mb-0">{{allFavouriteList.length}}</h3>
        </div>
      </v-card>
    </v-row>
  </div>
</div>
</template>


<script>
import Login from '../components/login/login.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
   data: () => ({

  }),
  components: {
    Login,
  },
  computed: {
    ...mapGetters(['allUsersList','allMaidsList','allnotificationList','allReviewsList','allFavouriteList']),
  },
  methods:{
    ...mapActions(['getUsers','getMaids','getNotification','getReviews','getFavourite'])
  },
  mounted(){
    this.getUsers()
    if(this.allMaidsList.data == ''){
        this.getMaids() 
    }
    this.getNotification()
    this.getReviews()
    this.getFavourite()
},

  components: {
  },
}
</script>



<style scoped>

</style>
