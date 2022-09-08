<template>
  <v-card-text>
    <div class="text-center my-3">
      <h2 class="title-head my-3">User Create</h2>
    </div>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-row class="mt-3" id="form">
          <v-col class="col-md-6 col-12">
            <v-text-field
              label="userName"
              prefix=""
              outlined
              :rules="[$rules.required, $rules.name]"
              v-model="user.userName"
            ></v-text-field>
          </v-col>
          <v-col class="col-md-6 col-12">
            <v-text-field
              label="email"
              prefix=""
              type="email"
              :rules="[$rules.required, $rules.email]"
              outlined
              v-model="user.email"
            >
            </v-text-field>
          </v-col>
          <v-col class="col-md-6 col-12">
            <v-text-field
              v-model="user.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[$rules.required, $rules.password]"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('Password')"
              @click:append="showPassword = !showPassword"
              outlined
              dense
            >
            </v-text-field>
          </v-col>
          <v-col class="col-md-6 col-12">
            <v-text-field
              v-model="user.passwordConfirm"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('Re-enter The Password')"
              @click:append="showPassword = !showPassword"
              :rules="[
                $rules.required,
                $rules.confirmPassword(user.passwordConfirm, user.password),
              ]"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col class="col-md-6 col-12">
            <v-select
              :items="types"
              :rules="[$rules.required, $rules.select]"
              v-model="user.type"
              label="type"
            ></v-select>
          </v-col>

          <v-col class="col-md-6 col-12">
            <v-select
              :items="countries"
              :rules="[$rules.required, $rules.select]"
              v-model="user.location"
              label="location"
            ></v-select>
          </v-col>
          <v-col class="col-md-6 col-12">
            <v-text-field
              label="phone"
              :rules="[$rules.required, $rules.number]"
              type="text"
              v-model="user.phone"
              outlined
            ></v-text-field>
          </v-col>

          <v-col class="col-md-6 col-12" v-if="user.type == 'maid'">
            <v-text-field
              label="details"
              v-model="user.details"
              outlined
            ></v-text-field>
          </v-col>

          <v-col class="col-md-6 col-12">
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
                  v-model="user.birthday"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="user.birthday"
                :active-picker.sync="activePicker"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="col-md-6 col-12" v-if="user.type == 'maid'">
            <v-text-field
              label="price"
              outlined
              v-model="user.price"
              required
            ></v-text-field>
          </v-col>

          <v-col class="col-md-6 col-12">
            
            <v-file-input
                :rules="rulesImage"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Change profile"
                @change="onFileChanged"
            ></v-file-input>
          </v-col>
          <div class="col-12 text-center">
            <v-btn
              depressed
              :disabled="!valid"
              color="primary"
              @click="AddUser"
            >
              save
            </v-btn>
          </div>
        </v-row>
      </v-form>

      <v-snackbar
        v-if="this.$store.state.Users.flag == 'success'"
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
        v-else-if="this.$store.state.Users.flag == 'fail'"
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
    </v-container>
  </v-card-text>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    rulesImage: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
    
    overlay: false,
    activePicker: null,
    valid: true,
    menu: false,
    snackbar: false,
    showPasswordOld: false,
    showPassword: false,
    types: ['user', 'maid'],
    countries: [
      'Afghanistan',
      'Åland Islands',
      'Albania',
      'Algeria',
      'American Samoa',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antarctica',
      'Antigua and Barbuda',
      'Argentina',
      'Armenia',
      'Aruba Aruba Australia ',
      ' Austria ',
      ' Azerbaijan ',
      ' Bahamas ',
      ' Bahrain ',
      ' Bangladesh ',
      ' Barbados ',
      ' Belarus ',
      ' Belgium ',
      ' Belize ',
      ' Benin ',
      ' Bermuda ',
      ' Bhutan ',
      ' Bolivia ',
      ' Bosnia and Herzegovina ',
      ' Botswana ',
      ' Bouvet Island ',
      ' Brazil ',
      ' British Indian Ocean Territory',
      'Brunei Darussalam ',
      'Bulgaria  ',
      'Burkina Faso ',
      'Burundi  ',
      'Cambodia  ',
      'Cameroon  ',
      'Canada  ',
      'Cape Verde ',
      'Cayman Islands ',
      'Central African Republic ',
      'Chad  ',
      'Chile  ',
      'China  ',
      'Christmas Island ',
      'Cocos (Keeling) Islands ',
      'Colombia  ',
      'Comoros  ',
      'Congo  ',
      'Congo',
      ' The Democratic Republic of The ',
      'Cook Islands ',
      'Costa Rica ',
      "Cote D'ivoire ",
      'Croatia  ',
      'Cuba  ',
      'Cyprus  ',
      'Czech Republic ',
      'Denmark  ',
      'Djibouti  ',
      'Dominica  ',
      'Dominican Republic ',
      'Ecuador  ',
      'Egypt  ',
      'El Salvador ',
      'Equatorial Guinea ',
      'Eritrea  ',
      'Estonia  ',
      'Ethiopia  ',
      'Falkland Islands (Malvinas) ',
      'Faroe Islands ',
      'Fiji  ',
      'Finland  ',
      'France  ',
      'French Guiana  ',
      'French Polynesia ',
      'French Southern Territories ',
      'Gabon  ',
      'Gambia  ',
      'Georgia  ',
      'Germany  ',
      'Ghana  ',
      'Gibraltar  ',
      'Greece  ',
      'Greenland  ',
      'Grenada  ',
      'Guadeloupe  ',
      'Guam  ',
      'Guatemala  ',
      'Guernsey  ',
      'Guinea  ',
      'Guinea-bissau  ',
      'Guyana  ',
      'Haiti',
      ' Heard Island and Mcdonald Islands ',
      'Holy See (Vatican City State) ',
      'Honduras  ',
      'Hong Kong ',
      'Hungary  ',
      'Iceland  ',
      'India  ',
      'Indonesia  ',
      'Iran',
      ' Islamic Republic of ',
      'Iraq  ',
      'Ireland  ',
      'Isle of Man ',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Korea',
      " Democratic People's Republic o",
      'Korea',
      ' Republic o',
      'Kuwait',
      'Kyrgyzstan',
      "Lao People's Democratic Republic",
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libyan Arab Jamahiriy',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macao',
      'Macedonia',
      ' The Former Yugoslav Republic o',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Island',
      'Martinique',
      'Mauritania',
      'Mauritius',
      'Mayotte',
      'Mexico',
      'Micronesia',
      ' Federated States of',
      'Moldova',
      ' Republic o',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Myanmar',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'Netherlands Antille',
      'New Caledoni',
      'New Zealan',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Niue',
      'Norfolk Islan',
      'Northern Mariana Islands',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Palestinian Territory',
      ' Occupied',
      'Panama',
      'Papua New Guine',
      'Paraguay',
      'Peru',
      'Philippines',
      'Pitcairn',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Reunion',
      'Romania',
      'Russian Federation',
      'Rwanda',
      'Saint Helena',
      'Saint Kitts and Nevis',
      'Saint Lucia',
      'Saint Pierre and Miquelon',
      'Saint Vincent and The Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome and Principe',
      'Saudi Arabi',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'South Africa',
      'South Georgia and The South Sandwich Island',
      'Spain',
      'Sri Lank',
      'Sudan',
      'Suriname',
      'Svalbard and Jan Mayen',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syrian Arab Republic',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      ' United Republic of',
      'Thailand',
      'Timor-leste',
      'Togo',
      'Tokelau',
      'Tonga  ',
      'Trinidad and Tobago ',
      'Tunisia  ',
      'Turkey  ',
      'Turkmenistan  ',
      'Turks and Caicos Islands ',
      'Tuvalu  ',
      'Uganda  ',
      'Ukraine  ',
      'United Arab Emirates  ',
      'United Kingdom  ',
      'United States ',
      'United States Minor Outlying Islands ',
      'Uruguay  ',
      'Uzbekistan  ',
      'Vanuatu  ',
      'Venezuela  ',
      'Viet Nam ',
      'Virgin Islands British ',
      'Virgin Islands U.S. ',
      'Wallis and Futuna ',
      'Western Sahara ',
      'Yemen  ',
      'Zambia  ',
      'Zimbabwe',
    ],
    user: {
      userName: '',
      password: '',
      email: '',
      passwordConfirm: '',
      type: '',
      location: '',
      phone: '',
      details: '',
      photo:null
    },
  }),
  computed: {},

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false
        }, 3000)
    },
  },
  methods: {
    ...mapActions(['Signup']),
    save(date) {
      this.user.birthday = date
      this.$refs.menu.save(this.UserEdit.birthday)
    },
    onFileChanged (event) { 
      console.log(event)
        this.user.photo = event
    },
    AddUser() {
      this.Signup(this.user)
      this.snackbar = true
    },
  },

  computed: {
    ...mapGetters(['']),
  },

  mounted() {},
}
</script>

<style></style>
