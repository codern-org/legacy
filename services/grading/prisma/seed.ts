import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const testcase = await prisma.testcase.upsert({
    where: { questionId: 1 },
    update: {},
    create: {
      questionId: 1,
      filePath: '/testcase/1',
    },
  });

  console.log({ testcase });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
