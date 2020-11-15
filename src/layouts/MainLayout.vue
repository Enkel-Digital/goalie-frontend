<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <!-- <q-toolbar-title>
          Goalie
        </q-toolbar-title> -->
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>

      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Goalie</div>
        <div class="text-subtitle1">
          {{ todaysDate }}
        </div>
      </div>

      <!-- @todo Dont use relative path -->
      <!-- src="../assets/mountains_small.jpg" -->
      <q-img src="../assets/mountains.jpg" class="header-image absolute-top">
      </q-img>
    </q-header>

    <!-- @todo Remove the hardcoded 186px heights -->
    <!-- @todo Fix the links, the to attribute -->
    <!-- @todo Add in the active attribute using vue router or something, currently using exact attribute -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="800"
    >
      <q-scroll-area
        style="height: calc(100% - 186px); margin-top: 186px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Goals
            </q-item-section>
          </q-item>

          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>
              Todos
            </q-item-section>
          </q-item>

          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 186px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Jaimeloeuf</div>
          <div>@Jaimeloeuf</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";

export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },

  computed: {
    todaysDate() {
      return date.formatDate(Date.now(), "dddd D MMMM");
    }
  }
};
</script>

<style lang="scss" scoped>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.7;
}
</style>
