/*
  Warnings:

  - Made the column `expirationDate` on table `freelancer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emiratesIdFrontSide` on table `freelancer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emiratesIdBackSide` on table `freelancer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `freelancer` ADD COLUMN `emiratesId` INTEGER NULL,
    MODIFY `expirationDate` VARCHAR(191) NOT NULL,
    MODIFY `emiratesIdFrontSide` VARCHAR(191) NOT NULL,
    MODIFY `emiratesIdBackSide` VARCHAR(191) NOT NULL;
