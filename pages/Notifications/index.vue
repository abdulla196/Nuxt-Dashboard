<template>
    <v-container class="mt-5">
        <div class="text-center my-3">
            <h2  class="title-head text-center">Notification List</h2>
        </div>
        <v-simple-table class="table100">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">
                            id
                        </th>
                        <th class="text-center">
                            subject
                        </th>
                        <th class="text-center">
                            content
                        </th>
                        <th class="text-center">
                            clicked
                        </th>
                        <th class="text-center">
                            userName
                        </th>
                        <th class="text-center">
                            user Id
                        </th>
                        <th class="text-center">
                            priority
                        </th>
                        <th class="text-center">
                            action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allnotificationList.data.data" :key="item._id">
                        <td class="text-center" v-if="item.priority == 'low'" style="background:#95ff95">{{ item._id }}</td>
                        <td class="text-center" v-if="item.priority == 'high'" style="background:red">{{ item._id }}</td>
                        <td class="text-center" v-if="item.priority == 'low'"  style="background:#95ff95">{{ item.subject }}</td>
                        <td class="text-center" v-if="item.priority == 'high'"  style="background:red">{{ item.subject }}</td>
                        <td class="text-center" v-if="item.priority == 'low'" style="background:#95ff95">{{ item.content }}</td> 
                        <td class="text-center" v-if="item.priority == 'high'" style="background:red">{{ item.content }}</td> 
                        <td class="text-center" v-if="item.priority == 'low'" style="background:#95ff95">{{ item.is_clicked }}</td> 
                        <td class="text-center" v-if="item.priority == 'high'" style="background:red">{{ item.is_clicked }}</td> 
                        <td class="text-center" v-if="item.user_id">{{ item.user_id.userName }}</td>
                        <td v-else></td>
                        <td class="text-center"  v-if="item.user_id">{{ item.user_id._id }}</td>
                        <td v-else></td>
                        <td class="text-center" v-if="item.priority == 'low'" style="background:#95ff95">{{ item.priority }}</td> 
                        <td class="text-center" v-if="item.priority == 'high'" style="background:red">{{ item.priority }}</td> 
                        <td class="text-center">
                            <v-row justify="center">
                                <NuxtLink :to="localePath('/Notifications/'+item._id)">
                                    <v-icon color="#ff9f3b" left>
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
export default {
    data() {
        return {
            icons: {
                mdiPencil,
                mdiDelete,
            }, 
        }
    },
  computed: {
    ...mapGetters(['allnotificationList']),
  },
  methods:{
    ...mapActions(['getNotification', 'DeleteNotification']),
    Delete(id) {
      this.DeleteNotification(id)
    },
  },
   mounted() { 
    this.getNotification()
  },

}
</script>



<style scoped>
</style>
