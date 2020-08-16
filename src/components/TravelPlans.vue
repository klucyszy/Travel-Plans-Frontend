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
        <travel-plans-extension-panel v-for="(trip, index) in trips" :key="index"
            :title="trip.name"
            :save-changes-button-enabled="true"
            :delete-button-enabled="true"
            :trip="trip">
        </travel-plans-extension-panel>
    </v-expansion-panels>


  </div>
</template>

<script>
import TravelPlansExtensionPanel from './TravelPlansExtensionPanel';

export default {
  name: 'TravelPlans',
  components: {
    TravelPlansExtensionPanel
  },
  methods: {
    clearTripDataObject() {
        this.trip = {
            name: "",
            start: "",
            end: "",
            locations: []
        }
      },
      addTrip() {
          this.trips.push(this.trip);
          this.clearTripDataObject();
      }
  },
  data() {
      return {
          trip: {
              name: "",
              readonly: false,
              start: "",
              end: "",
              locations: []
          },
          trips: [{
              name: "Test 1",
              readonly: true,
              start: "2020-08-22",
              end: "2020-08-26",
              locations: ["Croatia", "Serbia"]
          },
          {
              name: "Test 2",
              readonly: true,
              start: "2020-08-22",
              end: "2020-08-26",
              locations: ["Croatia", "Serbia"]
          },
          {
              name: "Test 3",
              readonly: true,
              start: "2020-08-22",
              end: "2020-08-26",
              locations: ["Croatia", "Serbia"]
          }]
      }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
