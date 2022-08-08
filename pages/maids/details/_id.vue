
<template>
<v-container>
    
    <div style="margin-bottom:5rem">
        <h2 class="text-h5 text-center my-3"> review For maid</h2>
        <v-row>
            <div class="col-md-4 col-12">
                userName : {{allMaidsList.maidInfo.userName}}
            </div>
            <div class="col-md-4 col-12">
                phone : {{allMaidsList.maidInfo.phone}}
            </div>
            <div class="col-md-4 col-12">
                email : {{allMaidsList.maidInfo.email}}
            </div>
            <div class="col-md-4 col-12">
                birthday : {{allMaidsList.maidInfo.birthday}}
            </div>
            <div class="col-md-4 col-12">
                details : {{allMaidsList.maidInfo.details}}
            </div>
            <div class="col-md-4 col-12">
                location : {{allMaidsList.maidInfo.location}}
            </div>
            <div class="col-md-2" v-for="(images , i) in allMaidsList.maidInfo.maid_paper" :key="i">
            
                    <img 
        :src="images.path"
        :lazy-src="images.path"
        aspect-ratio="1"
        class="grey lighten-2" height="100"/>
            </div>
        </v-row>
        <div v-for="items in allMaidsList.maidreviews" :key="items._id">
        <h3 class="text-h5 text-center mb-3">rate_average: {{items.rate_average}}</h3>
        <h3 class="text-h5 text-center mb-3">number of users reviews: {{items.reviews.length}}</h3>
        <h3 class="text-h5 text-center mb-3">number of users favourite: {{allFavouriteList.user_length.length}}</h3>
        <v-row >
            <v-col cols="12" sm="6" md="4" v-for="item in items.reviews" :key="item._id">
                <v-card  class="mb-2">
                    <v-card-text>
                        <div>comment : {{item.comment}}</div>
                        <div>rate :  
                        <v-col cols="12" style="padding:0 0.5rem">
                            <v-rating v-model="item.rate" icon-label="custom icon label text {0} of {1}"></v-rating>
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

    }),
    computed: {

    },


    methods: {
        ...mapActions(['getMaidWothReview','getFavourite']),
    },

    computed: {
        ...mapGetters(['allMaidsList','allFavouriteList']),
    },


    mounted() {
        this.getMaidWothReview(this.$route.params.id)
        this.getFavourite(this.$route.params.id)
    },
}
</script>
<style scoped>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>