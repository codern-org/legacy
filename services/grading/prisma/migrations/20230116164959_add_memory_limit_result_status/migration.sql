/*
  Warnings:

  - The values [FAILED_MISSING_RESULT,FAILED_MISSING_TEST] on the enum `Result_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Result` MODIFY `status` ENUM('GRADING', 'PASSED', 'FAILED_RESULT', 'FAILED_MEMORY_LIMIT', 'FAILED_COMPILATION', 'FAILED_CONTAINER', 'MISSING_RESULT', 'MISSING_TEST', 'TIMEOUT_EXECUTION', 'TIMEOUT_CONTAINER', 'REQUEUE_LIMIT_EXCEEDED') NOT NULL;
