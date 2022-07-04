<template>
  <div class="Adress">

    <v-card>
        <h2 class="text-h5 text-center">Add Notification</h2>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="notification.subject" label="subject" outlined required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Content"
                v-model="notification.content"
                :value="notification.content"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-checkbox v-model="notification.is_clicked" label="is clicked ?"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <div class="col-12 text-center">
        <v-btn depressed color="primary" @click="OnAddNotification">
          save
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      notification: {
        content: '',
        subject: '',
        is_clicked: false
      },
    }
  },
  computed: {
    ...mapGetters(['allnotificationList']),
  },
  methods: {
    ...mapActions(['Addnotification']),

    OnAddNotification() {
      this.Addnotification(this.notification)
    },
  },
  mounted() {

  },
}
</script>

<style>
</style>
