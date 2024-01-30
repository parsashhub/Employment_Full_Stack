/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
  admin: ["ADMIN"],
  employer: ["EMPLOYER"],
  jobSeeker: ["JOBSEEKER"],
  all: ["ADMIN", "EMPLOYER", "JOBSEEKER"],
  onlyGuest: [],
};

export default authRoles;
