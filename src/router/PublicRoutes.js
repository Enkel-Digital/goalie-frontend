// Import AuthType Enum
import AuthType from "./AuthType";

/** @notice Pre-Load all components for frequently used routes */

/**
 * @notice Some of these less frequented routes uses lazily loaded components
 *
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */
const routes = [
  {
    path: "/",
    component: () => import("layouts/PreAuth.vue"),
    children: [
      {
        // This has to match root and cannot be a path
        // Because both public and private route, define "/" root path to
        // catch but leave their child components to handle it.
        // So if none of the child components catch it, then end up it becomes a invalid route, but it does not go to the catch all * 404 route.
        path: "/",
        name: "welcome",
        component: () => import("src/pages/Welcome.vue"),
        meta: { Auth_requirements: AuthType.public_only },
      },
      {
        path: "/login",
        name: "login",
        component: () => import("src/pages/Login.vue"),
        meta: { Auth_requirements: AuthType.public_only },
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("src/pages/Signup.vue"),
        meta: { Auth_requirements: AuthType.public_only },
      },
      // {
      //   path: "/about",
      //   name: "about",
      //   component: () => import("../pages/About.vue"),
      //   meta: { Auth_requirements: AuthType.public },
      // },
    ],
  },
];

export default routes;
