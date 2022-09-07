<template>
  <div class="Adress">
    <v-card>
      <h2 class="title-head text-center">Create favourite</h2>
      <v-card-text>
        <v-container>
          <v-row id="form">
            <v-col cols="12" class="my-3">
              <v-select
                v-model="Favourite.users"
                :items="allUsersList.data"
                item-text="userName"
                item-value="_id"
                :rules="[$rules.required, $rules.select]"
                label="Select user"
              ></v-select>
            </v-col>
            <v-col cols="12" class="my-3">
              <v-select
                v-model="Favourite.maids"
                :items="allMaidsList.data"
                item-text="userName"
                item-value="_id"
                :rules="[$rules.required, $rules.select]"
                label="Select maids"
              ></v-select>
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
      v-if="allFavouriteList.flag == 'success'"
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
      v-else-if="allFavouriteList.flag == 'fail'"
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
      snackbar: false,
      Favourite: {
        users: '',
        maids: '',
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
    if (this.allUsersList.data == '') {
      this.getUsers()
    }
    if (this.allMaidsList.data == '') {
      this.getMaids()
    }
  },
}
</script>
