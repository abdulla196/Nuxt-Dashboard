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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [],
      notification: {
        content: '',
        subject: '',
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
      console.log(this.notification.users)
      this.notification.usersId.push(this.notification.users.id)
      this.notification.usersname.push(this.notification.users.text)
    },
    OnAddNotification() {
      this.Addnotification(this.notification)
    },
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
    padding: 0.5rem ;
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
</style>
