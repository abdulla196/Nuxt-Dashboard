<template>
  <div>
    <v-sheet class="overflow-hidden menu_header">
      <v-navigation-drawer
        v-model="allUsers.menuHeader"
        absolute
        top
        temporary
        :right="$i18n.locale === 'ar'"
      >
        <v-list-item>
          <div class="menu_head">
            <p class="logo">
              <img src="/images/logo.jpeg"/></p>
            <v-app-bar-nav-icon
              class="menuBtn"
              @click.stop="onClose()"
            ></v-app-bar-nav-icon>

          </div>
        </v-list-item>

        <v-divider></v-divider>
        
        <v-list-item v-if="allAuth.checkAuth" >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content v-if="allAuth.user">
          <v-list-item-title v-text="allAuth.user.userName"></v-list-item-title>

          <v-list-item-subtitle v-text="allAuth.user.email"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <NuxtLink :to="localePath('/')"  v-if="allAuth.checkAuth">
        <v-list-item link>
          <v-list-item-icon>
            <font-awesome-icon icon="house" class="fa" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <span class="navM_">{{ $t('Home') }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>


        <v-list  v-if="allAuth.checkAuth">
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.items"
              :key="child.title"
              link
            >
            
                <NuxtLink style="width:100%" :to="localePath('/'+child.href)" v-text="child.title"></NuxtLink>
            </v-list-item>
            
          </v-list-group>
        </v-list>
        
              <NuxtLink :to="localePath('/chat')" v-if="allAuth.checkAuth" style="position: relative;display: block;">
                
                <v-list-item link>
                  <v-list-item-icon>
                    <font-awesome-icon icon="message" class="fa" />
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      <div class = "number"  v-if="is_read = false">new</div>
                      <span class="navM_">chat</span></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </NuxtLink>
        <NuxtLink :to="localePath('/users/myinfo')" v-if="allAuth.checkAuth">
          <v-list-item link>
            <v-list-item-icon>
              <font-awesome-icon icon="user" class="fa" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <span class="navM_">{{
                  $t('My Account')
                }}</span></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
        <!-- <v-list-item class="menu_lang">
          <v-list-item-icon>
            <font-awesome-icon icon="globe" class="fa" />
          </v-list-item-icon>

          <v-list-item-content>
            {{ $t('language_') }}

            <div class="menu_language_">
              <v-btn text x-small :disabled="this.$i18n.locale === 'ar'">
                <a @click="changeLanguage('ar')">
                  <img width="24px" src="/saflag.png" />
                </a>
              </v-btn>
              <v-btn text x-small :disabled="this.$i18n.locale === 'en'">
                <a @click="changeLanguage('en')">
                  <img width="24px" src="/usflag.png" />
                </a>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item> -->
        <v-divider></v-divider>

        <v-list-item link @click="Logout" v-if="allAuth.checkAuth">
          <v-list-item-icon>
            <font-awesome-icon class="fa" icon="arrow-right-from-bracket" />
          </v-list-item-icon>

          <v-list-item-content>
            {{ $t('Logout') }}
          </v-list-item-content>
        </v-list-item>

        <NuxtLink :to="localePath('/login')">
          <v-list-item link v-if="!allAuth.checkAuth">
            <v-list-item-icon>
              <font-awesome-icon class="fa" icon="arrow-right-from-bracket" />
            </v-list-item-icon>

            <v-list-item-content>
              {{ $t('Login') }}
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
      </v-navigation-drawer>
    </v-sheet>
    <v-overlay :value="allUsers.menuHeader"></v-overlay>
  </div>
</template>
 <script>
import { db } from "~/plugins/firebase.js"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      is_read:true,
       items: [
        {
          action: 'mdi-account-multiple',
          items: [
            { title: 'Users',href:'users' },
            { title: 'Create User',href:'register' }
          ],
          title: 'Users',
        },
        {
          action: 'mdi-account-multiple',
          items: [
            { title: 'Maids',href:'maids' },
          ],
          title: 'Maids',
        },
        {
          action: 'mdi-notification-clear-all',
          items: [
            { title: 'Notifications',href:'Notifications' },
            { title: 'Create Notifications',href:'Notifications/create' }
          ],
          title: 'Notification',
        },
        {
          action: 'mdi-skip-previous',
          items: [
            { title: 'Reviews',href:'reviews' },
            { title: 'Create Reviews',href:'reviews/create' }
          ],
          title: 'Reviews',
        },
        {
          action: 'mdi-account-star',
          items: [
            { title: 'Favourite',href:'favourite' },
            { title: 'Create Favourite',href:'favourite/create' }
          ],
          title: 'Favourite',
        },
        {
          action: 'mdi-account',
          items: [
            { title: 'Create User',href:'register' },
          ],
          title: 'Create User',
        }
      ],
    }
  },
  computed: {
    ...mapGetters(['allUsersList','allUsers', 'allAuth']),
  },
  methods: {
    ...mapActions(['Logout', 'changeLanguage','myInfo', 'changeMenuHeader']),
    onClose() {
      this.changeMenuHeader(false)
    },
    
    
    async getUserfirebase() {
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach((doc) => {
          this.ReadOrNotRead(doc.id)
      });
    },
    async ReadOrNotRead(id){
      const db = getFirestore()
      const workQ = query(collection(db, `messages/${id}/${id}`))
      const workDetails = await getDocs(workQ)
      const workInfo = workDetails.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      }));
      workInfo.forEach((newarray, idx, array)=>{
        if (idx === array.length - 1){
            if(newarray.from != 'admin'){
              if(newarray.isRead == 'false'){
                this.is_read = false
              }
            } 
        }
      })
    }
  },
  created() {
    setInterval(() => {
      // this.getUserfirebase()
    }, 1000)
  },
  mounted(){
    this.getUserfirebase()
    if(this.allAuth.checkAuth){
    this.myInfo();
    }
  }
}
</script>

<style scoped>
.menu_head {
  display: flex;
  justify-content:space-between;
    align-items: center;
  width: 100%;
  padding: 15px;
}
.menu_head a {
  padding: 0px;
  margin: 0px;
  width: 80px;
}
.logo {
  display: flex;
  justify-content: center;
  width: 100px;
  height: 40px;
  margin: 0px;
}
.menu_head .logo{
  font-size: 1.5rem;
  font-weight: bold;
}
.logo img {
  min-width: 47px;
  height: 40px;
  position: absolute;
}
  
a.nuxt-link-exact-active {
  color: #bf804b;
  padding-bottom: 10px;
}

.menuBtn {
  font-size: 20px;
  line-height: 58px;
  color: #444 !important;
}
.navM_ {
  font-size: 14px;
}
.menu_lang .v-list-item__content {
  display: flex;
  padding: 0px;
  flex-wrap: nowrap;
  font-size: 14px;
}

.menu_language_ {
  display: flex;
  margin-top: 5px;
  flex: 1;
  justify-content: flex-end;
}
.menu_language_ button {
  padding: 0px;
  margin: 0px;
  width: max-content;
}
.menu_language_ div {
  margin: 0px 10px;
}
@media (max-width: 1100px) {
  .menu_head {
    justify-content: flex-start;
    padding: 15px 0px;
  }
}
@media (max-width: 700px) {
  .menu_head button {
    min-width: auto !important;
    padding: 0 3px !important;
  }
}
.number{
    height: 30px;
    width: 50px;
    background-color: #d63031;
    border-radius: 20px;
    color: white;
    text-align: center;
    position: absolute;
    top: 10px;
    right: 11px;
    padding: 3px;
    border-style: solid;
    border-width: 2px;
}

</style>