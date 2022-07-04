<template>
        <v-card-text>
            <h2 class="text-center mt-3">
                Sign Up
            </h2>
            <v-container>
                <v-row class="mt-3">
                    <v-col cols="6">
                        <v-text-field label="userName" prefix="" outlined v-model="user.userName" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="email" prefix="" type="email" outlined v-model="user.email" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                    <v-text-field v-model="user.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[$rules.required, $rules.password]"
                        :type="showPassword ? 'text' : 'password'" :label="$t('Password')"
                        @click:append="showPassword = !showPassword" outlined required dense>
                    </v-text-field>
                    </v-col>
                    <v-col cols="6">
                    <v-text-field v-model="user.passwordConfirm"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        :label="$t('Re-enter The Password')"
                        @click:append="showPassword = !showPassword" :rules="[
                            $rules.required,
                            $rules.confirmPassword(
                                user.passwordConfirm,
                                user.password
                            ),
                        ]" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="type" prefix="" outlined v-model="user.type" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="location" v-model="user.location" required outlined></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field label="phone" type="number" v-model="user.phone" required outlined></v-text-field>
                    </v-col>
                    
                    <v-col cols="6">
                        <v-text-field label="details" v-model="user.details" required outlined></v-text-field>
                    </v-col>
                    <div class="col-12 text-center">
                        <v-btn depressed color="primary" @click="AddUser">
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
        showPasswordOld: false,
        showPassword: false,
        user: {
            userName: '',
            password:'',
            email: '',
            passwordConfirm:'',
            type: '',
            location: '',
            phone: '',
            details: ''
        },
    }),
    computed: {

    },


    methods: {
        ...mapActions(['Signup']),


        AddUser() {
            this.Signup(this.user);
        },
    },

    computed: {
        ...mapGetters(['']),
    },


    mounted() {
    },
}
</script>


<style>
</style>
