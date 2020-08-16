<template>
  <v-app>
    <v-container>
      <v-main>
        <AppAuthorizer/>
        <TravelPlans/>
    </v-main>
    </v-container>
  </v-app>
</template>

<script>
import TravelPlans from './components/TravelPlans';
import AppAuthorizer from './components/AppAuthorizer';

export default {
  name: 'App',

  components: {
    TravelPlans,
    AppAuthorizer
  },

  data: () => ({
    //
  }),
};
</script>
