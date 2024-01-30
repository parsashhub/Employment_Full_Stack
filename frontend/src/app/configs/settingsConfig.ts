import themesConfig from "app/configs/themesConfig";
import { FuseSettingsConfigType } from "@fuse/core/FuseSettings/FuseSettings";

import i18n from "../../i18n";

const settingsConfig: FuseSettingsConfigType = {
  layout: {
    style: "layout1", // layout1
    config: {}, // checkout default layout configs at app/theme-layouts for example  app/theme-layouts/layout1/Layout1Config.js
  },
  customScrollbars: false,
  direction: i18n.dir(i18n.options.lng) || "ltr", // rtl, ltr
  theme: {
    main: themesConfig.default,
    navbar: themesConfig.defaultDark,
    toolbar: themesConfig.default,
    footer: themesConfig.defaultDark,
  },

  /**
   * The defaultAuth property defines the default authorization roles for the application.
   * To make the whole app auth protected by default set defaultAuth:['admin','staff','user']
   * To make the whole app accessible without authorization by default set defaultAuth: null
   * The individual route configs which have auth option won't be overridden.
   */
  defaultAuth: ["ADMIN", "EMPLOYER", "JOBSEEKER"],
  loginRedirectUrl: "/apps/advertisements",
};

export default settingsConfig;
