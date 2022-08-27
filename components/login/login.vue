<template>
  <div class="page container_cc">
    <div class="login">
      <h1>{{ $t('Login') }}</h1>

      <div class="form_login_cc" id="form">
        <div class="form_login">
          <div class="form_title">
            <div class="mb-5">
              {{ $t('Enter your login information to continue') }}
            </div>
          </div>

          <div class="form">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="data.userName"
                :rules="[$rules.required]"
                :label="$t('userName')"
                required
                outlined
                dense
              ></v-text-field>
              <!-- $rules.number -->
              <v-text-field
                v-model="data.password"
                :append-icon="showPasswordLogin ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[$rules.required]"
                :type="showPasswordLogin ? 'text' : 'password'"
                :label="$t('Password')"
                @click:append="showPasswordLogin = !showPasswordLogin"
                required
                outlined
                dense
              ></v-text-field>

              <Msg api="login" />
              <NuxtLink :to="localePath('/forgetpassword')"
                >Forget Password</NuxtLink
              >
              <v-btn
                :disabled="!valid"
                color="#f68c28"
                class="button_login"
                @click="OnLogin"
                :loading="allAuth.loading"
                type="submit"
              >
                {{ $t('Login') }}
              </v-btn>
            </v-form>
          </div>

          <v-snackbar
            v-if="this.$store.state.auth.login_flag"
            v-model="snackbar"
            absolute
            bottom
            color="#139f5d"
            rounded="pill"
            centered
          >
            {{ this.$store.state.auth.errorMesage }}
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
            color="#cf2e2e"
            rounded="pill"
            centered
          >
            {{ this.$store.state.auth.errorMesage }}

            <template v-slot:action="{ attrs }">
              <v-btn color="#fff" text v-bind="attrs" @click="snackbar = false">
                <b>X</b>
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Msg from '../tools/msgApi.vue'
export default {
  components: {
    Msg,
  },
  head() {
    return {
      title: this.$i18n.t('Login'),
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'todos description',
          name: 'todos description',
          content: 'todos My custom description',
        },
      ],
    }
  },
  data() {
    return {
      login_flag: true,
      snackbar: false,
      loading: false,
      valid: false,
      showPasswordLogin: false,
      data: {
        password: '',
        userName: '',
      },
    }
  },
  computed: {
    ...mapGetters(['allAuth']),
  },
  methods: {
    ...mapActions(['LoginAction']),

    OnLogin(e) {
      e.preventDefault()
      if (this.$refs.form.validate() === false) return false

      setTimeout(() => (this.snackbar = true))
      this.LoginAction(this.data)
    },
  },
}
</script>

<style scoped>
.login {
  margin-top: 24px;
  padding: 20px;
}
.login h1 {
  text-align: center;
}
.form_login_cc {
  max-width: 500px;
  background: #fff;
  margin: auto;
  margin-top: 40px;
  padding: 20px;
  box-shadow: 0 3px 4px 0 rgb(0 0 0 / 5%);
  border: 1px solid #f4f4f4;
  border-radius: 5px;
}
.button_login {
  width: 100%;
  margin-top: 30px;
}
</style>
