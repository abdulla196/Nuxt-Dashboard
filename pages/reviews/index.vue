<template>
    <v-container class="mt-5">
        <div class="text-center my-3">
            <h2  class="title-head text-center">Review List</h2>
        </div>
        
        <!-- <template>
            <div class="">

                <v-card>
                    <v-card-title>
                        <span class="text-h5">Get review for maid</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <select v-model="Review.maids" outlined label="select user" required>
                                        <option value="" selected disabled>select maids</option>
                                        <option v-for="maids in allMaidsList.data" :key="maids._id" :value="maids._id">
                                            {{ maids.userName }}</option>
                                    </select>
                                </v-col>
                                <v-col>
                                    <v-btn 
  elevation="2" text @click="OnAddReview">
                       filter
                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    
                </v-card>
            </div>
        </template> -->
    <v-card-title>
      Reviews Search
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
      ></v-text-field>
    </v-card-title>
        <v-data-table :items="allReviewsList.data.data"
      :search="search" :headers="headers" 
             class="table100">
            <template #item.comment="{ value }">
                {{ value }}
            </template>
            <template #item.rate="{ value }">
                {{ value }}
            </template>
            <template #item.actions="{ item }">
                <td @click.stop class="non-clickable">
                    <v-btn :to="`/reviews/${item._id}`" class="btn-table">
                        <v-icon color="#ff9f3b" left>
                            {{ icons.mdiPencil }}
                        </v-icon>
                    </v-btn>
                    <!-- <v-btn :to="`/reviews/details/${item.maid_id}`" class="btn-table">
                        <v-icon color="#555">
                            {{ icons.mdiEye }}
                        </v-icon>
                    </v-btn> -->
                    <v-icon @click="Delete(item._id)" color="red">
                        {{ icons.mdiDelete }}
                    </v-icon>
                </td>
            </template>
        </v-data-table>
        <v-snackbar
          v-model="snackbar"
          absolute
          right
          color="#f68c28"
          rounded="pill"
          centered
    >
      {{ allReviewsList.message }}

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
    </v-container>
</template>

<script>
import {mdiPencil,mdiDelete,mdiEye } from '@mdi/js'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
        snackbar: false,
            Review:{
                maids:''
            },
            icons: {
                mdiPencil,
                mdiDelete,
                mdiEye
            },
            search: '',
            headers: [
                { text: 'comment', value: 'comment' },
                { text: 'rate', value: 'rate' },
                { text: 'Actions', value: 'actions', sortable: false},
            ],
        }
    },
  computed: {
    ...mapGetters(['allReviewsList','allMaidsList']),
  },
  methods:{
    ...mapActions(['getReviews', 'DeleteReviews','getMaids','GetforMaid']),
    Delete(id) {
            this.snackbar = true
      this.DeleteReviews(id)
    },
     OnAddReview() {
        this.GetforMaid(this.Review)
    },
  },
   mounted() { 
    this.getReviews()
    if(this.allMaidsList.data == ''){
        this.getMaids() 
    }
  },

}
</script>



<style scoped>
</style>
