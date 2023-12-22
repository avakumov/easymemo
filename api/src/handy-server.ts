import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function start() {
  const questions = await prisma.question.findMany({
    select: {
      id: true,
    },
  });

  // if (Array.isArray(questions)) {
  //   questions.forEach(async (q) => {
  //     await prisma.question.update({
  //       where: {
  //         id: q.id,
  //       },
  //       data: {
  //         correctAnswers: { set: [q.answer] },
  //       },
  //     });
  //   });
  // }

  console.log(JSON.stringify(questions));
}

start();
