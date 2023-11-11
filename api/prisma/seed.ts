import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(readFileSync("./prisma/questions.json", "utf8"));
  const questions = data.map((q) => ({
    question: q.question,
    answer: q.answer,
  }));
  const user = await prisma.user.upsert({
    where: { email: "avakdev@gmail.com" },
    update: {
      questions: {
        create: questions,
      },
    },
    create: {
      name: "Avakumov Vladimir",
      email: "avakdev@gmail.com",
      password: "1",
    },
  });
  console.log({ user });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
