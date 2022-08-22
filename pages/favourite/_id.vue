<template>
  <div class="Adress">

    <v-card>
      <h2 class="title-head text-center">Edit favourite</h2>
      <v-card-text>
        <v-container>
          <v-row id="form">
            <v-col cols="12" class="my-3">
              <label>Select user</label>
              <select v-model="FavouriteEdit.user_id" outlined label="select user" required>
                <option selected disabled>select user</option>
                <option v-for="item in allUsersList.data" :key="item._id" s v-bind:value="item._id" v-bind:selected="item._id == FavouriteEdit.user_id">{{ item.userName }}</option>
              </select>
            </v-col>
            <v-col cols="12" class="my-3">
              <label>Select maids  </label>
              <select v-model="FavouriteEdit.maid_id" outlined label="select user" required>
                <option value="" selected disabled>select maids</option>
                <option v-for="maids in allMaidsList.data" :key="maids._id" v-bind:value="maids._id" v-bind:selected="maids._id == FavouriteEdit.maid_id">{{ maids.userName }}
                </option>
              </select>
            </v-col>
      <div class="col-12 text-center">
        <v-btn depressed color="primary" @click="UpdateReview">
          save
        </v-btn>
      </div>
          </v-row>
        </v-container>
      </v-card-text>

    </v-card>
        <v-snackbar
          v-model="snackbar"
          absolute
          right
          color="#f68c28"
          rounded="pill"
          centered
    >
      {{ allFavouriteList.message }}

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
  data: () => ({
        snackbar: false,
    FavouriteEdit: {
        user_id:'',
        maid_id:'',
        id:''
    },
  }),
  computed: {
   
  },


  methods: {
    ...mapActions(['updateFavourite','getoneFavourite', 'getUsers', 'getMaids']),

    completeUserData() {
      this.FavouriteEdit.user_id = this.allFavouriteList.oneFavourite.user_id
      this.FavouriteEdit.maid_id = this.allFavouriteList.oneFavourite.maid_id
      this.FavouriteEdit.id = this.$route.params.id
    },
    UpdateReview() {
            this.snackbar = true
        this.updateFavourite(this.FavouriteEdit);
    },
  },

  computed: {
    ...mapGetters(['allFavouriteList', 'allUsersList', 'allMaidsList']),
  },


  mounted() {
    this.getoneFavourite(this.$route.params.id)
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
  border: 1px solid rgba(0, 0, 0, 0.42) !important;
}
</style>
