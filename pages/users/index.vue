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
    <v-data-table
      :items="allUsersList.data"
      :search="search"
      :headers="headers"
      class="table100"
    >
      <template v-slot:item.="{ item, index }">
        {{ index + 1 }}
      </template>
      <template #item.userName="{ value }">
        {{ value }}
      </template>
      <template #item.phone="{ value }">
        {{ value }}
      </template>
      <template #item.email="{ value }">
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
      v-if="allUsersList.flag == 'success'"
      v-model="snackbar"
      absolute
      bottom
      color="#139f5d"
      rounded="pill"
      centered
    >
      Successfully Deleted
      <template v-slot:action="{ attrs }">
        <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
          <b>X</b>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-else-if="allUsersList.flag == 'fail'"
      v-model="snackbar"
      absolute
      bottom
      color="#cf2e2e"
      rounded="pill"
      centered
    >
      Cant Delete This Record

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
        { text: 'index', value: '' },
        { text: 'Name', value: 'userName' },
        { text: 'phone', value: 'phone' },
        { text: 'Email', value: 'email' },

        { text: 'location', value: 'location' },
        { text: 'type', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false },
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
