// src/api/authService.ts
import api from "./index";
import type {
  Transaction,
  EnergyAccount,
  Receiver,
  Register,
  Login,
} from "@/types";

export const authService = {
  register(user: Register) {
    return api.post("/auth/register", user);
  },
  login(login: Login) {
    return api.post("/auth/login", login);
  },
  logout() {
    return api.get("/api/logout");
  },
};
