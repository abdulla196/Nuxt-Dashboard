<template>
  <div class="">
    <div class="text-center my-3">
      <h2 class="title-head text-center">Create review</h2>
    </div>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row id="form">
              <v-col cols="12" class="my-3">
                <v-select
                  v-model="Review.users"
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
                  v-model="Review.maids"
                  :items="allMaidsList.data"
                  item-text="userName"
                  item-value="_id"
                  :rules="[$rules.required, $rules.select]"
                  label="Select maids"
                  attach
                  chips
                ></v-select>
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-textarea
                  outlined
                  label="comment"
                  v-model="Review.comment"
                  :value="Review.comment"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" style="padding: 0 0.5rem">
                <v-rating
                  v-model="Review.rate"
                  :rules="[$rules.required]"
                  icon-label="custom icon label text {0} of {1}"
                ></v-rating>
              </v-col>

              <div class="col-12 text-center">
                <v-btn
                  depressed
                  :disabled="!valid"
                  color="primary"
                  @click="OnAddReview"
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
      Successfully Created
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
      Cant Create This Record

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
  data() {
    return {
      valid: true,
      snackbar: false,
      Review: {
        users: '',
        maids: '',
        rate: 0,
        comment: '',
      },
    }
  },
  computed: {
    ...mapGetters(['allReviewList', 'allUsersList', 'allMaidsList']),
  },
  methods: {
    ...mapActions(['AddReview', 'getUsers', 'getMaids']),

    OnAddReview() {
      this.snackbar = true
      this.AddReview(this.Review)
    },
  },
  mounted() {
    if (this.allUsersList.data == '') {
      this.getUsers()
    }
    if (this.allMaidsList.data == '') {
      this.getMaids()
    }
  },
}
</script>

<style></style>
