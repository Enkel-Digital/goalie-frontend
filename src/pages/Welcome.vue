<template>
  <q-page class="q-pa-lg">
    <q-btn
      :to="{ name: 'signup' }"
      width="calc(100% - 5em)"
      color="orange darken-1"
      dark
    >
      Sign Up
    </q-btn>

    <br />
    <br />

    <q-btn
      :to="{ name: 'login' }"
      width="calc(100% - 5em)"
      color="blue darken-2"
      dark
    >
      Login
    </q-btn>

    <div
      style="
        position: absolute;
        bottom: 1vh;
        font-size: 0.6em;
        text-align: center;
      "
    >
      <p>version: {{ buildTime + " " + commitHash.slice(0, 6).toString() }}</p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Welcome",

  data() {
    console.log("this.$q.Platform", this.$q.platform.is);
    // console.log(
    //   this.$q.platform.is.mobile,
    //   this.$q.platform.is.desktop,
    //   this.$q.platform.is.electron
    // );

    return {
      buildTime: process.env.buildTime,
      commitHash: process.env.commitHash,
    };
  },
};
</script>
