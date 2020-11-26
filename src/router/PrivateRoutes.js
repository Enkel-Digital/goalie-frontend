// Import AuthType Enum
import AuthType from "./AuthType";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { Auth_requirements: AuthType.private },
    children: [
      // @todo Tmp repeated route to allow both route names to work
      {
        name: "home",
        path: "/todos",
        component: () => import("pages/Todos.vue"),
      },

      {
        name: "todos",
        path: "/todos",
        component: () => import("pages/Todos.vue"),
      },
      {
        name: "reflections",
        path: "/reflections",
        component: () => import("pages/Reflections.vue"),
      },
      {
        name: "goals",
        path: "/goals",
        component: () => import("pages/Goals.vue"),
      },
      {
        name: "help",
        path: "/help",
        component: () => import("pages/Help.vue"),
      },
      {
        name: "about",
        path: "/About",
        component: () => import("pages/About.vue"),
      },
    ],
  },
];

export default routes;
