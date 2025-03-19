import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import Transfer from "../views/Transfer.vue";
import TransferConfirmation from "../views/TransferConfirmation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
    },
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
      path: "/confirmation",
      name: "confirmation",
      component: TransferConfirmation,
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