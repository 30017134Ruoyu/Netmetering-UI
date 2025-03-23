import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import Transfer from "../views/Transfer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/register",
      name: "register",
      component: Register,
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/transfer",
      name: "transfer",
      component: Transfer,
    },
    {
      path: "/",
      redirect: "/dashboard",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Save the position if use the forward / backward behaviour of the browser
    } else {
      return { top: 0, behavior: "smooth" }; // Scroll to the top
    }
  },
});

export default router;