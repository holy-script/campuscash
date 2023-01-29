/*
  Warnings:

  - Added the required column `creator` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "creator" STRING NOT NULL;
