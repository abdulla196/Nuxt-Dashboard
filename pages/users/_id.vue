<template>

  <v-card-text>
    <v-container>
      <v-row>
        <v-col class="col-md-6 col-12">
          <v-text-field label="phone" prefix="" outlined v-model="MaidsEdit.phone" required></v-text-field>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-select
          :items="countries"
          required
          v-model="MaidsEdit.location"
          label="location"
          ></v-select>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-text-field label="details" prefix="" outlined v-model="MaidsEdit.details" required></v-text-field>
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
        <v-col class="col-md-6 col-12">
          <v-text-field label="price" prefix="" outlined v-model="MaidsEdit.price" required></v-text-field>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-text-field label="userName" v-model="MaidsEdit.userName" required outlined></v-text-field>
        </v-col>

        <v-col class="col-md-6 col-12">
          <v-text-field label="email" v-model="MaidsEdit.email" required outlined></v-text-field>
        </v-col>
        
        <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;" class="col-12">
          <vue-upload-multiple-image
              @upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              :data-images="MaidsEdit.maid_paper"
              dragText="drag image"
              idUpload="myIdUpload"
              browseText = 'select image'
              primaryText ='images'
              popupText = ""
              markIsPrimaryText=""
              ></vue-upload-multiple-image>
          </div>
        <div class="col-12 text-center">
          <v-btn depressed color="primary" @click="updateuser">
            save
          </v-btn>
        </div>
      </v-row>
      <v-snackbar v-model="snackbar">
        {{ this.$store.state.Users.message }}

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
import VueUploadMultipleImage from 'vue-upload-multiple-image'

export default {
  data: () => ({
    snackbar: false,
    activePicker: null,
    menu: false,
    countries:["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba Aruba Australia "," Austria "," Azerbaijan "," Bahamas "," Bahrain "," Bangladesh "," Barbados "," Belarus "," Belgium "," Belize "," Benin "," Bermuda "," Bhutan "," Bolivia "," Bosnia and Herzegovina "," Botswana "," Bouvet Island "," Brazil "," British Indian Ocean Territory","Brunei Darussalam ","Bulgaria  ","Burkina Faso ","Burundi  ","Cambodia  ","Cameroon  ","Canada  ","Cape Verde ","Cayman Islands ","Central African Republic ","Chad  ","Chile  ","China  ","Christmas Island ","Cocos (Keeling) Islands ","Colombia  ","Comoros  ","Congo  ","Congo"," The Democratic Republic of The ","Cook Islands ","Costa Rica ","Cote D'ivoire ","Croatia  ","Cuba  ","Cyprus  ","Czech Republic ","Denmark  ","Djibouti  ","Dominica  ","Dominican Republic ","Ecuador  ","Egypt  ","El Salvador ","Equatorial Guinea ","Eritrea  ","Estonia  ","Ethiopia  ","Falkland Islands (Malvinas) ","Faroe Islands ","Fiji  ","Finland  ","France  ","French Guiana  ","French Polynesia ","French Southern Territories ","Gabon  ","Gambia  ","Georgia  ","Germany  ","Ghana  ","Gibraltar  ","Greece  ","Greenland  ","Grenada  ","Guadeloupe  ","Guam  ","Guatemala  ","Guernsey  ","Guinea  ","Guinea-bissau  ","Guyana  ","Haiti"," Heard Island and Mcdonald Islands ","Holy See (Vatican City State) ","Honduras  ","Hong Kong ","Hungary  ","Iceland  ","India  ","Indonesia  ","Iran"," Islamic Republic of ","Iraq  ","Ireland  ","Isle of Man ","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea"," Democratic People's Republic o","Korea"," Republic o","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriy","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia"," The Former Yugoslav Republic o","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Island","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia"," Federated States of","Moldova"," Republic o","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antille","New Caledoni","New Zealan","Nicaragua","Niger","Nigeria","Niue","Norfolk Islan","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory"," Occupied","Panama","Papua New Guine","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and The Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabi","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and The South Sandwich Island","Spain","Sri Lank","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania"," United Republic of","Thailand","Timor-leste","Togo","Tokelau","Tonga  ","Trinidad and Tobago ","Tunisia  ","Turkey  ","Turkmenistan  ","Turks and Caicos Islands ","Tuvalu  ","Uganda  ","Ukraine  ","United Arab Emirates  ","United Kingdom  ","United States ","United States Minor Outlying Islands ","Uruguay  ","Uzbekistan  ","Vanuatu  ","Venezuela  ","Viet Nam ","Virgin Islands British ","Virgin Islands U.S. ","Wallis and Futuna ","Western Sahara ","Yemen  ","Zambia  ","Zimbabwe"],
    MaidsEdit: {
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
  
  components: {
    VueUploadMultipleImage
  },
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
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      this.MaidsEdit.maid_paper =fileList
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
      console.log(this.allUsersList.data)
      this.MaidsEdit.phone = this.allUsersList.data.phone
      this.MaidsEdit.location = this.allUsersList.data.location
      this.MaidsEdit.details = this.allUsersList.data.details
      if(this.allUsersList.data.birthday == 'null'){
        this.MaidsEdit.birthday = ''
      }
      else{
        this.MaidsEdit.birthday = this.allUsersList.data.birthday
      }
      this.MaidsEdit.price = this.allUsersList.data.price
      this.MaidsEdit.userName = this.allUsersList.data.userName
      this.MaidsEdit.email = this.allUsersList.data.email
      this.MaidsEdit.id = this.$route.params.id
      this.MaidsEdit.maid_paper = this.allMaidsList.data.maid_paper
    },
    updateuser() {
      console.log(this.MaidsEdit)
      this.updateUsers(this.MaidsEdit);
      setTimeout(() => (this.snackbar = true))
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
