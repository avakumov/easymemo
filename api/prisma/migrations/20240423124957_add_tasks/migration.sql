-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "duration" INTEGER NOT NULL,
    "actualDuration" INTEGER NOT NULL,
    "complexity" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegularTask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "complexity" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RegularTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MicroTask" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "duration" INTEGER NOT NULL,
    "actualDuration" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MicroTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularTask" ADD CONSTRAINT "RegularTask_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MicroTask" ADD CONSTRAINT "MicroTask_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "RegularTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
