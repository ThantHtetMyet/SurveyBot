-- Create UserComment Table
-- Script Name: 01_CreateUserCommentTable.sql

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserComment]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[UserComment] (
        [ID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
        [UserName] NVARCHAR(200) NOT NULL,
        [Email] NVARCHAR(200) NULL,
        [UsageWithoutAttachment] NVARCHAR(MAX) NULL,
        [UsageWithAttachment] NVARCHAR(MAX) NULL,
        [Department] NVARCHAR(500) NULL,
        [Section] NVARCHAR(500) NULL,
        [Remark] NVARCHAR(200) NULL,
        [IsDeleted] BIT NOT NULL DEFAULT 0,
        [CreatedDate] DATETIME NOT NULL,
        [UpdatedDate] DATETIME NULL
    );

    -- Create index on IsDeleted for better query performance
    CREATE INDEX IX_UserComment_IsDeleted ON [dbo].[UserComment]([IsDeleted]);
    
    -- Create index on CreatedDate for sorting
    CREATE INDEX IX_UserComment_CreatedDate ON [dbo].[UserComment]([CreatedDate] DESC);

    PRINT 'UserComment table created successfully.';
END
ELSE
BEGIN
    PRINT 'UserComment table already exists.';
END
GO

