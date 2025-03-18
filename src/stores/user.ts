import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types";

export const useUserStore = defineStore("user", {
  state() {
    return {
      user: null as User | null,
    };
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
