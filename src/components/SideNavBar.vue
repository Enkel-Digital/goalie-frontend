<template>
  <!-- @todo Remove the hardcoded 186px heights -->
  <!-- @todo Fix the links, the to attribute -->
  <!-- @todo Add in the active attribute using vue router or something, currently using exact attribute -->
  <q-drawer v-model="show" show-if-above :width="250" :breakpoint="800">
    <q-scroll-area
      style="
        height: calc(100% - 186px);
        margin-top: 186px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section> Inbox </q-item-section>
        </q-item>

        <q-item :to="{ name: 'goals' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section> Goals </q-item-section>
        </q-item>

        <q-item :to="{ name: 'todos' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section> Todos </q-item-section>
        </q-item>

        <q-item :to="{ name: 'reflections' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section> Reflection </q-item-section>
        </q-item>

        <q-item :to="{ name: 'help' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>

          <q-item-section> Help </q-item-section>
        </q-item>

        <q-item :to="{ name: 'about' }" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>

          <q-item-section> About </q-item-section>
        </q-item>

        <q-item @click="logout" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section> Logout </q-item-section>
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
</template>

<script>
import logout from "../utils/logout.js";

export default {
  name: "SideNavBar",

  // props: {
  //   show: {
  //     default: false,
  //     type: Boolean,
  //   },
  // },

  // By using data instead of props, if parent wants to toggle, they will have to toggle using a ref
  // Refer to: https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
  data() {
    return {
      show: false,
    };
  },

  methods: {
    logout,
  },
};
</script>
