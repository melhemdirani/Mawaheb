-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('tester', 'admin', 'freelancer', 'client') NOT NULL;
