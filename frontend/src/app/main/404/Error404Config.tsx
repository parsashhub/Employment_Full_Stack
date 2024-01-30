import { FuseRouteConfigType } from "@fuse/utils/FuseUtils";
import Error404Page from "./Error404Page";

const Error404Config: FuseRouteConfigType = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "404",
      element: <Error404Page />,
    },
  ],
};

export default Error404Config;
