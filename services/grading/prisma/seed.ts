import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const question = await prisma.question.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      workspaceId: 1,
      score: 100,
      memoryLimit: 1000,
      timeLimit: 2000,
    },
  });

  console.log({ question });

  const firstTestcase = await prisma.testcase.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      questionId: 1,
      filePath: '/testcase/1/1',
    },
  });

  console.log({ firstTestcase });

  const secondTestcase = await prisma.testcase.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      questionId: 1,
      filePath: '/testcase/1/2',
    },
  });

  console.log({ secondTestcase });
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
