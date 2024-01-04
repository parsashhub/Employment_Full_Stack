const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.JobContract.createMany({
        data: [
            {title: "تمام وقت"},
            {title: "دور کاری"},
            {title: "ترکیبی"},
            {title: "پاره وقت"},
            {title: "پروژه ای"},
        ],
    });

    console.log("exercise categories created successfully");
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
