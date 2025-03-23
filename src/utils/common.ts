import type { Router } from "vue-router";
import type { User } from "@/types";

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
