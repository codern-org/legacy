-- CreateTable
CREATE TABLE `Testcase` (
    `questionId` INTEGER NOT NULL,
    `filePath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`questionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Submission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `language` ENUM('C', 'CPP') NOT NULL,
    `status` ENUM('UPLOADING', 'GRADING', 'COMPLETED') NOT NULL,
    `result` VARCHAR(191) NULL,
    `filePath` VARCHAR(191) NOT NULL,
    `uploadedAt` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Editor` (
    `userId` VARCHAR(191) NOT NULL,
    `questionId` INTEGER NOT NULL,
    `language` ENUM('C', 'CPP') NOT NULL,
    `codePath` VARCHAR(191) NOT NULL,
    `savedAt` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`userId`, `questionId`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
