const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.JobCategory.createMany({
        data: [
            {title: "فروش و بازاریابی"},
            {title: "وب، برنامه نویسی و نرم افزار"},
            {title: "مالی و حسابداری"},
            {title: "دیجیتال مارکتینگ"},
            {title: "تولید و مدیریت محتوا"},
            {title: "پشتیبانی"},
            {title: "مهندسی صنایع و مدیریت صنعتی"},
            {title: "منابع انسانی"},
            {title: "سینما و تصویر"},
            {title: "تکنسین فنی"},
            {title: "انبار داری"},
            {title: "حمل و نقل"},
            {title: "کارشناس حقوقی، وکالت"},
            {title: "صنایع غذایی"},
            {title: "هتلداری"},
            {title: "مهندسی شیمی"},
            {title: "مهندسی پزشکی"},
            {title: "مهندسی پلیمر"},
            {title: "مهندسی کشاورزی"},
            {title: "تربیت بدنی"},
            {title: "مهندسی معدن و متالوزی"},
        ],
    });

    console.log("job categories created successfully");
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
