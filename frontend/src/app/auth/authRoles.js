/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["ADMIN"],
  employer: ["ADMIN", "EMPLOYER"],
  jobSeeker: ["ADMIN", "JOBSEEKER"],
  all: ["ADMIN", "EMPLOYER", "JOBSEEKER"],
  onlyGuest: [],
};

export default authRoles;
