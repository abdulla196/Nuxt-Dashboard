<template>
    <div class="page container_cc user">
        <div class="title_page">
            <h1>{{ $t("My Account") }}</h1>
        </div>

        <v-row no-gutters>
            <v-col cols="12" md="4">
                <template>
                    <div class="user_info">
                        <div class="user_image">
                            <div v-if="allAuth.user.photo == null">
                            <font-awesome-icon icon="user" />
                            </div>
                            <div v-else>
                                <v-img
                                :src="allAuth.user.photo"
                                height="125"
                                width="125"
                                reduice
                                class="grey darken-4"
                                ></v-img>
                            </div>
                        </div>
                        <h2>{{ allAuth.user.userName }}</h2>
                        <p class="email">{{ allAuth.user.email }}</p>
                        <p class="phone">{{ allAuth.user.phone }}</p>

                    </div>
                </template>
            </v-col>

            <v-col cols="12" md="8">
                <template>
                    <div class="user_items">
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <template>
                                        <v-row no-gutters>
                                            {{ $t("General Information") }}
                                        </v-row>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-form
                                        ref="form"
                                        @submit="changeInfoFunction"
                                        v-model="dataInfo.valid"
                                        lazy-validation
                                    >
                                        <div class="form_account_body">
                                        <v-text-field
                                            v-model="dataInfo.userName"
                                            :counter="200"
                                            label="user Name"
                                            :rules="[$rules.required]"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="dataInfo.email"
                                            :rules="[$rules.required, $rules.email]"
                                            label="E-mail"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="dataInfo.phone"
                                            label="phone"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="dataInfo.details"
                                            label="details"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="dataInfo.location"
                                            label="location"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="dataInfo.price"
                                            label="price"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>
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
                                                v-model="dataInfo.birthday"
                                                label="Birthday date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="dataInfo.birthday"
                                                :active-picker.sync="activePicker"
                                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                                min="1950-01-01"
                                                @change="save"
                                            ></v-date-picker>
                                            </v-menu>
                                        <v-btn
                                            :disabled="!dataInfo.valid"
                                            color="success"
                                            class="sub"
                                            @click="changeInfoFunction"
                                            :loading="allAuth.loading"
                                        >
                                            {{ $t('Save') }}
                                        </v-btn>
                                        </div>
                                    </v-form>
                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <template>
                                        <v-row no-gutters> {{ $t("Change Password") }} </v-row>
                                    </template>
                                </v-expansion-panel-header>

                                <v-expansion-panel-content>

                                    <v-form ref="form" @submit="changePasswordFunction" v-model="passworddata.valid" lazy-validation>
                                        <div class="form_account_body">
                                            
                                        <v-text-field
                                            v-model="passworddata.email"
                                            :rules="[$rules.required, $rules.email]"
                                            label="E-mail"
                                            required
                                            outlined
                                            dense
                                        ></v-text-field>
                                            <v-text-field v-model="passworddata.old_password"
                                                :append-icon="showPasswordOld ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[$rules.required]" :type="showPasswordOld ? 'text' : 'password'"
                                                :label="$t('Password')"
                                                @click:append="showPasswordOld = !showPasswordOld" outlined dense>
                                            </v-text-field>

                                            <v-text-field v-model="passworddata.new_password"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[$rules.required, $rules.password]"
                                                :type="showPassword ? 'text' : 'password'" :label="$t('Password')"
                                                @click:append="showPassword = !showPassword" outlined required dense>
                                            </v-text-field>

                                            <v-text-field v-model="passworddata.new_password_confirmation"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="showPassword ? 'text' : 'password'"
                                                :label="$t('Re-enter The Password')"
                                                @click:append="showPassword = !showPassword" :rules="[
                                                    $rules.required,
                                                    $rules.confirmPassword(
                                                        passworddata.new_password_confirmation,
                                                        passworddata.new_password
                                                    ),
                                                ]" outlined dense></v-text-field>
                                            <v-btn :disabled="!passworddata.valid" color="success" class="sub"
                                                @click="changePasswordFunction" :loading="allAuth.loading"
                                                type="submit">
                                                {{ $t('Change Password') }}
                                            </v-btn>
                                        </div>
                                    </v-form>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
