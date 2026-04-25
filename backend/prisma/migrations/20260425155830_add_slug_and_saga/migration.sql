/*
  Warnings:

  - You are about to drop the column `orderInUniverse` on the `Comic` table. All the data in the column will be lost.
  - You are about to drop the column `universeId` on the `Comic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Comic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Universe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderInSaga` to the `Comic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sagaId` to the `Comic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Comic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Universe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comic" DROP CONSTRAINT "Comic_universeId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comic" DROP COLUMN "orderInUniverse",
DROP COLUMN "universeId",
ADD COLUMN     "orderInSaga" INTEGER NOT NULL,
ADD COLUMN     "sagaId" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Universe" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Saga" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "universeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saga_slug_key" ON "Saga"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Character_slug_key" ON "Character"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Comic_slug_key" ON "Comic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Universe_slug_key" ON "Universe"("slug");

-- AddForeignKey
ALTER TABLE "Saga" ADD CONSTRAINT "Saga_universeId_fkey" FOREIGN KEY ("universeId") REFERENCES "Universe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_sagaId_fkey" FOREIGN KEY ("sagaId") REFERENCES "Saga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
