import i18next from "i18next";
import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import en from "./navigation-i18n/en";
import fa from "./navigation-i18n/fa";
import { authRoles } from "../auth";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("fa", "navigation", fa);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
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
        auth: authRoles.admin,
      },
      {
        id: "apps.advertisement2",
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
        id: "apps.appliedJobs",
        title: "appliedJobs",
        translate: "appliedJobs",
        type: "item",
        icon: "material-outline:find_in_page",
        url: "/apps/appliedJobs",
        auth: authRoles.employer,
      },
      {
        id: "apps.appliedJobs2",
        title: "appliedJobs2",
        translate: "appliedJobs2",
        type: "item",
        icon: "material-outline:find_in_page",
        url: "/apps/appliedJobs",
        auth: authRoles.jobSeeker,
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
        id: "apps.changePassword",
        title: "changePassword",
        translate: "CHANGE_PASSWORD",
        type: "item",
        icon: "heroicons-outline:lock-closed",
        url: "/apps/changePassword",
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
        id: "apps.support",
        title: "support",
        translate: "support",
        type: "item",
        icon: "material-outline:help",
        url: "/apps/support",
        auth: authRoles.all,
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
