import { lazy } from "react";
import authRoles from "../../../auth/authRoles";

const AdvertisementListApp = lazy(
  () => import("./advertisementListApp"),
);

const advertisementsPublicConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/advertisements",
      element: <AdvertisementListApp />,
    },
  ],
};

export default advertisementsPublicConfig;
