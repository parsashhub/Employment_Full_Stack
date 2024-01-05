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
        auth: authRoles.employer,
      },
      {
        id: "apps.plans",
        title: "plans",
        translate: "plans",
        type: "item",
        icon: "material-outline:account_balance_wallet",
        url: "/apps/plans",
        auth: authRoles.employer,
      },
      {
        id: "apps.users",
        title: "users",
        translate: "users",
        type: "item",
        icon: "material-outline:assignment",
        url: "/apps/users",
        auth: authRoles.admin,
        badge: {
          title: "به زودی",
          classes: "px-8 bg-teal-400 text-black rounded",
        },
        disabled: true,
      },
      {
        id: "apps.jobCategories",
        title: "jobCategories",
        translate: "jobCategories",
        type: "item",
        icon: "material-outline:assignment",
        url: "/apps/jobCategories",
        auth: authRoles.admin,
        badge: {
          title: "به زودی",
          classes: "px-8 bg-teal-400 text-black rounded",
        },
        disabled: true,
      },
      {
        id: "apps.advertisements",
        title: "advertisementList",
        translate: "advertisementList",
        type: "item",
        icon: "material-outline:list",
        url: "/apps/advertisements",
        auth: authRoles.all,
      },
      {
        id: "apps.profile",
        title: "Profile",
        translate: "PROFILE",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/apps/profile",
        auth: authRoles.all,
      },
      {
        id: "apps.rules",
        title: "rules",
        translate: "rules",
        type: "item",
        icon: "material-outline:rule",
        url: "/apps/rules",
        auth: authRoles.all,
      },
      {
        id: "apps.changePassword",
        title: "changePassword",
        translate: "CHANGE_PASSWORD",
        type: "item",
        icon: "heroicons-outline:lock-closed",
        url: "/apps/changePassword",
        auth: authRoles.all,
      },
      {
        id: "apps.advertisements",
        title: "advertisementList",
        translate: "advertisementList",
        type: "item",
        icon: "material-outline:list",
        url: "/apps/advertisementList",
        auth: authRoles.onlyGuest,
      },
      {
        id: "apps.signIn",
        title: "signIn",
        translate: "signIn",
        type: "item",
        icon: "material-outline:login",
        url: "/sign-in",
        auth: authRoles.onlyGuest,
      },
    ],
  },
];

export default navigationConfig;
