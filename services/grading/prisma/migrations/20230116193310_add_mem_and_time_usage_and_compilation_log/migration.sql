-- AlterTable
ALTER TABLE `Result` ADD COLUMN `compilationLog` VARCHAR(191) NULL,
    ADD COLUMN `memoryUsage` INTEGER NULL,
    ADD COLUMN `timeUsage` INTEGER NULL;
