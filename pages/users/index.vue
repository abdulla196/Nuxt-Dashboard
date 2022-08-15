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
                    <tr v-for="item in allUsersList.data" :key="item._id">
                        <td class="text-center">{{ item.userName }}</td>
                        <td class="text-center">{{ item.phone }}</td>
                        <td class="text-center">{{ item.email }}</td>
                        <td class="text-center">{{ item.details }}</td>
                        <td class="text-center">{{ item.location }}</td>
                        <td class="text-center">{{ item.type }}</td>
                        <td class="text-center">
                            <v-row justify="center">
                                <NuxtLink :to="localePath('/users/'+item._id)">
                                    <v-icon left>
                                        {{ icons.mdiPencil }}
                                    </v-icon>
                                </NuxtLink>
                                <v-icon 
                                    @click="Delete(item._id)"
                                    color="red">
                                    {{ icons.mdiDelete }}
                                </v-icon>
                            </v-row>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
 import {mdiPencil,mdiDelete} from '@mdi/js'
import { mapActions, mapGetters } from 'vuex'
import Loading from '../../components/tools/loadingP.vue'
export default {
    data() {
        return {
            icons: {
                mdiPencil,
                mdiDelete,
            }, 
        }
    },
     components: {
    Loading,
  },
  computed: {
    ...mapGetters(['allUsersList']),
  },
  methods:{
    ...mapActions(['getUsers','DeleteUser']),
     Delete(id) {
      this.DeleteUser(id)
    },
  },
   mounted() { 
    this.getUsers()
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
