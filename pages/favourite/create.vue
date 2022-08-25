<template>
  <div class="Adress">

    <v-card>
      <h2 class="title-head text-center">Create favourite</h2>
      <v-card-text>
        <v-container>
          <v-row id="form">
            <v-col cols="12" class="my-3"> 
              <v-select  v-model="Favourite.users"
                  :items="allUsersList.data"
                  item-text="userName"
                  item-value="_id" :rules="[ $rules.required, $rules.select]" label="Select user"></v-select>
            </v-col>
            <v-col cols="12" class="my-3"> 
              
              <v-select  v-model="Favourite.maids"
                  :items="allMaidsList.data"
                  item-text="userName"
                  item-value="_id" :rules="[ $rules.required, $rules.select]" label="Select maids"></v-select>
              
            </v-col>
            <div class="col-12 text-center">
              <v-btn depressed color="primary" @click="OnAddFavourite">
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
  data() {
    return {
        snackbar: false,
      Favourite: {
        users: '',
        maids: ''
      },
    }
  },
  computed: {
    ...mapGetters(['allFavouriteList', 'allUsersList', 'allMaidsList']),
  },
  methods: {
    ...mapActions(['AddFavourite', 'getUsers', 'getMaids']),

    OnAddFavourite() {
            this.snackbar = true
      this.AddFavourite(this.Favourite)
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