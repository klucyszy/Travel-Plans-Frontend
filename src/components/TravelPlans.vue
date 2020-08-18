<template>
  <div>
    <v-row no-gutters align="center" justify="start">
      <v-col cols="8" class="d-flex justify-start">
        <h1 v-show="!showAdminMode">Plan your travels</h1>
        <h1 v-show="showAdminMode">Administer travel plans</h1>
      </v-col>
      <v-col v-if="isAdmin" cols="4" class="d-flex justify-center">
        <v-sheet class="pa-5">
          <v-switch v-model="adminMode" inset :label="showAdminModeLabel" color="indigo" dense></v-switch>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="start">
      <v-col cols="12">
        <div v-show="!showAdminMode">
          <h2>Plan a new trip</h2>
          <v-expansion-panels>
            <travel-plans-extension-panel
                title="Add new trip!" 
                :add-button-enabled="true" 
                :trip="trip"
                :error-message="newTripErrors"
                @add-trip-clicked="addTrip">
            </travel-plans-extension-panel> 
          </v-expansion-panels>
        </div>
      </v-col>
      <v-col cols="12">
        <h2 v-show="!showAdminMode">Discover your trips</h2>
        <v-expansion-panels>
          <travel-plans-extension-panel v-for="(trip) in trips" :key="trip.id"
              :description="travelPlanOwner"
              :edit-mode-enabled="true"
              :delete-button-enabled="true"
              :trip="trip"
              @save-trip-clicked="saveTrip"
              @delete-trip-clicked="deleteTrip">
          </travel-plans-extension-panel>
        </v-expansion-panels>
      </v-col>  
    </v-row>
  </div>
</template>

<script>
import { addTravelPlan, getMyTravelPlans, getAllTravelPlans, updateTravelPlan, removeTravelPlan } from './../api/travelPlans.api';
import TravelPlansExtensionPanel from './TravelPlansExtensionPanel';
import { msalMixin } from 'vue-msal'; 

export default {
  name: 'TravelPlans',
  components: {
    TravelPlansExtensionPanel
  },
  mixins: [msalMixin],
  data() {
    return {
      trip: {
          id: 0,
          name: "",
          readonly: false,
          startDate: "",
          endDate: "",
          locations: []
      },
      trips: [],
      isAdmin: false,
      adminMode: false,
      newTripErrors: "",
    }
  },
  computed: {
    travelPlanOwner() {
      if (this.showAdminMode) return this.user.name;
      else return null;
    },
    showAdminMode() {
      return this.isAdmin && this.adminMode;
    },
    showAdminModeLabel() {
      return this.showAdminMode ? "Admin Mode" : "User Mode";
    },
    accessToken() {
      if(this.msal.isAuthenticated) {
          return this.msal.accessToken;
      }

      return null;
    },
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
  created() {
    this.loadUserTravelPlans();
  },
  methods: {
    clearTripDataObject() {
      this.trip = {
          name: "",
          startDate: "",
          endDate: "",
          locations: []
      },
      this.newTripErrors = null;
    },
    addTrip() {
      addTravelPlan(this.trip)
        .then(() => {
          this.clearTripDataObject();
          this.loadUserTravelPlans();
        })
        .catch((err) => {
          if(err.response.data.title) {
            this.newTripErrors = err.response.data.title;
          }

          console.log(err);
        })
    },
    saveTrip(trip) {
      updateTravelPlan(trip)
        .then(() => {
          if(this.showAdminMode){
            this.loadAllTravelPlans();
          } else {
            this.loadUserTravelPlans();
          }          
        })
        .catch((err) => {
          console.log("Update failed for: " + trip.id);
          console.log(err);
        })
    },
    deleteTrip(id) {
      removeTravelPlan(id)
        .then(() => {
          if(this.showAdminMode){
            this.loadAllTravelPlans();
          } else {
            this.loadUserTravelPlans();
          }
        })
        .catch((err) => {
          console.log(`Remove of item ID: ${id} failed.`);
          console.log(err);
        })
    },
    loadUserTravelPlans() {
      getMyTravelPlans()
        .then((res) => {
          if(res && res.data.travelPlans && Array.isArray(res.data.travelPlans)){
            this.trips = res.data.travelPlans;
            this.isAdmin = res.data.isAdmin;
          } 
        })
        .catch((err) => {
          console.log(err)
        })        
    },
    loadAllTravelPlans() {
      this.trips = getAllTravelPlans()
        .then((res) => {
          if(res && res.data.travelPlans && Array.isArray(res.data.travelPlans)){
            this.trips = res.data.travelPlans;
            this.isAdmin = res.data.isAdmin;
          } 
        })
        .catch((err) => {
          console.log(err)
        }) 
    }
  },
  watch: {
    showAdminMode(newValue) {
      if (newValue) {
        this.loadAllTravelPlans();
      }
      else {
        this.loadUserTravelPlans();
      }
    },
    accessToken(newValue) {
      if (newValue) {
        this.loadUserTravelPlans();
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 10px 0 0;
}

</style>
