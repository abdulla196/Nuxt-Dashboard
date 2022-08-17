<template>
    <v-container class="mt-5">
        <div class="text-center my-3">
            <h2  class="title-head text-center">Review List</h2>
        </div>
        <template>
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
        </template>

        <v-simple-table  class="table100">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">
                            id
                        </th>
                        <th class="text-center">
                            comment
                        </th>
                        <th class="text-center">
                            rate
                        </th>
                        <th class="text-center">
                            action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allReviewsList.data.data" :key="item._id">
                        <td class="text-center">{{ item._id }}</td>
                        <td class="text-center">{{ item.comment }}</td>
                        <td class="text-center">{{ item.rate }}</td> 
                        <td class="text-center">
                            <v-row justify="center">
                                <NuxtLink :to="localePath('/reviews/'+item._id)">
                                    <v-icon color="#ff9f3b" left>
                                        {{ icons.mdiPencil }}
                                    </v-icon>
                                </NuxtLink>
                                <v-icon 
                                    @click="Delete(item._id)"
                                    color="red">
                                    {{ icons.mdiDelete }}
                                </v-icon>
                                
                                <NuxtLink :to="localePath('/reviews/details/'+item.maid_id)">
                                    <v-icon left>
                                        {{ icons.mdiEye }}
                                    </v-icon>
                                </NuxtLink>
                            </v-row>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
import {mdiPencil,mdiDelete,mdiEye } from '@mdi/js'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            Review:{
                maids:''
            },
            icons: {
                mdiPencil,
                mdiDelete,
                mdiEye
            }, 
        }
    },
  computed: {
    ...mapGetters(['allReviewsList','allMaidsList']),
  },
  methods:{
    ...mapActions(['getReviews', 'DeleteReviews','getMaids','GetforMaid']),
    Delete(id) {
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
