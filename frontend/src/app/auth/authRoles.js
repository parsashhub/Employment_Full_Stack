/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["ADMIN"],
  employer: ["ADMIN", "EMPLOYER"],
  jobSeeker: ["ADMIN", "JOBSEEKER"],
  onlyGuest: [],
};

export default authRoles;
