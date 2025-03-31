import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import Transfer from "../views/Transfer.vue";
import Contacts from "../views/Contacts.vue";
import Account from "../views/accounts/account.vue";
import Profile from "../views/accounts/Profile.vue";
import Settings from "../views/accounts/settings.vue";
import Funds from "../views/accounts/Funds.vue";
import NM from "../views/accounts/NM.vue";

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
      path: "/contacts",
      name: "contacts",
      component: Contacts,
    },
    {
      path: "/account",
      component: Account,
      children: [
        {
          path: "",
          redirect: "/account/profile",
        },
        {
          path: "profile",
          component: Profile,
        },
        {
          path: "setting",
          component: Settings,
        },
        {
          path: "funds",
          component: Funds,
        },
        {
          path: "nm",
          component: NM,
        },
      ],
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
