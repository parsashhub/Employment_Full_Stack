import HelpCenterSupport from "./support/HelpCenterSupport.js";

const HelpCenterAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/support",
      element: <HelpCenterSupport />,
    },
  ],
};

export default HelpCenterAppConfig;
