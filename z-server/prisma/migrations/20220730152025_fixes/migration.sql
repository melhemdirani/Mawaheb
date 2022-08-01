-- AlterTable
ALTER TABLE `Experience` MODIFY `startDate` VARCHAR(191) NOT NULL,
    MODIFY `endDate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Freelancer` MODIFY `expirationDate` VARCHAR(191) NULL;

