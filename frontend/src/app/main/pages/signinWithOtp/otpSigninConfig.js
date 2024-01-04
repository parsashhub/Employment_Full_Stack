import { lazy } from "react";
import authRoles from "../../../auth/authRoles";

const OtpSigninPage = lazy(() => import("./otpSigninPage"));

const otpSigninConfig = {
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
      path: "/otpSignin",
      element: <OtpSigninPage />,
    },
  ],
};
export default otpSigninConfig;
