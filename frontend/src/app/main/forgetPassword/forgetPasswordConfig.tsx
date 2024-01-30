import authRoles from "../../auth/authRoles";
import ForgotPasswordPage from "./forgotPasswordPage";

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
