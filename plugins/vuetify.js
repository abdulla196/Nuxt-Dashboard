import Vue from 'vue'
import Vuetify from 'vuetify' 
Vue.use(Vuetify)

export default new Vuetify({
  rtl: true,
    theme: {
        light: true,
        themes: {
            light: {
              primary: '#2b4749',
              secondary: '#2b4749',
              accent: '#bf804b',

            }
        }
    }
})
