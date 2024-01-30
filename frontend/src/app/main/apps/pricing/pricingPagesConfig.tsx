import ModernPricingPage from "./modern/ModernPricingPage.js";

const pricingPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/apps/plans",
      element: <ModernPricingPage />,
    },
  ],
};

export default pricingPagesConfig;
