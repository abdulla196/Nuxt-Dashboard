<template>
  <div class="Adress">

    <v-card>
        <h2 class="text-h5 text-center">Forget Password</h2>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="forgetpassword.email" label="E-mail" outlined required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <div class="col-12 text-center">
        <v-btn depressed color="#f68c28" @click="AddForgetPassword">
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
      forgetpassword: {
        email: ''
      },
    }
  },
  methods: {
    ...mapActions(['forgetpass']),

    AddForgetPassword() {
      this.forgetpass(this.forgetpassword)
    },
  },
  mounted() {

  },
}
</script>

<style>
</style>
