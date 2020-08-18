<template>
  <div >
    <h1>Plan your travels!</h1>
    <h2>Create a new trip!</h2>
    <v-expansion-panels>
      <travel-plans-extension-panel
          title="Add new trip!" 
          :add-button-enabled="true" 
          :trip="trip"
          @add-trip-clicked="addTrip">
      </travel-plans-extension-panel> 
    </v-expansion-panels>
    
    <h2>Discover your trips!</h2>
    <v-expansion-panels>
        <travel-plans-extension-panel v-for="(trip) in trips" :key="trip.id"
            :edit-mode-enabled="true"
            :delete-button-enabled="true"
            :trip="trip"
            @save-trip-clicked="saveTrip"
            @delete-trip-clicked="deleteTrip">
        </travel-plans-extension-panel>
    </v-expansion-panels>


  </div>
</template>

<script>
import { addTravelPlan, getMyTravelPlans, getAllTravelPlans, updateTravelPlan, removeTravelPlan } from './../api/travelPlans.api';
import TravelPlansExtensionPanel from './TravelPlansExtensionPanel';

export default {
  name: 'TravelPlans',
  components: {
    TravelPlansExtensionPanel
  },
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
      trips: []
    }
  },
  mounted() {
    this.loadUserTravelPlans();
  },
  methods: {
    clearTripDataObject() {
      this.trip = {
          name: "",
          startDate: "",
          endDate: "",
          locations: []
      }
    },
    addTrip() {
      addTravelPlan(this.trip)
        .then(() => {
          this.clearTripDataObject();
          this.loadUserTravelPlans();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    saveTrip(trip) {
      updateTravelPlan(trip)
        .then(() => {
          this.loadUserTravelPlans();
        })
        .catch((err) => {
          console.log("Update failed for: " + trip.id);
          console.log(err);
        })
    },
    deleteTrip(id) {
      removeTravelPlan(id)
        .then(() => {
          this.loadUserTravelPlans();
        })
        .catch((err) => {
          console.log(`Remove of item ID: ${id} failed.`);
          console.log(err);
        })
    },
    loadUserTravelPlans() {
      getMyTravelPlans()
        .then((res) => {
          if(res && res.data && Array.isArray(res.data)){
            this.trips = res.data;
          }       
        })
        .catch((err) => {
          console.log(err)
        })        
    },
    loadAllTravelPlans() {
      this.trips = getAllTravelPlans();
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 10px 0 0;
}

</style>
