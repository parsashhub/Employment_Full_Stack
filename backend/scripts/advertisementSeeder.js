const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../config/utils");
const prisma = new PrismaClient();

async function main() {
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
