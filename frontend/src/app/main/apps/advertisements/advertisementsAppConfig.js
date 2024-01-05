import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { authRoles } from "../../../auth";

const AdvertisementDetail = lazy(
  () => import("./advertisementDetail/advertisementDetailApp"),
);
const AdvertisementListApp = lazy(
  () => import("./advertisementList/advertisementListApp"),
);

const advertisementsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/apps/advertisements/:id",
      element: <AdvertisementDetail />,
    },
    {
      path: "/apps/advertisements",
      element: <AdvertisementListApp />,
    },
    // {
    //   path: "/apps/advertisements",
    //   element: <Navigate to="" />,
    // },
  ],
};

export default advertisementsAppConfig;
