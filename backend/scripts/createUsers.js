const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../config/utils");
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hashPassword("123456");
  await prisma.user.createMany({
    data: [
      {
        firstname: "admin",
        lastname: "admin",
        email: "admin@gmail.com",
        role: "ADMIN",
        password: passwordHash,
      },
      {
        firstname: "employer",
        lastname: "employer",
        email: "employer@gmail.com",
        role: "EMPLOYER",
        password: passwordHash,
      },
      {
        firstname: "Job",
        lastname: "seeker",
        email: "jobSeeker@gmail.com",
        role: "JOBSEEKER",
        password: passwordHash,
      },
    ],
  });

  console.log("users created successfully");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
