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
        companySize: 50,
        location: "tehran",
        jobDescription: "this is a description for job",
        companyDescription: "this is a description for company",
        minWorkExperience: 3,
        isShared: true,
        salary: 13000000,
        contractId: 1,
        categoryId: 4,
        userId: user.id,
      },
      {
        title: "استخدام کارشناس حسابداری",
        companyName: "داروپوش",
        companyWebsite: "https://Daroupoosh.com",
        companySize: 200,
        location: "تهران",
        companyDescription:
          "مجموعه شرکت تولیدی و صنعتی در حوزه تولید تیوب های دارویی و صنعتی و همچنین تولید پولک های آلومینیومی",
        minWorkExperience: 5,
        jobDescription: "حسابدار آشنا به حسابداری مالی و ترجیحا حسابداری صنعتی با حداقل 4 سال سابقه کاری \n" +
            "حسابداری انبار ، خزانه و فروش\n" +
            "ترجیحا آشنا به نرم افزار راهکاران\n" +
            "ساعات کاری شنبه تا چهارشنبه از ساعت 8:30 الی 17:45\n" +
            "پنج شنبه ها تعطیل\n" +
            "محدوده جمهوری ، خیابان سی تیر",
        isShared: true,
        salary: 25000000,
        contractId: 2,
        categoryId: 3,
        userId: user.id,
      },
      {
        title: "کارشناس",
        companyName: "داروپوش",
        companyWebsite: "https://Daroupoosh.com",
        companySize: 200,
        location: "تهران",
        companyDescription:
            "مجموعه شرکت تولیدی و صنعتی در حوزه تولید تیوب های دارویی و صنعتی و همچنین تولید پولک های آلومینیومی",
        minWorkExperience: 5,
        jobDescription: "حسابدار آشنا به حسابداری مالی و ترجیحا حسابداری صنعتی با حداقل 4 سال سابقه کاری \n" +
            "حسابداری انبار ، خزانه و فروش\n" +
            "ترجیحا آشنا به نرم افزار راهکاران\n" +
            "ساعات کاری شنبه تا چهارشنبه از ساعت 8:30 الی 17:45\n" +
            "پنج شنبه ها تعطیل\n" +
            "محدوده جمهوری ، خیابان سی تیر",
        isShared: true,
        salary: 25000000,
        contractId: 2,
        categoryId: 3,
        userId: user.id,
      },
      {
        title: "استخدام Full Stack ASP .Net Core Developer",
        companyName: "مدیریت و توسعه فناوری اطلاعات آرمان",
        companyWebsite: "https://www.armanitmd.com",
        companySize: 200,
        location: "تهران",
        companyDescription:
            "شرکت مدیریت و توسعه فناوری اطلاعات آرمان(سهامی خاص) در تاریخ ۱۳۸۷/۰۹/۱۱ با نام اولیه فناوری اطلاعات ژرف‌اندیشان امید به عنوان زیرمجموعه‌ای از گروه راهبران اقتصادی آرمان به ثبت رسید. هدف اصلی از تاسیس این شرکت، متمرکز ساختن خدمات مورد نیاز بانک توسعه صادرات ایران و شرکت‌های تابعه‌ی آن در حوزه‌ی فناوری اطلاعات در عهده‌ی یک سازماندهی واحد بوده است تا از این رهگذر، خدمات تولید، توسعه و پشتیبانی زیرساخت‌های نرم‌افزاری و سخت‌افزاری مجموعه وابسته به بانک پس از اجرای جامع و پیاده‌سازی یکپارچه، چالاک‌ تر و بهینه‌تر صورت پذیرد.\n" +
            "شرکت هم اینک از سوی شورای عالی انفورماتیک احراز صلاحیت شده و دارای رتبه 4 در سه حوزه مشاوره و نظارت بر اجرای طرح های انفورماتیک و فناوری اطلاعات و ارتباطات، خدمات پشتیبانی (سخت افزار و شبکه) و نیز تولید و پشتیبانی نرم افزارهای به سفارش مشتری است. هم چنین این شرکت افتخار عضویت در انجمن مشاوران مدیریت ایران و نظام صنفی رایانه ای کشور را دارد.",
        minWorkExperience: 3,
        jobDescription: "مهارت های Back-end مورد نیاز :\n" +
            "• تسلط بر زبان برنامه نویسی C#\n" +
            "• تسلط بر Asp .Net Core / WebApi\n" +
            "• تسلط بر RESTful APIs، معماری کلاینت / سرور و JSON\n" +
            "• تسلط بر SQL Server و طراحی Database\n" +
            "• آشنایی با Oracle\n" +
            "• تسلط بر Entity Framework\n" +
            "• تسلط بر مفاهیم برنامه نویسی شی گرا و Design Patterns\n" +
            "• آشنا به مفاهیم توسعه انواع تست ها مانند : Unit Test و ...\n" +
            "• تجربه و استفاده از Git\n" +
            "• تسلط نسبی بر Docker",
        isShared: true,
        salary: 52000000,
        contractId: 5,
        categoryId: 2,
        userId: user.id,
      },
      {
        title: "استخدام React.js) Next.js Senior Developer)",
        companyName: "فرابورس ایران",
        companyWebsite: "https://www.armanitmd.com",
        companySize: 50,
        location: "تهران",
        companyDescription: "شرکت پیشرو در بازار سرمایه با هدف ارائه خدمات مالی",
        minWorkExperience: 3,
        jobDescription: "مسئولیت ها:\n" +
            "\n" +
            "· برنامه های کاربردی وب را با استفاده از React.js و Next.js توسعه دهید\n" +
            "\n" +
            "· از TypeScript برای نوشتن کد ایمن و قابل نگهداری استفاده کنید\n" +
            "\n" +
            "· مدیریت وضعیت با Redux برای برنامه های پیچیده\n" +
            "\n" +
            "· همکاری نزدیک با تیم های طراحی و محصول برای ایجاد تجربیات کاربر یکپارچه\n" +
            "\n" +
            "· پیاده سازی اصول طراحی پاسخگو و اطمینان از سازگاری بین مرورگرها\n" +
            "\n" +
            "· بهینه سازی برنامه ها برای حداکثر کارایی\n" +
            "\n" +
            "· از Storybook برای مستندسازی اجزا و آزمایش استفاده کنید\n" +
            "\n" +
            "· عیب یابی و اشکال زدایی مسائل به عنوان آنها بوجود می آیند",
        isShared: true,
        salary: 30000000,
        contractId: 3,
        categoryId: 2,
        userId: user.id,
      },
    ],
  });

  console.log("advertisements created successfully");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
