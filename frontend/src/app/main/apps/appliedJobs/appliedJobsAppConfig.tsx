import { lazy } from "react";

const AppliedJobs = lazy(() => import("./appliedJobs"));

const appliedJobsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/appliedJobs",
      element: <AppliedJobs />,
    },
  ],
};

export default appliedJobsAppConfig;
