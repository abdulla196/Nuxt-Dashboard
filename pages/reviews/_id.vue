<template>
  <div class="">
    <div class="text-center my-3">
      <h2 class="title-head text-center">Edit Review</h2>
    </div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row id="form">
              <v-col cols="12" class="my-3">
                <v-select
                  v-model="ReviewEdit.user_id"
                  :items="allUsersList.data"
                  item-text="userName"
                  item-value="_id"
                  :rules="[$rules.required, $rules.select]"
                  label="Select user"
                  attach
                  chips
                ></v-select>
              </v-col>
              <v-col cols="12" class="my-3">
                <v-select
                  v-model="ReviewEdit.maid_id"
                  :items="allMaidsList.data"
                  item-text="userName"
                  item-value="_id"
                  :rules="[$rules.required, $rules.select]"
                  label="Select maids"
                  attach
                  chips
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  label="comment"
                  v-model="ReviewEdit.comment"
                  :value="ReviewEdit.comment"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-rating
                  v-model="ReviewEdit.rate"
                  color="gold"
                  :rules="[$rules.required]"
                  icon-label="custom icon label text {0} of {1}"
                ></v-rating>
              </v-col>
              <div class="col-12 text-center">
                <v-btn
                  depressed
                  :disabled="!valid"
                  color="primary"
                  @click="UpdateReview"
                >
                  save
                </v-btn>
              </div>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>

    <v-snackbar
      v-if="this.$store.state.Reviews.flag == 'success'"
      v-model="snackbar"
      absolute
      bottom
      color="#139f5d"
      rounded="pill"
      centered
    >
      Successfully Updated
      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
          <b>X</b>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-else-if="this.$store.state.Reviews.flag == 'fail'"
      v-model="snackbar"
      absolute
      bottom
      color="#cf2e2e"
      rounded="pill"
      centered
    >
      Cant Update This Record

      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
          <b>X</b>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-else
      v-model="snackbar"
      absolute
      bottom
      color="#cf942e"
      rounded="pill"
      centered
    >
      Loading

      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
          <b>X</b>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    ReviewEdit: {
      comment: '',
      rate: 0,
      user_id: '',
      maid_id: '',
      id: '',
    },
  }),
  computed: {},

  methods: {
    ...mapActions(['updateReviews', 'getoneReviews', 'getUsers', 'getMaids']),

    completeUserData() {
      //console.log(this.allReviewsList)
      this.ReviewEdit.comment = this.allReviewsList.oneReviews.comment
      this.ReviewEdit.rate = this.allReviewsList.oneReviews.rate
      this.ReviewEdit.user_id = this.allReviewsList.oneReviews.user_id
      this.ReviewEdit.maid_id = this.allReviewsList.oneReviews.maid_id
      this.ReviewEdit.id = this.$route.params.id
    },
    UpdateReview() {
      this.snackbar = true
      this.updateReviews(this.ReviewEdit)
    },
  },

  computed: {
    ...mapGetters(['allReviewsList', 'allUsersList', 'allMaidsList']),
  },

  mounted() {
    this.getoneReviews(this.$route.params.id)
    if (this.allUsersList.data == '') {
      this.getUsers()
    }
    if (this.allMaidsList.data == '') {
      this.getMaids()
    }
    setTimeout(() => this.completeUserData(), 1000)
  },
}
</script>

<style></style>
