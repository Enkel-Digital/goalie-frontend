<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="fixed-top">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$refs.sideNavBar.show = !$refs.sideNavBar.show"
        />

        <!-- <q-toolbar-title>
          Goalie
        </q-toolbar-title> -->
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>

      <div class="q-px-lg q-pt-xl q-mb-md">
        <!-- @todo Make this changeable -->
        <div class="text-h3">Goalie</div>
        <div class="text-subtitle1">
          {{ todaysDate }}
        </div>
      </div>

      <!-- @todo Dont use relative path -->
      <!-- src="../assets/mountains_small.jpg" -->
      <q-img src="../assets/mountains.jpg" class="header-image absolute-top" />
    </q-header>

    <SideNavBar ref="sideNavBar" />

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import SideNavBar from "../components/SideNavBar.vue";

export default {
  name: "MainLayout",

  components: { SideNavBar },

  computed: {
    todaysDate() {
      return date.formatDate(Date.now(), "dddd D MMMM");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.7;
}
</style>
