/*
  Warnings:

  - You are about to drop the column `estimatedTime` on the `CareerTrack` table. All the data in the column will be lost.
  - Added the required column `duration` to the `CareerTrack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outcome` to the `CareerTrack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CareerTrack" DROP COLUMN "estimatedTime",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "outcome" TEXT NOT NULL;
