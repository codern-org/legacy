/*
  Warnings:

  - You are about to alter the column `memoryLimit` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `timeLimit` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `memoryLimit` DOUBLE NOT NULL,
    MODIFY `timeLimit` DOUBLE NOT NULL;
