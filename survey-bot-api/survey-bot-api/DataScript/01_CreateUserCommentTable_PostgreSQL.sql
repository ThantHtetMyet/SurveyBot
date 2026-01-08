-- Create UserComment Table for PostgreSQL (Supabase)
-- Script Name: 01_CreateUserCommentTable_PostgreSQL.sql

-- Drop table if exists (for development/testing)
-- DROP TABLE IF EXISTS "UserComment" CASCADE;

-- Create UserComment Table
CREATE TABLE IF NOT EXISTS "UserComment" (
    "ID" UUID NOT NULL PRIMARY KEY,
    "UserName" VARCHAR(200) NOT NULL,
    "Email" VARCHAR(200) NULL,
    "UsageWithoutAttachment" TEXT NULL,
    "UsageWithAttachment" TEXT NULL,
    "Department" VARCHAR(500) NULL,
    "Section" VARCHAR(500) NULL,
    "Remark" VARCHAR(200) NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "CreatedDate" TIMESTAMP NOT NULL,
    "UpdatedDate" TIMESTAMP NULL
);

-- Create index on IsDeleted for better query performance
CREATE INDEX IF NOT EXISTS "IX_UserComment_IsDeleted" ON "UserComment"("IsDeleted");

-- Create index on CreatedDate for sorting
CREATE INDEX IF NOT EXISTS "IX_UserComment_CreatedDate" ON "UserComment"("CreatedDate" DESC);

-- Add comment to table
COMMENT ON TABLE "UserComment" IS 'Stores user survey comments and feedback';

