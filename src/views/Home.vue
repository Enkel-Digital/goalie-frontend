<template>
  <v-main id="Dashboard">
    <v-toolbar dense class="overline font-weight-light elevation-0">
      <v-toolbar-title>Your Dashboard</v-toolbar-title>
    </v-toolbar>
    <!-- <br /> -->
  </v-main>
</template>

<script>
// import ActiveClassCard from "@/components/ActiveClassCard.vue";

export default {
  name: "home",

  components: {
    // ActiveClassCard,
  },

  beforeMount() {
    // Using beforeMount hook to ensure this is ran again even if component is cached when navigating
    // Request store to get and populate all classes of partner
    // this.fetchDate();
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
#Dashboard {
  margin: 2em;
  margin-top: 1em;
}
</style>
