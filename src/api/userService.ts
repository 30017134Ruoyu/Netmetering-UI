import api from "./index";
import type {
  Transaction,
  EnergyAccount,
  Receiver,
  Register,
  Login,
  User,
} from "@/types";

export const userService = {
  getUserInfo() {
    return api.get("/api/user/info");
  },

  getTransactionById(user: User) {
    return api.post("/api/user/transaction", user);
  },

  deposit(amount: string) {
    return api.post("/api/user/deposit", amount);
  },
};
