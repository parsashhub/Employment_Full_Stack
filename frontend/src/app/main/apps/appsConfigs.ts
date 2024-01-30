import { FuseRouteConfigsType } from "@fuse/utils/FuseUtils";
import changePasswordConfig from "./changePassword/changePasswordConfig";
import profileAppConfig from "./profile/profileAppConfig";
import rulesAppConfig from "./rules/rulesAppConfig";
import helpCenterAppConfig from "./helpCenter/HelpCenterAppConfig";
import pricingPagesConfig from "./pricing/pricingPagesConfig";
import advertisementsAppConfig from "./advertisements/advertisementsAppConfig";
import jobCategoriesAppConfig from "./jobCategories/jobCategoriesAppConfig";
import advertisementAppConfig from "./advertisement/advertisementAppConfig";
import appliedJobsAppConfig from "./appliedJobs/appliedJobsAppConfig";

const appsConfigs: FuseRouteConfigsType = [
  changePasswordConfig,
  profileAppConfig,
  rulesAppConfig,
  helpCenterAppConfig,
  pricingPagesConfig,
  advertisementsAppConfig,
  jobCategoriesAppConfig,
  advertisementAppConfig,
  appliedJobsAppConfig,
];

export default appsConfigs;
