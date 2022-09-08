<template>
  <v-container>
    <div style="margin-bottom: 5rem">
      <h2 class="title-head text-center my-3">review For maid</h2>

      <div>
        <h3
          class="text-h5 text-center mb-3"
          v-if="allReviewsList.data.rate_average"
        >
          <span class="infomaid">Rate Average</span>
          <v-rating
            :value="allReviewsList.data.rate_average"
            readonly
          ></v-rating>
        </h3>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="item in allReviewsList.data.reviews"
            :key="item._id"
          >
            <v-card class="mb-2">
              <v-card-text>
                <div>comment : {{ item.comment }}</div>
                <div>
                  rate :
                  <v-col cols="12" style="padding: 0 0.5rem">
                    <v-rating
                      v-model="item.rate"
                      icon-label="custom icon label text {0} of {1}"
                    ></v-rating>
                  </v-col>
                </div>
                <div class="row">
                  <div class="col-6" v-for="user in item.user" :key="user._id">
                    user Name : {{ user.userName }}
                  </div>
                  <div class="col-6" v-for="maid in item.maid" :key="maid._id">
                    Maid Name : {{ maid.userName }}
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
    rate: 0,
  }),
  computed: {},

  methods: {
    ...mapActions(['getReviewsForMaid']),
  },

  computed: {
    ...mapGetters(['allReviewsList']),
  },

  mounted() {
    //console.log(this.$route.params.id)
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
