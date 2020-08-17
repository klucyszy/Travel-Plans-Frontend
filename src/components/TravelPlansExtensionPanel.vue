<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-row no-gutters>
                <v-col cols="12">{{panelTitle}}</v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row no-gutters justify="space-around">
                <v-col cols="4">
                    <v-text-field v-model="trip.name" label="Trip name" placeholder="Enter trip name.." :readonly="readonly"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-menu ref="startMenu" offset-y min-width="290px"
                            :close-on-content-click="false"
                            :return-value.sync="trip.startDate">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="trip.startDate" label="Start date" placeholder="Select start date.." prepend-icon="event"
                                        readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-if="!readonly" v-model="trip.startDate" no-title scrollable>
                            <v-btn text color="primary" @click="$refs.startMenu.isActive = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.startMenu.save(trip.startDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="4">
                    <v-menu ref="endMenu" offset-y min-width="290px"
                            :close-on-content-click="false"
                            :return-value.sync="trip.endDate">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="trip.endDate" label="End date" placeholder="Select end date.." prepend-icon="event"
                                        readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-if="!readonly" v-model="trip.endDate" no-title scrollable>  
                            <v-btn text color="primary" @click="$refs.endMenu.isActive = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.endMenu.save(trip.endDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row no-gutters justify="space-around">
                <v-col cols="6" class="d-flex justify-left">
                    <v-text-field v-model="newLocation" label="Location" placeholder="Add new trip location.." :readonly="readonly"></v-text-field>
                    <v-btn v-on:click="addLocation" class="mx-2" small fab dark color="indigo">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-chip class="mx-2" v-for="(location, index) in trip.locations" :key="index">
                        <span>{{ location }}</span>
                        <v-btn v-if="!readonly" v-on:click="removeLocation(location)" class="mx-0" small dark icon color="grey">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </v-chip>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-btn v-if="addButtonEnabled" v-on:click="addTrip" class="ma-2" outlined color="indigo">Add trip</v-btn>                
                <v-btn v-if="editButtonEnabled" v-on:click="enableEditing" class="ma-2" outlined color="indigo">Edit changes</v-btn>
                <v-btn v-if="saveButtonEnabled" v-on:click="saveChanges" class="ma-2" outlined color="indigo">Save changes</v-btn>
                <v-btn v-if="saveButtonEnabled" v-on:click="cancelChanges" class="ma-2" outlined color="indigo">Cancel changes</v-btn>                
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
          default: null
      },
      addButtonEnabled: {
          type: Boolean,
          default: false
      },
      editModeEnabled: {
          type: Boolean,
          default: false
      },
      deleteButtonEnabled: {
          type: Boolean,
          default: false
      },
      trip: {
          name: "",
          startDate: "",
          endDate: "",
          locations: []
      }
  },
  data() {
      return {
          newLocation: "",
          readonly: true,
          originalTrip: {}
      }
  },
  mounted() {
      this.originalTrip = JSON.parse(JSON.stringify(this.trip));
      
      // Start edit mode, when Panel is in 'Add' mode.
      if(this.addButtonEnabled){
          this.readonly = false;
      }
  },
  computed: {
      panelTitle() {
          if (this.title) {
              return this.title;
          }

          if (this.trip) {
              return this.trip.name;
          }

          return "";
      },
      editButtonEnabled() {
          return this.editModeEnabled && this.readonly;
      },
      saveButtonEnabled() {
          return this.editModeEnabled && !this.readonly;
      }
  },
  methods: {
      addTrip() {
          this.$emit('add-trip-clicked', this.trip);
      },
      deleteTrip() {
          this.$emit('delete-trip-clicked', this.trip.id);
      },
      saveChanges() {
          this.$emit('save-trip-clicked', this.trip);
          this.readonly = true;
          this.newLocation = "";
          this.originalTrip = JSON.parse(JSON.stringify(this.trip));
      },
      enableEditing() {
          this.readonly = false;
      },
      cancelChanges() {
          this.newLocation = "";
          this.trip = JSON.parse(JSON.stringify(this.originalTrip));
          this.readonly = true;
      },
      addLocation() {
          if (this.newLocation !== "") {
              this.trip.locations.push(this.newLocation);
              this.newLocation = "";
          }
      },
      removeLocation(location){
          for( var i = 0; i < this.trip.locations.length; i++) { 
              if ( this.trip.locations[i] === location) { 
                  this.trip.locations.splice(i, 1); 
                }
            }
      }
  }
};
</script>
