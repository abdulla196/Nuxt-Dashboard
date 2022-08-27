<template>
  <div class="Adress">
    <v-card>
      <h2 class="title-head text-center">Edit Notification</h2>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row id="form">
              <v-col cols="12">
                <v-text-field
                  v-model="NotificationEdit.subject"
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
                  v-model="NotificationEdit.content"
                  :value="NotificationEdit.content"
                  :rules="[$rules.required]"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="NotificationEdit.users"
                  :items="allUsersList.data"
                  item-text="userName"
                  item-value="_id"
                  :rules="[$rules.required, $rules.select]"
                  label="Select user"
                  attach
                  chips
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  v-model="NotificationEdit.priority"
                  row
                  :rules="[$rules.required]"
                >
                  <v-radio label="low" value="low"></v-radio>
                  <v-radio label="high" value="high"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="NotificationEdit.is_clicked"
                  label="is clicked ?"
                ></v-checkbox>
              </v-col>
              <div class="col-12 text-center">
                <v-btn
                  depressed
                  color="primary"
                  :disabled="!valid"
                  @click="UpdateUNotifi"
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
      Successfully Updated
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
      Cant Update This Record

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
  name: 'IndexPage',
  data() {
    return {
      valid: true,
      snackbar: false,
      NotificationEdit: {
        content: '',
        subject: '',
        priority: null,
        users: [],
        is_clicked: false,
        id: this.$route.params.id,
      },
    }
  },
  methods: {
    ...mapActions(['updateNotification', 'getoneNotification', 'getUsers']),

    completeUserData() {
      console.log(this.allnotificationList)
      this.NotificationEdit.subject =
        this.allnotificationList.oneNotification.subject
      this.NotificationEdit.content =
        this.allnotificationList.oneNotification.content
      this.NotificationEdit.is_clicked =
        this.allnotificationList.oneNotification.is_clicked
      this.NotificationEdit.users.push(
        this.allnotificationList.oneNotification.user_id
      )
      this.NotificationEdit.priority =
        this.allnotificationList.oneNotification.priority
      this.NotificationEdit.id = this.$route.params.id
    },

    UpdateUNotifi() {
      this.snackbar = true
      this.updateNotification(this.NotificationEdit)
    },
  },
  computed: {
    ...mapGetters(['allnotificationList', 'allUsersList']),
  },
  mounted() {
    this.getoneNotification(this.$route.params.id)
    setTimeout(() => this.completeUserData(), 1000)
    if (this.allUsersList.data == '') {
      this.getUsers()
    }
  },
}
</script>

<style scoped></style>
