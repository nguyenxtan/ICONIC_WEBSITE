-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');

-- AlterTable: Add new columns first
ALTER TABLE "users" ADD COLUMN "name" TEXT;
ALTER TABLE "users" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "users" ADD COLUMN "last_login_at" TIMESTAMP(3);

-- AlterTable: Rename old role column and create new one
ALTER TABLE "users" RENAME COLUMN "role" TO "role_old";
ALTER TABLE "users" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- Data migration: Convert old string roles to enum
UPDATE "users" SET "role" = 'SUPER_ADMIN' WHERE "role_old" = 'SUPER_ADMIN';
UPDATE "users" SET "role" = 'ADMIN' WHERE "role_old" = 'ADMIN' OR "role_old" NOT IN ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');
UPDATE "users" SET "role" = 'EDITOR' WHERE "role_old" = 'EDITOR';
UPDATE "users" SET "role" = 'VIEWER' WHERE "role_old" = 'VIEWER';

-- Drop old role column
ALTER TABLE "users" DROP COLUMN "role_old";