<v-expansion-panel>
                                <v-expansion-panel-header>
                                    <template>
                                        <v-row no-gutters> Change Photo </v-row>
                                    </template>
                                </v-expansion-panel-header>

                                <v-expansion-panel-content>

                                    <v-form ref="form" @submit="changepohtoFunction">
                                        <div class="form_account_body">
                                            <v-file-input
                                                :rules="rulesImage"
                                                accept="image/png, image/jpeg, image/bmp"
                                                placeholder="Pick an avatar"
                                                prepend-icon="mdi-camera"
                                                label="Change profile"
                                                v-model="photodata.photo"
                                            ></v-file-input>
                                            <v-btn color="success" class="sub"
                                                @click="changepohtoFunction"
                                                type="submit">
                                                change photo
                                            </v-btn>
                                        </div>
                                    </v-form>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </template>

            </v-col>
        </v-row>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    components: {
  },
    head() {
        return {
            title: this.$i18n.t("My Account"),
        };
    },
    data: () => ({
        rulesImage: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        activePicker: null,
        menu: false,
        showPasswordOld: false,
        showPassword: false,
        photodata:{
            photo:''
        },
        passworddata: {
            valid: false,
            old_password: null,
            new_password: '',
            new_password_confirmation: '',
            email:'',
            id:''
        },
        dataInfo: {
            userName: '',
            email: '',
            phone:'',
            birthday:'',
            details:'',
            location:'',
            price:'',
            id:'',
            photo:'https://picsum.photos/350/165?random'
        },
        msgStatus: true,
        loading: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    components: {
    },
    computed: {
        ...mapGetters(["allAuth"]),
        passwordConfirmationRule() {
        return () =>
            this.password === this.password_confirmation || 'Password must match'
        },
    },
    
  mounted() {
    this.complateData()
  },
  methods: {
    ...mapActions(['changePassword','UpdateUserInfo','changeMyPhoto']),
    save (date) {
        this.dataInfo.birthday = date
        this.$refs.menu.save(this.dataInfo.birthday)
    },
    complateData() {
      this.dataInfo.userName = this.allAuth.user.userName
      this.dataInfo.email = this.allAuth.user.email
      this.dataInfo.phone = this.allAuth.user.phone
      this.dataInfo.birthday = this.allAuth.user.birthday
      this.dataInfo.details = this.allAuth.user.details
      this.dataInfo.location = this.allAuth.user.location
      this.dataInfo.price = this.allAuth.user.price
      this.dataInfo.id = this.allAuth.user._id
      this.photodata.photo = this.allAuth.user.photo
      this.passworddata.id = this.allAuth.user._id
      this.passworddata.email = this.allAuth.user.email
    },
    changeInfoFunction(e) {
        console.log(this.dataInfo)
      e.preventDefault()
      if (this.$refs.form.validate() === false) return false
      this.UpdateUserInfo(this.dataInfo)
    },
    
    changepohtoFunction(e) {
        console.log(this.photodata)
      e.preventDefault()
      this.changeMyPhoto(this.photodata)
    },

    changePasswordFunction(e) {
      e.preventDefault()
      if (this.$refs.form.validate() === false) return false
      this.changePassword(this.passworddata)
    },
  },

};
</script>

<style>
.user {
    margin-bottom: 20px;
}

.msgerror {
    color: #f00;
    border: 1px solid #f00;
    padding: 10px;
    margin: 10px 0px;
    border-radius: 4px;
}

.msgdone {
    color: #30c88c;
    border: 1px solid #30c88c;
    padding: 10px;
    margin: 10px 0px;
    border-radius: 4px;
}

.form_account {
    max-width: 500px;
}

.form_account_body {
    background: #fcfcfc;
    padding: 10px;
    border: 1px solid #f5f4f4;
    border-radius: 4px;
}

.user_info,
.user_items {
    min-height: 500px;
    height: 100%;
}

.user_items {
    background: #f0f0f038;
    padding: 20px;
    border: 1px solid #ededed;
}

.user_items .v-expansion-panel {
    margin-bottom: 25px;
    padding: 10px;
}

/* info */
.user_info {
    text-align: center;
    padding: 10px;
    border: 1px solid #e9e9e9cc;
    border-radius: 5px;
    position: relative;
}

.user_image {
    margin-top: 20px;
    font-size: 40px;
}

.user_info p {
    padding: 10px;
    border-bottom: 1px solid #f6f6f6;
    margin: 10px 0px;
}

.user_pages a button {
    display: block;
    width: 100%;
    margin-top: 20px;
}

.user_logout button {
    margin-top: 30px;
    border-radius: 9px;

}
</style> 