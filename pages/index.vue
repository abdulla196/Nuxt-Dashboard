<template>

<div class="my-5">
  <h1 class="text-center">welcome dashboard</h1>
  <div class="container">
    <v-row class="m-3">
      <v-card class="col-md-3 col-12 mx-2 my-2">
        <div class="text-center">
            <h3 class="headline mb-2">users</h3>
            <h3 class="headline mb-0">{{allUsersList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2">
        <div class="text-center">
            <h3 class="headline mb-2">maids</h3>
            <h3 class="headline mb-0">{{allMaidsList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2">
        <div class="text-center">
            <h3 class="headline mb-2">Notification</h3>
            <h3 class="headline mb-0">{{allnotificationList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2">
        <div class="text-center">
            <h3 class="headline mb-2">reviews</h3>
            <h3 class="headline mb-0">{{allReviewsList.length}}</h3>
        </div>
      </v-card>
      <v-card class="col-md-3 col-12 mx-2 my-2">
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
