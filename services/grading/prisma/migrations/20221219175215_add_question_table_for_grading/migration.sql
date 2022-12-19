-- CreateTable
CREATE TABLE `Question` (
    `questionId` INTEGER NOT NULL,
    `memoryLimit` INTEGER NOT NULL,
    `timeLimit` INTEGER NOT NULL,

    PRIMARY KEY (`questionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
