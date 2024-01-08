import ModernPricingPage from "./modern/ModernPricingPage";

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
