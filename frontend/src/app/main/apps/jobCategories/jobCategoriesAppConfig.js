import { lazy } from "react";

const JobCategories = lazy(() => import("./jobCategoriesApp"));

const jobCategoriesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/jobCategories",
      element: <JobCategories />,
    },
  ],
};

export default jobCategoriesAppConfig;
