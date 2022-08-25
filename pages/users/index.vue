<template>
    <v-container>
        <div class="text-center my-5">
            <h2 class="title-head text-center">Users List</h2>
        </div>
        
    <v-card-title>
      Users Search
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
      ></v-text-field>
    </v-card-title>
        <v-data-table :items="allUsersList.data"
      :search="search" :headers="headers" 
      item-key="userName"
             class="table100">
            <template #item.userName="{ value }">
                {{ value }}
            </template>
            <template #item.phone="{ value }">
                {{ value }}
            </template>
            <template #item.email="{ value }">
                {{ value }}
            </template>
            <template #item.details="{ value }">
                {{ value }}
            </template>
            <template #item.location="{ value }">
                {{ value }}
            </template>
            <template #item.type="{ value }">
                {{ value }}
            </template>
            <template #item.actions="{ item }">
                <td @click.stop class="non-clickable">
                    <v-btn :to="`/users/${item._id}`" class="btn-table">
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
      {{ allUsersList.message }}

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
import { mdiPencil, mdiDelete } from '@mdi/js'
import { mapActions, mapGetters } from 'vuex'
import Loading from '../../components/tools/loadingP.vue'
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
                { text: 'Name', value: 'userName' },
                { text: 'phone', value: 'phone' },
                { text: 'Email', value: 'email' },
                { text: 'details', value: 'details' },
                { text: 'location', value: 'location' },
                { text: 'type', value: 'type' },
                { text: 'Actions', value: 'actions', sortable: false},
            ],
        }
    },
    components: {
        Loading,
    },
    computed: {
        ...mapGetters(['allUsersList']),


    },
    methods: {
        ...mapActions(['getUsers', 'DeleteUser']),
        Delete(id) {
            this.snackbar = true
            this.DeleteUser(id)
        },
    },
    mounted() {
        this.getUsers()
    },

}
</script>


