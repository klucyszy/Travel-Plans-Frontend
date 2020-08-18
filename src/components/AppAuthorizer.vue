<template>
    <div v-if="user">
        <div>Welcome {{user.name}}</div>
        <v-btn class="ma-2" tile outlined color="indigo" v-on:click="signOut">
            <v-icon left>mdi-microsoft</v-icon>SIGN OUT
        </v-btn>
    </div>
    <div v-else>
        <v-btn class="ma-2" tile outlined color="indigo" v-on:click="signIn">
            <v-icon left>mdi-microsoft</v-icon>SIGN IN WITH AZURE AD
        </v-btn>
    </div>
</template>

<script>
import { msalMixin } from 'vue-msal'; 

export default {
    name: 'AppAuthorizer',
    mixins: [msalMixin],
    computed: {
        user() {
          let user = null;
          if (this.msal.isAuthenticated) {
            user = {
              ...this.msal.user 
            }
          }
          return user;
        }
    },
    methods: {
        signIn() {
            this.$msal.signIn();
        },
        signOut() {
            this.$msal.signOut();
        },
        async acquireToken() {
            await this.$msal.acquireToken({ scopes: ['api://41da160f-4bcc-4d79-80e7-71a51262afb4/user_impersonation'] });
        },
        showIdToken() {
            console.log(this.$msal.idToken);
        }
    }
};
</script>
