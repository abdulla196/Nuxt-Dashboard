<template>
  <v-container>
    <h2 class="text-center my-1"> Chat</h2>
    <v-card>
      <v-row>
        <v-col cols="12" sm="5" class="flex-grow-1 flex-shrink-0" style="border-right: 1px solid #0000001f;">

          <v-responsive class="overflow-y-auto fill-height" height="500">
            <v-list subheader>
              <v-list-item-group>
                <template>
                  <v-list-item v-for="maids in alluser" :key="maids.id" @click="clientData(maids.id),Read(maids.id,maids.time)">
                    <v-list-item-avatar color="grey lighten-1 white--text">

                      <v-icon>mdi-account</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <div class = "unread"  v-if="is_read == false">new</div>
                      <v-list-item-title v-text="maids.name" />
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-responsive>
        </v-col>
        <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
          <v-responsive class="overflow-y-hidden fill-height" height="500">
            <v-card flat class="d-flex flex-column fill-height" v-if="active == true">
              <v-card-title>
                {{ client_name }}
              </v-card-title>
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <template>
                  <div class="" v-for="(msg , i) in arraymessages" :key="i">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <div v-if="msg.to == 'admin'" class="text-left">
                          <v-hover>
                            <v-chip color="primary" dark style="height:auto;white-space: normal;" class="pa-4 mb-2"
                              v-on="on">
                              {{ msg.text }}
                              <sub class="ml-2" style="font-size: 0.5rem;">{{ msg.time }}</sub>

                            </v-chip>
                          </v-hover>
                        </div>

                        <div v-else class="text-right">
                          <v-hover>
                            <v-chip color="primary" dark style="height:auto;white-space: normal;" class="pa-4 mb-2"
                              v-on="on">
                              {{ msg.text }}
                              <sub class="ml-2" style="font-size: 0.5rem;">{{ msg.time }}</sub>

                            </v-chip>
                          </v-hover>
                        </div>
                      </template>
                      <!-- <v-list>
                        <v-list-item>
                          <v-list-item-title>delete</v-list-item-title>
                        </v-list-item>
                      </v-list> -->
                    </v-menu>
                  </div>
                </template>
              </v-card-text>
              <v-card-text class="flex-shrink-1">
                <v-text-field v-model="messagesend" label="type a message" type="text" no- outlined />
                
                <v-btn
                  depressed
                  color="error"  @keyup.enter="writeToFirestore()" @click="writeToFirestore()"
                >
                  Send now
                </v-btn>
              </v-card-text>
            </v-card>
          </v-responsive>
        </v-col>
      </v-row>
    </v-card>
    <div>

    </div>
  </v-container>
</template>
<script>
import { db } from "~/plugins/firebase.js"
import { doc, collection, getDocs, getFirestore, setDoc, query,updateDoc } from 'firebase/firestore'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: false,
      user_icon: 'mdi-account',
      messages: [],
      arraymessages: [],
      messagesend: '',
      client_name: '',
      client_id: 0,
      alluser: [],
      is_read:true
    }
  },
  computed: {
    ...mapGetters(["allAuth", 'allUsersList'])
  },
  methods: {
    ...mapActions(['AddReview', 'getUsers', 'getMaids','getoneUser']),

    
    async writeToFirestore() {
      const time = new Date()
      const documentID = time.getTime().toString()
      console.log(documentID)
      const document = {
        text: this.messagesend,
        form: "admin",
        to: this.client_id,
        time: time.getTime().toString(),
        isRead:false,
      };
      const q = query(collection(db, "messages"));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));
      queryData.map(async () => {
        await setDoc(doc(db, `messages/${this.client_id}/${this.client_id}`, documentID), document);
        this.messagesend = '';
      })
      const document2 = {
        text: this.messagesend,
        from: "admin",
        to: this.client_id,
        time: time.toLocaleString(),
        isRead:false,
      };
      this.arraymessages.push(document2)
    },
    async clientData(id) {
      if(id){ 
        this.client_id = id
      }
      const db = getFirestore()
      const workQ = query(collection(db, `messages/${this.client_id}/${this.client_id}`))
      const workDetails = await getDocs(workQ)
      const messages = []
      const workInfo = workDetails.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      }));
      workInfo.forEach((newarray, idx, array)=>{
        // if(newarray.from != 'admin'){
        //   if (idx === array.length - 1){ 
        //       // this.Read(id,newarray.time)
        //       console.log("Last callback call at index " + idx + " with value " + newarray.time ); 
        //   } 
        // }
        var timestamps = newarray.time
        var res =parseInt(timestamps.substring(0, 13));
        var date = new Date(res);
        messages.push({
          "time":date.toLocaleString(),
          "from":newarray.from,
          "to":newarray.to,
          "text":newarray.text,
          "isRead":false,
        })
      })
      this.arraymessages = messages
      if (this.arraymessages != '') {
        this.active = true
      }
    },
    async Read(id,timeid){
      const washingtonRef =doc(db, `messages/${id}/${id}`, timeid);
      await updateDoc(washingtonRef, {
        isRead: true
      });
      this.is_read = true
    },
    async getUserfirebase() {
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach((doc) => {
          this.ReadOrNotRead(doc.id)
      });
    },
    async ReadOrNotRead(id){
      console.log(id)
      const db = getFirestore()
      const workQ = query(collection(db, `messages/${id}/${id}`))
      const workDetails = await getDocs(workQ)
      const workInfo = workDetails.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      }));
      workInfo.forEach((newarray, idx, array)=>{
        if (idx === array.length - 1){ 
            this.getoneUser(id)
            setTimeout(() => {
              this.alluser.push({
                "name":this.allUsersList.data.userName,
                "id":this.allUsersList.data._id,
                "time":newarray.time,
              })
            }, 1000);
            console.log(this.alluser)
            if(newarray.from != 'admin'){
              this.is_read = newarray.isRead
            } 
        }
      })
    }
  },
  created() {
    setInterval(() => {
      this.clientData(this.client_id)
    }, 1000)
  },
  mounted() {
    if (this.alluser == '') {
      this.getUserfirebase()
    }
  },
}
</script>
<style scoped>

.unread{
    height: 24px;
    width: 50px;
    background-color: #d63031;
    border-radius: 20px;
    color: white;
    text-align: center;
    position: absolute;
    top: 16px;
    right: 11px;
    padding: 3px;
    border-style: solid;
    border-width: 2px;
}

</style>
