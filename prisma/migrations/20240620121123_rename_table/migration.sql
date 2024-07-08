/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `billBoard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "billBoard" DROP CONSTRAINT "billBoard_storeId_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_billboardId_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "color" DROP CONSTRAINT "color_storeId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_storeId_fkey";

-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_colorId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "size" DROP CONSTRAINT "size_storeId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plaidId" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Store";

-- DropTable
DROP TABLE "billBoard";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "color";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "orderItem";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "size";

-- DropEnum
DROP TYPE "sizevalue";

-- CreateTable
CREATE TABLE "AuthAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "AuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_provider_providerAccountId_key" ON "AuthAccount"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "AuthAccount" ADD CONSTRAINT "AuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
