<template>
  <v-container class="mt-5">
    <div class="text-center my-3">
      <h2 class="title-head text-center">Notification List</h2>
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
    <v-data-table
      :items="allnotificationList.data.data"
      :search="search"
      :headers="headers"
      class="table100"
    >
      <template v-slot:item.="{ item, index }">
        {{ index + 1 }}
      </template>
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

      <template #item.priority="{ value }">
        <p
          style="
            background: #c42c21d2;
            height: 75%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          "
          v-if="value == 'high'"
        >
          {{ value }}
        </p>

        <p
          style="
            background: #28b728b9;
            height: 75%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          "
          v-else
        >
          {{ value }}
        </p>
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
      v-if="allnotificationList.flag == 'success'"
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
      v-else-if="allnotificationList.flag == 'fail'"
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
        { text: 'index', value: '' },
        { text: 'subject', value: 'subject' },
        { text: 'content', value: 'content' },
        { text: 'is_clicked', value: 'is_clicked' },
        { text: 'userName', value: 'user_id.userName' },

        { text: 'priority', value: 'priority' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    ...mapGetters(['allnotificationList']),
  },
  methods: {
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

<style scoped></style>
