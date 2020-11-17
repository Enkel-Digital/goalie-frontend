import Vue from "vue";
import VueRouter from "vue-router";

import RouteGaurd from "./RouteGaurd";

// Import the private and public routes
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

// Attach use of vue route to the vue object instance
Vue.use(VueRouter);

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),

    // Mount all the seperate routes onto the main router's routes
    routes: [
      ...PrivateRoutes,
      ...PublicRoutes,

      // Always leave 404 as last one to match all unmatched routes,
      {
        path: "*",
        // Wild card name so any invalid name comes here
        name: "*",
        component: () => import("pages/Error404.vue"),
      },
    ],

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  // Attach Router Gaurd Middleware function to run when navigation is made before the actual navigation.
  Router.beforeEach(RouteGaurd);

  return Router;
}
