const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { role: "EMPLOYER" } });
  await prisma.Advertisement.createMany({
    data: [
      {
        title: "this is a title",
        companyName: "companyName",
        companyWebsite: "website.com",
        companyLogo: "this is a base64 picture", //base64
        companySize: 10,
        location: "tehran",
        jobDescription: "this is a description for job",
        companyDescription: "this is a description for company",
        minWorkExperience: 2,
        isShared: true,
        salary: 30000000,
        contractId: 1,
        categoryId: 1,
        userId: user.id,
      },
      {
        title: "this is a title2",
        companyName: "companyName",
        companyWebsite: "website.com",
        companyLogo: "this is a base64 picture", //base64
        companySize: 50,
        location: "tehran",
        jobDescription: "this is a description for job",
        companyDescription: "this is a description for company",
        minWorkExperience: 3,
        isShared: true,
        salary: 25000000,
        contractId: 2,
        categoryId: 4,
        userId: user.id,
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
