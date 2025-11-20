-- AlterTable
ALTER TABLE "company_info" ADD COLUMN     "commitments" TEXT,
ADD COLUMN     "core_values" TEXT,
ADD COLUMN     "goals" TEXT,
ADD COLUMN     "introduction" TEXT,
ADD COLUMN     "strengths" TEXT;

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "port" TEXT,
    "type" TEXT NOT NULL DEFAULT 'SHIPPING',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commodities" (
    "id" TEXT NOT NULL,
    "name_vi" TEXT NOT NULL,
    "name_en" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commodities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partners_visible_sort_order_idx" ON "partners"("visible", "sort_order");

-- CreateIndex
CREATE INDEX "commodities_visible_sort_order_idx" ON "commodities"("visible", "sort_order");
