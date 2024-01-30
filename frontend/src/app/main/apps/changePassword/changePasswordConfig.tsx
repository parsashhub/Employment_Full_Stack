import { lazy } from "react";

const ChangePasswordApp = lazy(() => import("./changePasswordApp"));

const ChangePasswordConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "apps/changePassword",
      element: <ChangePasswordApp />
    }
  ],
};

export default ChangePasswordConfig;
