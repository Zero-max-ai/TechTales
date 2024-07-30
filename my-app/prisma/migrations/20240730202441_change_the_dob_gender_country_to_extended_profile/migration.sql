/*
  Warnings:

  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - Made the column `userId` on table `Blogs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_userId_fkey";

-- AlterTable
ALTER TABLE "Blogs" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ExtendedProfile" ADD COLUMN     "country" TEXT,
ADD COLUMN     "dob" TEXT,
ADD COLUMN     "gender" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "country",
DROP COLUMN "dob",
DROP COLUMN "gender";

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
