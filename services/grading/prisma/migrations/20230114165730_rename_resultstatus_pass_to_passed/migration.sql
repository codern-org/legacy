/*
  Warnings:

  - The values [PASS] on the enum `Result_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Result` MODIFY `status` ENUM('GRADING', 'PASSED', 'FAILED_COMPILATION', 'FAILED_MISSING_RESULT', 'TIMEOUT_EXECUTION', 'TIMEOUT_CONTAINER', 'REQUEUE_LIMIT_EXCEEDED') NOT NULL;
