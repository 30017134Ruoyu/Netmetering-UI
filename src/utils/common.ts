import type { Router } from "vue-router";
import type { User } from "@/types";
import { userService } from "@/api/userService";
import { ref } from "vue";

export const handleUnlogin = async (user: User | null, router: Router) => {
  console.log("Check if logined via /api/user/info");

  try {
    // CHeck if user logged in
    const response = await userService.getUserInfo();

    if (!response || !response.data) {
      throw new Error("No user info returned");
    }

    localStorage.setItem("ifLogin", "true");
  } catch (error) {
    console.log("User not logged in or session expired");
    localStorage.setItem("ifLogin", "false");
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
