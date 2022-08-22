<template>
  <div class="Adress">

    <v-card>
        <h2 class="title-head text-center">Edit Notification</h2>
      <v-card-text>
        <v-container>
          <v-row id="form">
            <v-col cols="12">
              <v-text-field v-model="NotificationEdit.subject" label="subject" outlined required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Content"
                v-model="NotificationEdit.content"
                :value="NotificationEdit.content"
              ></v-textarea>
            </v-col>
            
            <v-col cols="12"> 
              <label>Select user</label>
              <select v-model="NotificationEdit.usersId" outlined label="select user" required>
                  <option value="" selected disabled>select user</option>
                  <option v-for="item in allUsersList.data" :key="item._id" :value="item._id">
                      {{ item.userName }}</option>
              </select>
            </v-col>
            <v-col cols="12">
              
              <v-radio-group
                v-model="NotificationEdit.priority"
                row
              >
                <v-radio
                  label="low"
                  value="low"
                ></v-radio>
                <v-radio
                  label="high"
                  value="high"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-checkbox v-model="NotificationEdit.is_clicked" label="is clicked ?"></v-checkbox>
            </v-col>
      <div class="col-12 text-center">
        <v-btn depressed color="primary" @click="UpdateUNotifi">
          save
        </v-btn>
      </div>
          </v-row>
        </v-container>
      </v-card-text>

    </v-card>       
     <v-snackbar
          v-model="snackbar"
          absolute
          right
          color="#f68c28"
          rounded="pill"
          centered
    >
      {{ allnotificationList.message }}

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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
        snackbar: false,
      NotificationEdit: {
        content: '',
        subject: '',
        priority:null,
        users:'please select',
        usersId:'',
        is_clicked: false,
        id: this.$route.params.id,
      },
    }
  },
  methods: {
    ...mapActions(['updateNotification','getoneNotification','getUsers']),

    completeUserData() {
      console.log(this.allnotificationList)
      this.NotificationEdit.subject = this.allnotificationList.oneNotification.subject
      this.NotificationEdit.content = this.allnotificationList.oneNotification.content
      this.NotificationEdit.is_clicked = this.allnotificationList.oneNotification.is_clicked
      this.NotificationEdit.usersId = this.allnotificationList.oneNotification.user_id
      this.NotificationEdit.priority = this.allnotificationList.oneNotification.priority
      this.NotificationEdit.id = this.$route.params.id
    },
    
    UpdateUNotifi() {
            this.snackbar = true
      this.updateNotification(this.NotificationEdit);
    },
    removearray(){
      const index = array.indexOf(user);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  },
  computed: {
    ...mapGetters(['allnotificationList','allUsersList']),
  },
  mounted() {
    this.getoneNotification(this.$route.params.id)
    setTimeout(() => this.completeUserData(), 1000);
    if(this.allUsersList.data == ''){
        this.getUsers() 
    }
  },
}
</script>

<style scoped>
select {
  border: 1px solid rgba(0, 0, 0, 0.42) !important;
}
.subCat_ {
  border: 1px solid #ededed;
  border-radius: 4px;
  padding: 25px;
}

.subCategorie_ {
  border-radius: 4px;
  box-shadow: 0px 1px 4px 0 rgb(0 0 0 / 5%);
  padding-top: 20px;
}
.subCategorie_:hover {
  transition: 0.5ms;
  box-shadow: 0px 0px 7px 0px rgb(71 71 71 / 26%);
}
.subCategorie_ .v-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #f2f2f2cc;
  margin: auto;
  margin-bottom: 20px;
}
.subCategorie_ h3 {
  padding: 14px;
  background: #fff;
  border-top: 1px solid #f7f7f7;
}
</style>
