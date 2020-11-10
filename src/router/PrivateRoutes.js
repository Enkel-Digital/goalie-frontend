// Import AuthType Enum
import AuthType from "./AuthType";

/** @notice Pre-Load components for frequently used routes */

/**
 * @notice Right now all routes are being lazy loaded. Might change in the future.
 *
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */
const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
  // @todo Support URL querys to store the filtering list, so that they can actually bookmark this
  {
    // path: "/todo/all",
    path: "/todo/:visibility",
    name: "todos-all",
    // component: () => import("@/views/AllTodos.vue"),
    component: () => import("@/views/Todos.vue"),
    meta: { Auth_requirements: AuthType.private },
    props: true,
  },
  // {
  //   path: "/todo/new",
  //   name: "todos-new",
  //   component: () => import("@/views/NewTodo.vue"),
  //   meta: { Auth_requirements: AuthType.private },
  // },
  // {
  //   path: "/goals/all",
  //   name: "goals-all",
  //   component: () => import("@/views/AllLinks.vue"),
  //   meta: { Auth_requirements: AuthType.private },
  // },
  // {
  //   path: "/goals/new",
  //   name: "goals-new",
  //   component: () => import("@/views/NewLink.vue"),
  //   meta: { Auth_requirements: AuthType.private },
  // },

  // /*  */

  // {
  //   path: "/classdetails/:classID",
  //   name: "ClassDetails",
  //   component: () => import("@/views/ClassDetails.vue"),
  //   meta: { Auth_requirements: AuthType.private },
  //   props: true,
  // },
  // {
  //   path: "/settings",
  //   name: "settings",
  //   component: () => import("@/views/Settings.vue"),
  //   meta: { Auth_requirements: AuthType.private },
  // },
];

export default routes;
