import { PrismaClient } from "@prisma/client";
import settings from "../settings";

const prisma = new PrismaClient();

async function start() {
  const questions = await prisma.question.findMany({
    // select: {
    //   id: true,
    // },
  });

  if (Array.isArray(questions)) {
    questions.forEach(async (q) => {
      await prisma.question.update({
        where: {
          id: q.id,
        },
        data: {
          rightAnswers: {
            set: q.correctAnswers.join(settings.separatorInDBString),
          },
        },
      });
    });
  }

  console.log(JSON.stringify(questions));
}

start();
