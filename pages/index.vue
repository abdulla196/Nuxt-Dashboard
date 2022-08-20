<template>
<div class="my-5">
  <br/>
  <h1 class="text-center my-3" style="font-size:37px;color: #403c3c; ">Welcome Dashboard</h1>
  <br/>
  <div class="container">
    <v-row class="m-5">
      <v-card class="col-md-3 col-12 mx-2 my-2 them--success" style="color: #fff;background: #ffc520;">
        <div class="text-center">
            <h3 class="headline mb-2">users</h3>
            <h3 class="headline mb-0">{{allUsersList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="color: #fff;background: #0d6efd;">
        <div class="text-center">
            <h3 class="headline mb-2">maids</h3>
            <h3 class="headline mb-0">{{allMaidsList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="color: #fff;background: #ffc107;">
        <div class="text-center">
            <h3 class="headline mb-2">Notification</h3>
            <h3 class="headline mb-0">{{allnotificationList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="color: #fff;background: #dc3545;">
        <div class="text-center">
            <h3 class="headline mb-2">reviews</h3>
            <h3 class="headline mb-0">{{allReviewsList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2" style="color: #fff;background: #198754;">
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
import { mapActions, mapGetters } from 'vuex'
export default {
   data: () => ({

  }),
  components: {
  },
  computed: {
    ...mapGetters(['allUsersList','allMaidsList','allnotificationList','allReviewsList','allFavouriteList']),
  },
  methods:{
    ...mapActions(['getUsers','myInfo','getMaids','getNotification','getReviews','getFavourite'])
  },
  mounted(){
    this.myInfo();
    this.getNotification()
    this.getReviews()
    this.getFavourite()
    this.getUsers()
    this.getMaids()
},

  components: {
  },
}
</script>



<style scoped>

</style>
