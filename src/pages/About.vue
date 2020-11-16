<template>
  <q-page class="q-pa-lg">
    <h5>About Goalie</h5>

    <p>Build info</p>
    <ul>
      <li>App mode: {{ mode }}</li>
      <li>Build Time: {{ buildTime }}</li>
      <li>Commit Hash: {{ commitHash }}</li>
      <li>Branch: {{ gitBranch }}</li>
      <li>NODE_ENV: {{ NODE_ENV }}</li>
    </ul>

    <br />

    <p>App info</p>
    <ul>
      <li>
        Developers:
        <a href="https://solutions.enkeldigital.com" target="_blank">
          Enkel Digital
        </a>
      </li>
      <li>App Status: Pre-alpha, technical preview</li>
      <li>App version: 0.0.1</li>
      <li>API version: 0.0.1</li>
    </ul>

    <br />

    <p>Vue Env injected with "VUE_APP_"</p>
    "VUE_APP_" is stripped out
    <ul>
      <li v-for="envKey in Object.keys(env)" :key="envKey">
        {{ envKey.replace("VUE_APP_", "") }}: {{ env[envKey] }}
      </li>
    </ul>

    <br />

    <!-- <p>Configs</p>
    <ul>
      <li v-for="configKey in Object.keys(configs)" :key="configKey">
        {{ configKey }}: {{ configs[configKey] }}
      </li>
    </ul> -->

    <br />

    <p>Constants</p>
    <ul>
      <li v-for="constantKey in Object.keys(constants)" :key="constantKey">
        {{ constantKey }}: {{ constants[constantKey] }}
      </li>
    </ul>
  </q-page>
</template>

<script>
// import configs from "@/config";

export default {
  name: "About",

  data() {
    return {
      // configs,
      constants: {}, // Empty for now as constants dir/ is not exporting anything yet

      env: process.env,

      mode: process.env.MODE,
      buildTime: process.env.buildTime,
      commitHash: process.env.commitHash,
      gitBranch: process.env.gitBranch,
      NODE_ENV: process.env.NODE_ENV,
    };
  },
};
</script>

<style scoped>
#about {
  text-align: left;
}
</style>
