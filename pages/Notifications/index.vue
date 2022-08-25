<template>
    <v-container class="mt-5">
        <div class="text-center my-3">
            <h2  class="title-head text-center">Notification List</h2>
        </div>
        <v-card-title>
      Notification Search
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
      ></v-text-field>
    </v-card-title>
        <v-data-table :items="allnotificationList.data.data"
      :search="search" :headers="headers" 
             class="table100">
            <template #item.subject="{ value }">
                {{ value }}
            </template>
            <template #item.content="{ value }">
                {{ value }}
            </template>
            <template #item.is_clicked="{ value }">
                {{ value }}
            </template>
            <template #item.userName="{ value }">
                {{ value }}
            </template>
            <template #item.user_id="{ value }">
                {{ value }}
            </template>
            <template #item.priority="{ value }">
                {{ value }}
            </template>
            <template #item.actions="{ item }">
                <td @click.stop class="non-clickable">
                    <v-btn :to="`/Notifications/${item._id}`" class="btn-table">
                        <v-icon color="#ff9f3b" left>
                            {{ icons.mdiPencil }}
                        </v-icon>
                    </v-btn>
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
      {{ allnotificationList.message }}

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
import {mdiPencil,mdiDelete} from '@mdi/js'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
        snackbar: false,
            icons: {
                mdiPencil,
                mdiDelete,
            }, 
            search: '',
            headers: [
                { text: 'subject', value: 'subject' },
                { text: 'content', value: 'content' },
                { text: 'is_clicked', value: 'is_clicked' },
                { text: 'userName', value: 'user_id.userName' },
                { text: 'user_id', value: 'user_id._id' },
                { text: 'priority', value: 'priority' },
                { text: 'Actions', value: 'actions', sortable: false},
            ],
        }
    },
  computed: {
    ...mapGetters(['allnotificationList']),
  },
  methods:{
    ...mapActions(['getNotification', 'DeleteNotification']),
    Delete(id) {
            this.snackbar = true
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
