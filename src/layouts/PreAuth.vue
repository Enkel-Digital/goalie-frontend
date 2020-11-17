<template>
  <q-layout view="lHh Lpr lFf">
    <div class="text-white q-px-lg q-pt-xl q-mb-md">
      <div class="text-h3">Goalie</div>
    </div>

    <!-- @todo Dont use relative path -->
    <!-- src="../assets/mountains_small.jpg" -->
    <!-- Different image for different views, mobile and desktop -->
    <q-img src="../assets/mountains.jpg" class="header-image absolute-top" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "PreAuthLayout",
};
</script>

<style lang="scss" scoped>
.header-image {
  height: 100%;
  z-index: -1;
}
</style>
