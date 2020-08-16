<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-row no-gutters>
                <v-col cols="12">{{title}}</v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row no-gutters justify="space-around">
                <v-col cols="4">
                    <v-text-field v-model="trip.name" label="Trip name" placeholder="Enter trip name.."></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-menu ref="startMenu" offset-y min-width="290px"
                            :close-on-content-click="false"
                            :return-value.sync="trip.start">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="trip.start" label="Start date" placeholder="Select start date.." prepend-icon="event"
                                        readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="trip.start" no-title scrollable>
                            <v-btn text color="primary" @click="$refs.startMenu.isActive = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.startMenu.save(trip.start)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="4">
                    <v-menu ref="endMenu" offset-y min-width="290px"
                            :close-on-content-click="false"
                            :return-value.sync="trip.end">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="trip.end" label="End date" placeholder="Select end date.." prepend-icon="event"
                                        readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="trip.end" no-title scrollable>  
                            <v-btn text color="primary" @click="$refs.endMenu.isActive = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.endMenu.save(trip.end)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row no-gutters justify="space-around">
                <v-col cols="6" class="d-flex justify-left">
                    <v-text-field v-model="newLocation" label="Location" placeholder="Add new trip location.."></v-text-field>
                    <v-btn v-on:click="addLocation" class="mx-2" small fab dark color="indigo">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-chip class="mx-2" v-for="(location, index) in trip.locations" :key="index">
                        <span>{{ location }}</span>
                    </v-chip>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-btn v-if="addButtonEnabled" v-on:click="addTrip" class="ma-2" outlined color="indigo">Add trip</v-btn>
                <v-btn v-if="saveChangesButtonEnabled" v-on:click="saveChanges" class="ma-2" outlined color="indigo">Save changes</v-btn>
                <v-btn v-if="deleteButtonEnabled" v-on:click="deleteTrip" class="ma-2" outlined color="indigo">Delete trip</v-btn>
            </v-row>    
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
  name: 'TravelPlansExtensionPanel',
  props: {
      title: {
          type: String,
          default: "Trip"
      },
      addButtonEnabled: {
          type: Boolean,
          default: false
      },
      saveChangesButtonEnabled: {
          type: Boolean,
          default: false
      },
      deleteButtonEnabled: {
          type: Boolean,
          default: false
      },
      trip: {
          name: "",
          start: "",
          end: "",
          readonly: false,
          locations: []
      }
  },
  data() {
      return {
          newLocation: ""
      }
  },
  methods: {
      addTrip() {
          this.$emit('add-trip-clicked', this.trip);
      },
      deleteTrip() {
          this.$emit('delete-trip-clicked', this.trip);
      },
      saveChanges() {
          this.$emit('save-trip-clicked', this.trip);
      },
      addLocation() {
          if (this.newLocation !== "") {
              this.trip.locations.push(this.newLocation);
              this.newLocation = "";
          }
      }
  }
};
</script>
