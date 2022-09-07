<template>
  <v-container class="mt-5">
    <div class="text-center my-5">
      <h2 class="title-head text-center">Favourite List</h2>
    </div>

    <v-card-title>
      Favourite Search
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :items="allFavouriteList.data.data"
      :search="search"
      :headers="headers"
      class="table100"
    >
      <template #item.maid_id="{ value }">
        {{ value }}
      </template>
      <template #item.user_id="{ value }">
        {{ value }}
      </template>
      <template #item.actions="{ item }">
        <td @click.stop class="non-clickable">
          <v-btn :to="`/favourite/${item._id}`" class="btn-table">
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
      v-if="allFavouriteList.flag == 'success'"
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
      v-else-if="allFavouriteList.flag == 'fail'"
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
        { text: 'Maid Id', value: 'maid_id' },
        { text: 'User Id', value: 'user_id' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    ...mapGetters(['allFavouriteList']),
  },
  methods: {
    ...mapActions(['getFavourite', 'DeleteFavourite']),
    Delete(id) {
      this.snackbar = true
      this.DeleteFavourite(id)
    },
  },
  mounted() {
    this.getFavourite()
  },
}
</script>

<style scoped></style>
