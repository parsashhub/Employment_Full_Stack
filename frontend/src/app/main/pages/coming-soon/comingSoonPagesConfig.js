import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ClassicComingSoonPage = lazy(() => import("./ClassicComingSoonPage"));
const ModernComingSoonPage = lazy(() => import("./ModernComingSoonPage"));

const comingSoonPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "pages/coming-soon",
      children: [
        {
          path: "",
          element: <Navigate to="classic" />,
        },
        {
          path: "classic",
          element: <ClassicComingSoonPage />,
        },
        {
          path: "modern",
          element: <ModernComingSoonPage />,
        },
      ],
    },
  ],
};

export default comingSoonPagesConfig;
