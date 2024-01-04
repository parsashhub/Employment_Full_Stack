import { lazy } from "react";

const ChangePasswordApp = lazy(() => import("./changePasswordApp.js"));

const ChangePasswordConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/changePassword",
      element: <ChangePasswordApp />,
    },
  ],
};

export default ChangePasswordConfig;
