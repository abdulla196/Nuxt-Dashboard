<template>
    <div class="">

        <v-card>
            <h2 class="text-h5 text-center">edit review</h2>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="ReviewEdit.user_id" disabled label="User id" outlined required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="ReviewEdit.maid_id" disabled label="maid id" outlined required></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea outlined label="comment" v-model="ReviewEdit.comment" :value="ReviewEdit.comment">
                            </v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-rating v-model="ReviewEdit.rate" icon-label="custom icon label text {0} of {1}"></v-rating>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>

            <div class="col-12 text-center">
                <v-btn depressed color="primary" @click="UpdateReview">
                    save
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    ReviewEdit: {
        comment: '',
        rate: 0,
        user_id:'',
        maid_id:'',
        id:''
    },
  }),
  computed: {
   
  },


  methods: {
    ...mapActions(['updateReviews','getoneReviews', 'getUsers', 'getMaids']),

    completeUserData() {
        console.log(this.allReviewsList)
      this.ReviewEdit.comment = this.allReviewsList.oneReviews.comment
      this.ReviewEdit.rate = this.allReviewsList.oneReviews.rate
      this.ReviewEdit.user_id = this.allReviewsList.oneReviews.user_id
      this.ReviewEdit.maid_id = this.allReviewsList.oneReviews.maid_id
      this.ReviewEdit.id = this.$route.params.id
    },
    UpdateReview() {
        console.log(this.ReviewEdit)
        this.updateReviews(this.ReviewEdit);
    },
  },

  computed: {
    ...mapGetters(['allReviewsList', 'allUsersList', 'allMaidsList']),
  },


  mounted() {
    this.getoneReviews(this.$route.params.id)
    if(this.allUsersList.data == ''){
        this.getUsers() 
    }
    if(this.allMaidsList.data == ''){
        this.getMaids() 
    }
    setTimeout(() => this.completeUserData(), 1000);
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
