-- Alter UserComment Table - Remove Limits for Usage Columns
-- Script Name: 02_AlterUserCommentTable_RemoveUsageLimits.sql

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserComment]') AND type in (N'U'))
BEGIN
    -- Alter UsageWithoutAttachment column to NVARCHAR(MAX)
    IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[UserComment]') AND name = 'UsageWithoutAttachment')
    BEGIN
        ALTER TABLE [dbo].[UserComment]
        ALTER COLUMN [UsageWithoutAttachment] NVARCHAR(MAX) NULL;
        
        PRINT 'UsageWithoutAttachment column altered to NVARCHAR(MAX) successfully.';
    END

    -- Alter UsageWithAttachment column to NVARCHAR(MAX)
    IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[UserComment]') AND name = 'UsageWithAttachment')
    BEGIN
        ALTER TABLE [dbo].[UserComment]
        ALTER COLUMN [UsageWithAttachment] NVARCHAR(MAX) NULL;
        
        PRINT 'UsageWithAttachment column altered to NVARCHAR(MAX) successfully.';
    END
END
ELSE
BEGIN
    PRINT 'UserComment table does not exist.';
END
GO

