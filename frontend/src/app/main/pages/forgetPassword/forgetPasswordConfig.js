import { lazy } from "react";
import authRoles from "../../../auth/authRoles";

const ForgotPasswordPage = lazy(() => import("./forgotPasswordPage"));

const forgetPasswordConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
  ],
};

export default forgetPasswordConfig;
