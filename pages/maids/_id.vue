<template>

  <v-card-text>
    <v-container>
        <div class="text-center my-3">
            <h2  class="text-h5 text-center">Edit miad</h2>
        </div>
      <v-row>
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
  </v-card-text>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
export default {
  data: () => ({
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
  components: {
    VueUploadMultipleImage
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    ...mapActions(['updateMaids', 'getoneMaids','completeMaidsData']),
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
    completeMaidsData() {
      this.MaidsEdit.phone = this.allMaidsList.onemaid.phone
      this.MaidsEdit.location = this.allMaidsList.onemaid.location
      this.MaidsEdit.details = this.allMaidsList.onemaid.details
      
      this.MaidsEdit.price = this.allMaidsList.onemaid.price
      this.MaidsEdit.userName = this.allMaidsList.onemaid.userName
      this.MaidsEdit.email = this.allMaidsList.onemaid.email
      this.MaidsEdit.id = this.$route.params.id
      this.MaidsEdit.maid_paper = this.allMaidsList.onemaid.maid_paper
      if(this.allMaidsList.onemaid.birthday == 'null'){
        this.MaidsEdit.birthday = ''
      }
      else{
        this.MaidsEdit.birthday = this.allMaidsList.onemaid.birthday
      }
    },
    UpdateMaid() {
      this.updateMaids(this.MaidsEdit);
    },
  },

  computed: {
    ...mapGetters(['allMaidsList']),
  },


  mounted() {
    this.getoneMaids(this.$route.params.id)
    setTimeout(() => this.completeMaidsData(), 2000);
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
