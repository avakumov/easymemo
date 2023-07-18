import { PrismaClient } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "avakdev@gmail.com" },
    update: {},
    create: {
      name: "Vladimir Avakumov",
      email: "avakdev@gmail.com",
      password: "1",
      questions: {
        create: [
          {
            question: "Delete character under the cursor",
            answer: "x",
            categories: {
              create: [{ name: "nvim" }],
            },
          },
          {
            question: "Run prev command with sudo",
            answer: "sudo !!",
            categories: {
              create: [{ name: "linux" }],
            },
          },
          {
            question: "foo -> foofoofoo",
            answer: "'foo'.repeat(3)",
            categories: {
              create: [{ name: "js" }],
            },
          },
        ],
      },
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
