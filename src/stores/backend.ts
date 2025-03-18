import { defineStore } from "pinia";

export const useBackendStore = defineStore("backend", {
  state() {
    return {
      URL: "http://localhost:8080",
    };
  },
});
