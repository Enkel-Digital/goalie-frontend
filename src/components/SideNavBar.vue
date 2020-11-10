<template>
  <v-navigation-drawer
    id="side-nav-bar"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    :clipped="true"
    app
  >
    <!-- @todo Make this section clickable and link to account page of settings -->
    <v-list-item class="px-2" two-line>
      <v-list-item-avatar>
        <img
          alt="Avatar"
          :src="'https://avatars2.githubusercontent.com/u/44993072?s=460'"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>

        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider />

    <!-- Items in the side nav bar -->
    <v-list dense>
      <v-list-item
        exact
        ripple
        v-for="item in defaultTabs"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>Todos</v-subheader>
      <v-list-item
        exact
        ripple
        v-for="item in todoTabs"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>Goals</v-subheader>
      <v-list-item
        exact
        ripple
        v-for="item in goalTabs"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>General</v-subheader>
      <v-list-item
        exact
        ripple
        v-for="item in user.admin
          ? generalTabs
          : generalTabs.filter((tab) => !tab.adminOnly)"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- @todo Convert this to their sub plan page like CE app / billing, where they can upgrade plan and see their usage and limits -->
      <!-- <v-subheader>Billing</v-subheader>
      <v-list-item
        exact
        ripple
        v-for="item in billingTabs"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item ripple hover @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// UI reference link https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/layouts/layouts/demos/google-contacts.vue

import { mapState } from "vuex";
import logout from "@/controllers/logout";

export default {
  name: "side-nav-bar",
  data() {
    return {
      drawer: true,
      mini: false,
      defaultTabs: [
        {
          // Perhaps home page should be the todos page?
          icon: "mdi-monitor-dashboard",
          text: "Dashboard",
          link: { name: "home" },
        },
        {
          // Shows all the todos in a timeline/calendar view or something
          icon: "mdi-calendar-month",
          text: "Schedule",
          link: { name: "view-schedule" },
        },
      ],
      todoTabs: [
        {
          icon: "mdi-view-list",
          text: "Todos",
          link: { name: "todos-all", params: { visibility: "all" } },
        },
        {
          // Perhaps this should be in the todos page itself.
          icon: "mdi-plus",
          text: "New todo",
          link: { name: "todos-new" },
        },
      ],
      goalTabs: [
        {
          icon: "mdi-view-list",
          text: "Goals",
          link: { name: "goals-all" },
        },
        {
          icon: "mdi-plus",
          text: "New Goal",
          link: { name: "goals-new" },
        },
        {
          icon: "mdi-calendar-clock",
          text: "Goal Timeline",
          link: { name: "goals-timeline" },
        },
        // {
        //   icon: "mdi-message-draw",
        //   text: "Reviews",
        //   link: { name: "all-reviews" },
        // },
      ],
      generalTabs: [
        {
          icon: "mdi-account",
          text: "Profile",
          link: { name: "partnerProfile" },
          adminOnly: true,
        },
        {
          // Should move settings to profile
          icon: "mdi-cog",
          text: "Settings",
          link: { name: "settings" },
        },
        {
          icon: "mdi-help-circle",
          text: "FAQs",
          link: { name: "faq" },
        },
        {
          icon: "mdi-chat",
          text: "Contact Support",
          link: { name: "contact-support" },
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout,
  },
};
</script>

<style scoped>
#side-nav-bar {
  text-align: left;
}
body {
  overflow: hidden;
  height: 100vh;
}
</style>
