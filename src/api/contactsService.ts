import api from "./index";
import type {
  Transaction,
  EnergyAccount,
  Receiver,
  Register,
  Login,
  User,
} from "@/types";

export const contactsService = {
  addContacts(emails: String[]) {
    return api.post("/api/contacts/addContact", emails);
  },
  deleteContacts(emails: String[]) {
    return api.post("/api/contacts/deleteContact", emails);
  },
  getAllContacts() {
    return api.get("/api/contacts/getAllContacts");
  },
};
