/*
  Warnings:

  - You are about to drop the column `freelancerId` on the `Language` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Language` DROP FOREIGN KEY `Language_freelancerId_fkey`;

-- AlterTable
ALTER TABLE `Language` DROP COLUMN `freelancerId`;

-- CreateTable
CREATE TABLE `_FreelancerToLanguage` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FreelancerToLanguage_AB_unique`(`A`, `B`),
    INDEX `_FreelancerToLanguage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FreelancerToLanguage` ADD CONSTRAINT `_FreelancerToLanguage_A_fkey` FOREIGN KEY (`A`) REFERENCES `Freelancer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FreelancerToLanguage` ADD CONSTRAINT `_FreelancerToLanguage_B_fkey` FOREIGN KEY (`B`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
