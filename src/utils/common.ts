import type { Router } from "vue-router";
import type { User } from "@/types";
import { ref } from "vue";

export const handleUnlogin = (user: User | null, router: Router) => {
  const ifLogin = localStorage.getItem("ifLogin");
  console.log("Check if logined, if not, redirect to login page");

  /*
   If user haven't login, redirect them to the login page
   user == null is used to check if the broswer is being closed
   if it is, then need to log in again
   */
  if (user == null || !ifLogin || ifLogin == "false") {
    localStorage.setItem("ifLogin", "false");
    console.log("🔥 ifLogin:", ifLogin);
    router.push("/login");
  }
};

// Fetch loadGlobalAcc
export const loadGlobalAccounts = async () => {
  try {
    const globalAccounts = ref<Array<{ email: string; full_name?: string }>>(
      []
    );
    const response = await fetch(
      "http://localhost:8080/api/user/globalAccounts",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load global accounts");
    }

    const accounts = await response.json();
    globalAccounts.value = accounts;

    globalAccounts.value.forEach((account) => {
      if (account.full_name === "Rachael Wilson") {
        account.full_name = "Food Bank";
      } else if (account.full_name === "Weston Galen") {
        account.full_name = "Lablows";
      }
    });
    console.log(globalAccounts.value);
    return globalAccounts.value;
  } catch (error) {
    console.error("Failed to load global accounts:", error);
  }
};
