import authRoles from "../auth/authRoles";
import i18next from "i18next";
import fa from "./navigation-i18n/fa";
import en from "./navigation-i18n/en";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("fa", "navigation", fa);

const navigationConfig = [
  {
    id: "divider-0",
    type: "divider",
  },
  {
    id: "apps",
    title: "",
    subtitle: "",
    type: "group",
    icon: "heroicons-outline:cube",
    translate: "APPLICATIONS",
    children: [
      {
        id: "apps.advertisement",
        title: "Advertisement",
        translate: "Advertisement",
        type: "item",
        icon: "material-outline:assignment",
        url: "/apps/advertisement",
      },
      {
        id: "apps.workoutArchive",
        title: "Advertisement",
        translate: "Advertisement",
        type: "item",
        icon: "material-outline:bookmark",
        url: "/apps/programs",
        badge: {
          title: "به زودی",
          classes: "px-8 bg-teal-400 text-black rounded",
        },
        disabled: true,
      },
      {
        id: "apps.profile",
        title: "Profile",
        translate: "PROFILE",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/apps/profile",
      },
      {
        id: "apps.changePassword",
        title: "changePassword",
        translate: "CHANGE_PASSWORD",
        type: "item",
        icon: "heroicons-outline:lock-closed",
        url: "/apps/changePassword",
      },
    ],
  },
];

export default navigationConfig;
