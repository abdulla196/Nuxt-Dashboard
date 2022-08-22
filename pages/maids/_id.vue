<template>

  <v-card-text>
    <v-container>
        <div class="text-center my-3">
            <h2  class="title-head text-center">Edit miad</h2>
        </div>
      <v-row id="form">
        <v-col class="col-md-6 col-12">
          <v-text-field label="phone" prefix="" outlined v-model="MaidsEdit.phone" required></v-text-field>
        </v-col>
        <v-col class="col-md-6 col-12">
          <v-text-field label="location" v-model="MaidsEdit.location" required outlined></v-text-field>
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
        <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex;justify-content: center;flex-direction: column;align-items: center;" class="col-12">
        <label> الصوره الشخصية - صورة الجواز - صورة الفيش</label>
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
          <v-btn depressed color="primary" @click="UpdateMaid">
            save
          </v-btn>
        </div>
      </v-row>
    </v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="100"
      ></v-progress-circular>
    </v-overlay>
        <v-snackbar
          v-model="snackbar"
          absolute
          right
          color="#f68c28"
          rounded="pill"
          centered
    >
      {{ allMaidsList.message }}

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
  </v-card-text>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
export default {
  data: () => ({
        snackbar: false,
    overlay:false,
    activePicker: null,
    menu: false,
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
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    },
  },
  created () {
    this.completeMaidsData()
  },
  methods: {
    ...mapActions(['updateMaids','completeMaidsData']),
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
    save (date) {
        this.MaidsEdit.birthday = date
        this.$refs.menu.save(this.MaidsEdit.birthday)
    },
    async completeMaidsData () {
      this.overlay = true
      const userIdPromise = await fetch(`http://66.29.155.80:5003/api/user/${this.$route.params.id}`, {
          method: 'GET',
          headers: {
            'Accept': "application/json",
              'Content-Type': 'multipart/form-data',
              'Vary':'X-HTTP-Method-Override',
              'Content-Type': 'application/json',
              'Authorization':this.$cookies.get('Authorization'),
          }
        })
        const userIdJson = userIdPromise.json()
        userIdJson.then((res) => {
          this.MaidsEdit.phone = res.data.phone
          this.MaidsEdit.location = res.data.location
          this.MaidsEdit.details = res.data.details
          
          this.MaidsEdit.price = res.data.price
          this.MaidsEdit.userName = res.data.userName
          this.MaidsEdit.email = res.data.email
          this.MaidsEdit.id = this.$route.params.id
          this.MaidsEdit.maid_paper = res.data.maid_paper
          if(res.data.birthday == 'null'){
            this.MaidsEdit.birthday = ''
          }
          else{
            this.MaidsEdit.birthday = res.data.birthday
          }
      })
      setTimeout(function(){
      this.overlay = false
      },6000)
    },
    UpdateMaid() {
      this.snackbar = true
      this.updateMaids(this.MaidsEdit);
    },
  },
  components: {
    VueUploadMultipleImage
  },
  computed: {
    ...mapGetters(['allMaidsList']),
  },
}
</script>


<style>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
