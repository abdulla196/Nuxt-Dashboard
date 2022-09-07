<template>
  <div class="Adress">
    <v-card>
      <h2 class="title-head text-center">Create Notification</h2>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row id="form">
              <v-col cols="12">
                <v-text-field
                  v-model="notification.subject"
                  label="subject"
                  :rules="[$rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  label="Content"
                  v-model="notification.content"
                  :value="notification.content"
                  :rules="[$rules.required, $rules.select]"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="notification.users"
                  :items="allUsersList.data"
                  item-text="userName"
                  item-value="_id"
                  :rules="[$rules.required]"
                  label="Select user"
                  attach
                  chips
                  multiple
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  v-model="notification.priority"
                  row
                  :rules="[$rules.required]"
                >
                  <v-radio
                    class="low"
                    label="low"
                    value="low"
                    color="green"
                  ></v-radio>
                  <v-radio
                    class="high"
                    color="#f00"
                    label="high"
                    value="high"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="notification.is_clicked"
                  label="is clicked ?"
                ></v-checkbox>
              </v-col>
              <div class="col-12 text-center">
                <v-btn
                  depressed
                  :disabled="!valid"
                  color="primary"
                  @click="OnAddNotification"
                >
                  save
                </v-btn>
              </div>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-if="allnotificationList.flag == 'success'"
      v-model="snackbar"
      absolute
      bottom
      color="#139f5d"
      rounded="pill"
      centered
    >
      Successfully Created
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
      Cant Create This Record

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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      snackbar: false,
      items: [],
      notification: {
        content: '',
        subject: '',
        priority: null,
        users: [],
        is_clicked: false,
      },
    }
  },
  computed: {
    ...mapGetters(['allnotificationList', 'allUsersList']),
  },
  methods: {
    ...mapActions(['Addnotification', 'getUsers']),

    OnAddNotification() {
      this.snackbar = true
      this.Addnotification(this.notification)
    },
  },
  mounted() {
    if (this.allUsersList.data == '') {
      this.getUsers()
    }
  },
}
</script>

<style>
.v-radio.high label {
  color: #f00 !important;
}
.v-radio.low label {
  color: green !important;
}
</style>
