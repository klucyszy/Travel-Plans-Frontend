<template>
    <div>    
        <v-row no-gutters align="center" justify="start">
            <v-col cols="4" class="d-flex justify-start">
                <h2 class="indigo--text">Travel Plans</h2>
            </v-col>
            <v-spacer/>
            <v-col cols="4" class="d-flex justify-center">
                <div v-if="user">
                    <v-btn class="ma-2" tile outlined color="indigo" v-on:click="signOut">
                        <v-icon left>mdi-microsoft</v-icon>SIGN OUT
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn class="ma-2" tile outlined color="indigo" v-on:click="signIn">
                        <v-icon left>mdi-microsoft</v-icon>SIGN IN WITH AZURE AD
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row v-if="user" no-gutters align="center" justify="start" class="mb-2">
            <v-col cols="12" class="d-flex justify-start">
                <div v-if="user">
                    Hello, {{user.userName}}
                </div>
            </v-col>
        </v-row>
        <v-row v-if="user" no-gutters align="center" justify="center">
            <v-col cols="12">
                <TravelPlans/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import TravelPlans from './TravelPlans';
import { msalMixin } from 'vue-msal'; 

export default {
    name: 'AppAuthorizer',
    components: {
        TravelPlans
    },
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
        },
        accessToken() {
            if(this.msal.isAuthenticated) {
                return this.msal.accessToken;
            }

            return null;
        }
    },
    watch: {
        accessToken(newValue) {
            if (newValue){
                this.saveWepApiTokenToSessionStorage();
            }
        }
    },
    methods: {
        async signIn() {
            await this.$msal.signIn();
        },
        signOut() {
            this.$msal.signOut();
            this.clearWebApiTokenFromSessionStorage();
        },
        async acquireToken() {
            await this.$msal.acquireToken({ scopes: ['api://41da160f-4bcc-4d79-80e7-71a51262afb4/user_impersonation'] });
        },
        showIdToken() {
            console.log(this.$msal.idToken);
        },
        saveWepApiTokenToSessionStorage() {
            if (this.user && this.msal.accessToken) {
                sessionStorage.setItem("TRAVEL_PLANS_API_TOKEN", `Bearer ${this.msal.accessToken}`);
            }
        },
        clearWebApiTokenFromSessionStorage() {
            sessionStorage.setItem("TRAVEL_PLANS_API_TOKEN", "");
        }
    }
};
</script>
