import { lazy } from "react";
import authRoles from "../../../auth/authRoles";


const AdvertisementDetail = lazy(
  () => import("./advertisementDetail/advertisementDetailApp"),
);
const AdvertisementListApp = lazy(
  () => import("./advertisementList/advertisementListApp"),
);

const advertisementsAppConfig = {
  settings: {
    layout: {
      // config: {
      //   navbar: {
      //     display: false
      //   },
      //   toolbar: {
      //     display: false
      //   },
      //   footer: {
      //     display: false
      //   },
      //   leftSidePanel: {
      //     display: false
      //   },
      //   rightSidePanel: {
      //     display: false
      //   }
      // }
    }
  },
  // auth: authRoles.onlyGuest,
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
