import { lazy } from "react";

const RulesApp = lazy(() => import("./rulesApp.js"));

const rulesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/rules",
      element: <RulesApp />,
    },
  ],
};

export default rulesAppConfig;
