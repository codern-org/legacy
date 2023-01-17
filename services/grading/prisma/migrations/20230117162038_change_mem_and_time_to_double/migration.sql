/*
  Warnings:

  - You are about to alter the column `memoryLimit` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `timeLimit` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `memoryUsage` on the `Result` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `timeUsage` on the `Result` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `memoryLimit` DOUBLE NOT NULL,
    MODIFY `timeLimit` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Result` MODIFY `memoryUsage` DOUBLE NULL,
    MODIFY `timeUsage` DOUBLE NULL;
