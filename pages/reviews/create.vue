<template>
    <div class="">
        <div class="text-center my-3">
            <h2 class="title-head text-center">Create review</h2>
        </div>
        <v-card>
            <v-card-text>
                <v-container>
                    <v-row id="form">
                        <v-col cols="12" class="my-3">
                            <label>Select user</label>
                            <select v-model="Review.users" outlined label="select user" required>
                                <option value="" selected disabled>select user</option>
                                <option v-for="item in allUsersList.data" :key="item._id" :value="item._id">
                                    {{ item.userName }}</option>
                            </select>
                        </v-col>
                        <v-col cols="12" class="my-3">
                            <label>Select maids</label>
                            <select v-model="Review.maids" outlined label="select user" required>
                                <option value="" selected disabled>select maids</option>
                                <option v-for="maids in allMaidsList.data" :key="maids._id" :value="maids._id">
                                    {{ maids.userName }}</option>
                            </select>
                        </v-col>

                        <v-col cols="12" class="mt-3">
                            <v-textarea outlined label="comment" v-model="Review.comment" :value="Review.comment">
                            </v-textarea>
                        </v-col>
                        <v-col cols="12" style="padding:0 0.5rem">
                            <v-rating v-model="Review.rate" icon-label="custom icon label text {0} of {1}"></v-rating>
                        </v-col>

            <div class="col-12 text-center">
                <v-btn depressed color="primary" @click="OnAddReview">
                    save
                </v-btn>
            </div>
                    </v-row>
                </v-container>
            </v-card-text>

        </v-card><v-snackbar
          v-model="snackbar"
          absolute
          right
          color="#f68c28"
          rounded="pill"
          centered
    >
      {{ this.$store.state.Reviews.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
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
        snackbar: false,
            Review: {
                users: '',
                maids: '',
                rate: 0,
                comment: ''
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
        if(this.allUsersList.data == ''){
            this.getUsers() 
        }
        if(this.allMaidsList.data == ''){
            this.getMaids() 
        }
    },
}
</script>

<style>
select {
    appearance: none;
    outline: 0;
    background: #fff;
    background-image: none;
    width: 100%;
    height: 100%;
    color: black;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 3px;
}

select {
  border: 1px solid rgba(0, 0, 0, 0.42) !important;
}
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    background-image: none;
    border: 1px solid black;
}

select {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 0 0 .5em;
    color: #000;
    cursor: pointer;
}

select::-ms-expand {
    display: none;
}
</style>
