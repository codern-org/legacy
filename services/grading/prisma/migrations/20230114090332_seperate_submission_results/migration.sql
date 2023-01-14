/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Submission` table. All the data in the column will be lost.
  - The primary key for the `Testcase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Testcase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` DROP PRIMARY KEY,
    DROP COLUMN `questionId`,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `workspaceId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `result`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `Testcase` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `submissionId` INTEGER NOT NULL,
    `testcaseId` INTEGER NOT NULL,
    `status` ENUM('GRADING', 'PASS', 'FAILED_COMPILATION', 'FAILED_MISSING_RESULT', 'TIMEOUT_EXECUTION', 'TIMEOUT_CONTAINER', 'REQUEUE_LIMIT_EXCEEDED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Question_workspaceId_idx` ON `Question`(`workspaceId`);

-- CreateIndex
CREATE INDEX `Testcase_questionId_idx` ON `Testcase`(`questionId`);

-- AddForeignKey
ALTER TABLE `Testcase` ADD CONSTRAINT `Testcase_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_testcaseId_fkey` FOREIGN KEY (`testcaseId`) REFERENCES `Testcase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
