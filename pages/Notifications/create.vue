<template>
  <div class="Adress">

    <v-card>
        <h2 class="title-head text-center">Create Notification</h2>
      <v-card-text>
        <v-container>
          <v-row id="form">
            <v-col cols="12">
              <v-text-field v-model="notification.subject" label="subject" outlined required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Content"
                v-model="notification.content"
                :value="notification.content"
              ></v-textarea>
            </v-col>
            <div class="form-field" cols="12">
                <span class="ui-select-match-item btn btn-default btn-secondary btn-xs" v-for="items in notification.usersname" :key="items">
                    <span class="close ui-select-match-close" @click="removearray(items)">&nbsp;×</span>
                    <span> {{items}} </span>
                    <input  type="hidden" :value="items">
                </span>
            </div>
            <v-col cols="12"> 
              <label>Select user</label>
              <select v-on:change="onCheck()" v-model="notification.users" outlined label="select user" required>
                  <option value="" selected disabled>select user</option>
                  <option v-for="item in allUsersList.data" :key="item._id" :value="{ id: item._id, text: item.userName }">
                      {{ item.userName }}</option>
              </select>
            </v-col>
            <v-col cols="12">
              
              <v-radio-group
                v-model="notification.priority"
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
              <v-checkbox v-model="notification.is_clicked" label="is clicked ?"></v-checkbox>
            </v-col>
      <div class="col-12 text-center">
        <v-btn depressed color="primary" @click="OnAddNotification">
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
  data() {
    return {
        snackbar: false,
      items: [],
      notification: {
        content: '',
        subject: '',
        priority:null,
        users:'please select',
        usersId:[],
        usersname:[],
        is_clicked: false
      },
    }
  },
  computed: {
    ...mapGetters(['allnotificationList','allUsersList']),
  },
  methods: {
    ...mapActions(['Addnotification','getUsers']),
  
    onCheck(){
      if(!this.notification.usersId.includes(this.notification.users.id)){
        this.notification.usersId.push(this.notification.users.id)
        this.notification.usersname.push(this.notification.users.text)
      }
    },
    OnAddNotification() {
            this.snackbar = true
      this.Addnotification(this.notification)
    },
    
    removearray(user){
      const index = this.notification.usersname.indexOf(user);
      if (index > -1) {
        this.notification.usersname.splice(index, 1);
      }
    }
  },
  mounted() {
    if(this.allUsersList.data == ''){
        this.getUsers() 
    }
  },
}
</script>

<style>
.ui-select-match-item {
    display: inline-block;
    background: #086f8d;
    color: #fff;
    padding: 0 0.5rem  0 0;
    margin: 0.5rem 0.5rem 0.5rem 0;
}
.ui-select-match-close {
    display: inline-block;
    padding: 0.5rem;
    color: #fff;
    text-align: center;
    text-indent: -4px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff !important;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
}
select {
  border: 1px solid rgba(0, 0, 0, 0.42) !important;
}
</style>
