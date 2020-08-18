<template>
  <v-app>
    <v-container>
      <v-main>
        <AppAuthorizer/>
    </v-main>
    </v-container>
  </v-app>
</template>

<script>
import AppAuthorizer from './components/AppAuthorizer';

export default {
  name: 'App',

  components: {
    AppAuthorizer
  },

  data: () => ({
    //
  }),
};
</script>
