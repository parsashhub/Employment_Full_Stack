import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import { FuseRouteConfigsType, FuseRoutesType } from "@fuse/utils/FuseUtils";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import AppsConfigs from "../main/apps/appsConfigs";
import forgetPasswordConfig from "../main/forgetPassword/forgetPasswordConfig";
import otpSigninConfig from "../main/signinWithOtp/otpSigninConfig";
import Error404Config from "../main/404/Error404Config";

const routeConfigs: FuseRouteConfigsType = [
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  forgetPasswordConfig,
  otpSigninConfig,
  Error404Config,
  ...AppsConfigs,
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth,
  ),
  {
    path: "/",
    element: <Navigate to="/apps/advertisements" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
