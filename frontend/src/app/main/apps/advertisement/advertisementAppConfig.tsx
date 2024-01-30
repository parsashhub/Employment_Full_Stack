import { lazy } from "react";

const Advertisement = lazy(() => import("./advertisementApp"));

const advertisementAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/advertisement",
      element: <Advertisement />,
    },
  ],
};

export default advertisementAppConfig;
