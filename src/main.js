import Vue from 'vue'
import App from './App.vue'
import msal from 'vue-msal'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(msal, {
  auth: {
    clientId: '66c00db9-6834-4102-a2d0-de04ccca0c06',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin
  },
  // request: {
  //   scopes: ['api://41da160f-4bcc-4d79-80e7-71a51262afb4/user_impersonation', 'user.read']
  // }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
