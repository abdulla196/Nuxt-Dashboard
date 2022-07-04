<template>

  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field label="phone" prefix="" outlined v-model="MaidsEdit.phone" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="location" v-model="MaidsEdit.location" required outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="details" prefix="" outlined v-model="MaidsEdit.details" required></v-text-field>
        </v-col>
        <v-col cols="6">
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="MaidsEdit.birthday"
                    label="Birthday date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="MaidsEdit.birthday"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-text-field label="price" prefix="" outlined v-model="MaidsEdit.price" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="userName" v-model="MaidsEdit.userName" required outlined></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field label="email" v-model="MaidsEdit.email" required outlined></v-text-field>
        </v-col>
        <div class="col-12 text-center">
          <v-btn depressed color="primary" @click="updateuser">
            save
          </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-card-text>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    activePicker: null,
    menu: false,
    MaidsEdit: {
      phone: '',
      location: '',
      details: '',
      birthday: '',
      price: '',
      userName: '',
      email: '',
      id: ''
    },
  }),
  computed: {

  },
  
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    ...mapActions(['updateUsers', 'getoneUser']),
    save (date) {
        this.MaidsEdit.birthday = date
        this.$refs.menu.save(this.MaidsEdit.birthday)
    },
    completeMaidsData() {
      console.log(this.allUsersList.data)
      this.MaidsEdit.phone = this.allUsersList.data.phone
      this.MaidsEdit.location = this.allUsersList.data.location
      this.MaidsEdit.details = this.allUsersList.data.details
      this.MaidsEdit.birthday = this.allUsersList.data.birthday
      this.MaidsEdit.price = this.allUsersList.data.price
      this.MaidsEdit.userName = this.allUsersList.data.userName
      this.MaidsEdit.email = this.allUsersList.data.email
      this.MaidsEdit.id = this.$route.params.id
    },
    updateuser() {
      console.log(this.MaidsEdit)
      this.updateUsers(this.MaidsEdit);
    },
  },

  computed: {
    ...mapGetters(['allUsersList']),
  },


  mounted() {
    this.getoneUser(this.$route.params.id)
    setTimeout(() => this.completeMaidsData(), 1000);
  },
}
</script>


<style>
</style>
