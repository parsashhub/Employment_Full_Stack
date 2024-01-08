import HelpCenterSupport from "./support/HelpCenterSupport";

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
