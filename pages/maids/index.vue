<template>
    <v-container>
        <v-simple-table class="table100">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">
                            Name
                        </th>
                        <th class="text-center">
                            Phone
                        </th>
                        <th class="text-center">
                            email
                        </th> 
                        <th class="text-center">details</th>
                        <th class="text-center">location</th>
                        <th class="text-center">type</th>
                        <th class="text-center">
                            action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allMaidsList.data" :key="item._id">
                        <td class="text-center">{{ item.userName }}</td>
                        <td class="text-center">{{ item.phone }}</td>
                        <td class="text-center">{{ item.email }}</td>
                        <td class="text-center">{{ item.details }}</td>
                        <td class="text-center">{{ item.location }}</td>
                        <td class="text-center">{{ item.type }}</td>
                        <td class="text-center">
                            <v-row justify="center">
                                <NuxtLink :to="localePath('/maids/'+item._id)">
                                    <v-icon left>
                                        {{ icons.mdiPencil }}
                                    </v-icon>
                                </NuxtLink>
                                
                                <NuxtLink :to="localePath('/maids/details/'+item._id)">
                                    <v-icon left>
                                        {{ icons.mdiEye }}
                                    </v-icon>
                                </NuxtLink>
                                <v-btn
                                    fab
                                    dark
                                    small
                                    :rounded="false" 
                                    @click="Delete(item._id)"
                                    color="red"
                                    text
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-row>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
 import {mdiPencil,mdiDelete,mdiEye} from '@mdi/js'
import { mapActions, mapGetters } from 'vuex'
import Loading from '../../components/tools/loadingP.vue'
export default {
    data() {
        return {
            icons: {
                mdiPencil,
                mdiDelete,
                mdiEye
            }, 
        }
    },
     components: {
    Loading,
  },
  computed: {
    ...mapGetters(['allMaidsList']),
  },
  methods:{
    ...mapActions(['getMaids','DeleteMids']),
    
     Delete(id) {
      this.DeleteMids(id)
    },

  },
   mounted() { 
    if(this.allMaidsList.data == ''){
        this.getMaids() 
    }
  },

}
</script>



<style scoped>

.table100 th {
    color: #fff !important;
    background-color: #6c7ae0;
}
.table100 td {
    color: #808080;
}
.table100 tr:nth-child(even) {
    background-color: #f8f6ff;
}
</style>
