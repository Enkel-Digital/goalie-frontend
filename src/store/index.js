import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV.toLowerCase() !== "production",

  modules: {
    
  },

  plugins: [
    /* Note that createPersistedState use the same key "vuex" in storage, but they do not clash as they use different storage APIs */
    // Register modules for persistent state using localStorage
    createPersistedState({
      paths: ["user", "todos", "goals", "subscription"],
    }),
    // Register modules for persistent state using sessionStorage
    createPersistedState({
      storage: window.sessionStorage,
      paths: [""],
    }),
  ],
});
