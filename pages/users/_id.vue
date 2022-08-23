<template>

  <v-card-text>
    <v-container>
        <div class="text-center my-5">
            <h2  class=" text-center" style="font-size:37px;color:#403c3c">Edit User</h2>
            <br/>
        </div>
        <v-form ref="form" v-model="valid">
      <v-row id="form">
        
        <v-col class="col-md-6 col-12">
          <v-text-field label="userName" v-model="UserEdit.userName" :rules="[
                    $rules.required,
                    $rules.name]" required outlined></v-text-field>
        </v-col>

        <v-col class="col-md-6 col-12">
          <v-text-field label="email" v-model="UserEdit.email" :rules="[
                    $rules.required,
                    $rules.email]" required outlined></v-text-field>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-text-field label="phone" prefix="" outlined :rules="[
                    $rules.required,
                    $rules.number]" v-model="UserEdit.phone" required></v-text-field>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-select
          :items="countries"
          required
          v-model="UserEdit.location"
          :rules="[
            $rules.required,
            $rules.select]"
          label="location"
          ></v-select>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-text-field label="details" prefix="" outlined v-model="UserEdit.details" required></v-text-field>
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
                    v-model="UserEdit.birthday"
                    label="Birthday date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="UserEdit.birthday"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-text-field label="price" prefix="" outlined v-model="UserEdit.price" required></v-text-field>
        </v-col>
        <div class="col-12 text-center">
          <v-btn depressed color="#f68c28" :disabled="!valid" style="color:#fff" @click="updateuser">
            <b>save</b>
          </v-btn>
        </div>
      </v-row>
      </v-form>
      <v-snackbar 
          v-model="snackbar"
          absolute
          right
          color="#f68c28"
          rounded="pill"
          centered>
        {{ allUsersList.message }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
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
    valid:true,
    snackbar: false,
    activePicker: null,
    menu: false,
    countries:["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba Aruba Australia "," Austria "," Azerbaijan "," Bahamas "," Bahrain "," Bangladesh "," Barbados "," Belarus "," Belgium "," Belize "," Benin "," Bermuda "," Bhutan "," Bolivia "," Bosnia and Herzegovina "," Botswana "," Bouvet Island "," Brazil "," British Indian Ocean Territory","Brunei Darussalam ","Bulgaria  ","Burkina Faso ","Burundi  ","Cambodia  ","Cameroon  ","Canada  ","Cape Verde ","Cayman Islands ","Central African Republic ","Chad  ","Chile  ","China  ","Christmas Island ","Cocos (Keeling) Islands ","Colombia  ","Comoros  ","Congo  ","Congo"," The Democratic Republic of The ","Cook Islands ","Costa Rica ","Cote D'ivoire ","Croatia  ","Cuba  ","Cyprus  ","Czech Republic ","Denmark  ","Djibouti  ","Dominica  ","Dominican Republic ","Ecuador  ","Egypt  ","El Salvador ","Equatorial Guinea ","Eritrea  ","Estonia  ","Ethiopia  ","Falkland Islands (Malvinas) ","Faroe Islands ","Fiji  ","Finland  ","France  ","French Guiana  ","French Polynesia ","French Southern Territories ","Gabon  ","Gambia  ","Georgia  ","Germany  ","Ghana  ","Gibraltar  ","Greece  ","Greenland  ","Grenada  ","Guadeloupe  ","Guam  ","Guatemala  ","Guernsey  ","Guinea  ","Guinea-bissau  ","Guyana  ","Haiti"," Heard Island and Mcdonald Islands ","Holy See (Vatican City State) ","Honduras  ","Hong Kong ","Hungary  ","Iceland  ","India  ","Indonesia  ","Iran"," Islamic Republic of ","Iraq  ","Ireland  ","Isle of Man ","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea"," Democratic People's Republic o","Korea"," Republic o","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriy","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia"," The Former Yugoslav Republic o","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Island","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia"," Federated States of","Moldova"," Republic o","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antille","New Caledoni","New Zealan","Nicaragua","Niger","Nigeria","Niue","Norfolk Islan","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory"," Occupied","Panama","Papua New Guine","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and The Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabi","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and The South Sandwich Island","Spain","Sri Lank","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania"," United Republic of","Thailand","Timor-leste","Togo","Tokelau","Tonga  ","Trinidad and Tobago ","Tunisia  ","Turkey  ","Turkmenistan  ","Turks and Caicos Islands ","Tuvalu  ","Uganda  ","Ukraine  ","United Arab Emirates  ","United Kingdom  ","United States ","United States Minor Outlying Islands ","Uruguay  ","Uzbekistan  ","Vanuatu  ","Venezuela  ","Viet Nam ","Virgin Islands British ","Virgin Islands U.S. ","Wallis and Futuna ","Western Sahara ","Yemen  ","Zambia  ","Zimbabwe"],
    UserEdit: {
      maid_paper: [],
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
        this.UserEdit.birthday = date
        this.$refs.menu.save(this.UserEdit.birthday)
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      this.UserEdit.maid_paper =fileList
      // Upload image api
      // axios.post('/api/user/'+this.$route.params.id, { data: formData }).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm("remove image")
      if (r == true) {
        done()
      } else {
      }
    },
    completeMaidsData() {
      this.UserEdit.phone = this.allUsersList.data.phone
      this.UserEdit.location = this.allUsersList.data.location
      this.UserEdit.details = this.allUsersList.data.details
      if(this.allUsersList.data.birthday == 'null'){
        this.UserEdit.birthday = ''
      }
      else{
        this.UserEdit.birthday = this.allUsersList.data.birthday
      }
      this.UserEdit.price = this.allUsersList.data.price
      this.UserEdit.userName = this.allUsersList.data.userName
      this.UserEdit.email = this.allUsersList.data.email
      this.UserEdit.id = this.$route.params.id
      console.log(this.UserEdit)
    },
    updateuser() {
      this.updateUsers(this.UserEdit);
      setTimeout(() => (this.snackbar = true))
    },
  },

  computed: {
    ...mapGetters(['allUsersList']),
  },


  mounted() {
    this.getoneUser(this.$route.params.id)
    setTimeout(() => this.completeMaidsData(), 3000);
  },
}
</script>


<style>
</style>
