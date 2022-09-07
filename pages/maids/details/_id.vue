
<template>
<v-container>
        <div class="text-center my-5">
            <h2  class=" text-center" style="font-size:37px;color:#403c3c">Maid details </h2>
            <br/>
        </div>
    <div style="margin-bottom:5rem">
    <h3 style="color:#f68c28">Basic Information</h3>
        <v-row>
            <div class="col-md-4 col-12" >
               <span class="infomaid"> UserName </span>  <span class="details">{{allMaidsList.maidInfo.userName}}</span>
            </div>
            <div class="col-md-4 col-12">
                <span class="infomaid"> phone </span>  <span class="details"> {{allMaidsList.maidInfo.phone}}</span> 
            </div>
            <div class="col-md-4 col-12">
               <span class="infomaid">  email </span>  <span class="details"> {{allMaidsList.maidInfo.email}}</span> 
            </div>
            <div class="col-md-4 col-12">
                <span class="infomaid"> birthday </span>  <span class="details">{{allMaidsList.maidInfo.birthday}}</span> 
            </div>
            <div class="col-md-4 col-12">
                <span class="infomaid"> details </span>  <span class="details">{{allMaidsList.maidInfo.details}}</span> 
            </div>
            <div class="col-md-4 col-12">
                <span class="infomaid"> location </span>  <span class="details">{{allMaidsList.maidInfo.location}}</span> 
            </div>
            
            <div class="col-md-12" v-if="allMaidsList.maidInfo.maid_paper">
                <v-divider></v-divider>
                <div class="mt-2 mb-5">
                    <h3 style="color:#f68c28">images</h3>
                </div>
                <span class="mx-2" v-for="(images , i) in allMaidsList.maidInfo.maid_paper" :key="i">
                    <img 
                    :src="images.path"
                    :lazy-src="images.path"
                    aspect-ratio="1"
                    class="grey lighten-2" height="200"/>
                </span>
            </div>
        </v-row>

        
        <v-divider></v-divider>
        <div class="my-2" v-if="allMaidsList.maidreviews">
            <h3 class="mt-2 mb-5" style="color:#f68c28">Reviewes Details</h3>
        </div>
        <div v-for="items in allMaidsList.maidreviews" :key="items._id">
            <v-row>
                <div class="col-md-4 col-12">
        <h3 class="text-h5 text-center mb-3"> <span  class="infomaid">Rate Average</span> 
                            <v-rating :value="items.rate_average"  readonly></v-rating> </h3></div>
                <div class="col-md-4 col-12">
        <h3 class="text-h5 text-center mb-3"><span  class="infomaid"> Number Of Users Reviews</span><br/><span  class="details"> {{items.reviews.length}}</span>  </h3></div>
                <div class="col-md-4 col-12"><h3 class="text-h5 text-center mb-3"> <span  class="infomaid"> number Of Users Favourite</span> <v-rating
                    :empty-icon="emptyIcon"
      :full-icon="fullIcon"
  hover
  length="5"
  readonly
            v-model="allFavouriteList.num_user_fav"
></v-rating></h3></div>
            </v-row>
        
        <v-row >
            <v-col cols="12" sm="6" md="4" v-for="item in items.reviews" :key="item._id">
                <v-card  class="mb-2">
                    <v-card-text>
                        <div>comment : {{item.comment}}</div>
                        <div>rate :  
                        <v-col cols="12" style="padding:0 0.5rem">
                            <v-rating v-model="item.rate"  readonly></v-rating>
                        </v-col></div>
                        <div class="row">
                            <div class="col-6"  v-for="user in item.user" :key="user._id">
                                user Name : {{user.userName}}
                            </div>
                            <div class="col-6"  v-for="maid in item.maid" :key="maid._id">
                                Maid Name : {{maid.userName}}
                            </div> 
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        </div>
    </div>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
    emptyIcon: 'mdi-heart-outline',
      fullIcon: 'mdi-heart',
      halfIcon: 'mdi-heart-half'
    }),
    computed: {

    },


    methods: {
        ...mapActions(['getMaidWothReview','getFavourite','getCountFavUser']),
    },

    computed: {
        ...mapGetters(['allMaidsList','allFavouriteList']),
    },


    mounted() {
        this.getMaidWothReview(this.$route.params.id)
        this.getCountFavUser(this.$route.params.id)
        this.getFavourite(this.$route.params.id)
    },
}
</script>
<style scoped>
.infomaid{
    border-radius: 5px;
    padding: 7px;
    color: #fff;
    background: #f68c28;
    margin-right: 10px;
    min-width: 83px;
    display: inline-block;
}
.details{
    font-weight: bold;
    color: #5e5a5a;
    font-size: 20px;
    letter-spacing: 1.5px;
}
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>