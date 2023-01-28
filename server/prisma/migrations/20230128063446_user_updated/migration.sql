/*
  Warnings:

  - Added the required column `otp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboarded" BOOL NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN     "otp" INT4 NOT NULL;
ALTER TABLE "User" ADD COLUMN     "password" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "verified" BOOL NOT NULL DEFAULT false;
