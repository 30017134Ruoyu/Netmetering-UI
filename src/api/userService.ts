import api from "./index";
import type {
  Transaction,
  EnergyAccount,
  Receiver,
  Register,
  Login,
} from "@/types";

export const userService = {
  getUserInfo() {
    return api.get("/api/user/info");
  },
};
