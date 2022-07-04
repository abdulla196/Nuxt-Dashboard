
<template>
<v-container>
    
    <div style="margin-bottom:5rem">
        <h2 class="text-h5 text-center my-3"> review For maid</h2>

        <div  v-for="items in allReviewsList.data" :key="items._id">
        <h3 class="text-h5 text-center mb-3">rate_average: {{items.rate_average}}</h3>
        <v-row >
            <v-col cols="12" sm="6" md="4" v-for="item in items.reviews" :key="item._id">
                <v-card  class="mb-2">
                    <v-card-text>
                        <div>comment : {{item.comment}}</div>
                        <div>rate : {{item.rate}}</div>
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
        ...mapActions(['getReviewsForMaid']),
    },

    computed: {
        ...mapGetters(['allReviewsList']),
    },


    mounted() {
        console.log(this.$route.params.id)
        this.getReviewsForMaid(this.$route.params.id)
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