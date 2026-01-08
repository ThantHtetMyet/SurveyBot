# Supabase Database Setup Guide

## Overview
The API has been configured to use Supabase (PostgreSQL) as the database instead of SQL Server.

## Changes Made

### 1. Controller Updates (`UserCommentController.cs`)
- ✅ Changed from `SqlConnection` to `NpgsqlConnection`
- ✅ Updated all SQL queries to use PostgreSQL syntax:
  - Table and column names are now quoted (e.g., `"UserComment"`, `"ID"`)
  - Boolean values changed from `0/1` to `false/true`
  - All queries updated to be PostgreSQL compatible

### 2. Connection String (`appsettings.json`)
- ✅ Connection string configured: `SupabaseConnection`
- ⚠️ **Note**: If your password contains special characters (like `@`), you may need to URL-encode them in the connection string

### 3. Database Script
- ✅ Created PostgreSQL table creation script: `01_CreateUserCommentTable_PostgreSQL.sql`

## Setup Steps

### Step 1: Create the Database Table
Run the PostgreSQL script in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `DataScript/01_CreateUserCommentTable_PostgreSQL.sql`
4. Execute the script

### Step 2: Verify Connection String
Your connection string in `appsettings.json`:
```json
"SupabaseConnection": "postgres://postgres:Willowglen@12345@db.yyzwexlijvekoktqjdcg.supabase.co:6543/postgres"
```

**Important Notes:**
- If your password contains special characters, you may need to URL-encode them
- The port `6543` is typically used for connection pooling in Supabase
- For direct connections, you might need to use port `5432` instead

### Step 3: Test the Connection
1. Run the API project
2. Try to create a user comment via the API
3. Check the logs for any connection errors

## Troubleshooting

### Connection Issues
If you encounter connection errors:
1. Verify your Supabase database is running
2. Check if the password in the connection string is correct
3. Ensure your IP is whitelisted in Supabase (if required)
4. Try using port `5432` instead of `6543` for direct connections

### SQL Syntax Errors
- All table and column names are case-sensitive in PostgreSQL
- Make sure the table name matches exactly: `"UserComment"` (with quotes)
- Boolean values must be `true/false`, not `0/1`

### Package Dependencies
The `Npgsql` package (version 10.0.1) is already included in the project. If you need to restore packages:
```bash
dotnet restore
```

## Database Schema

The `UserComment` table structure:
- `ID` (UUID) - Primary Key
- `UserName` (VARCHAR(200)) - Required
- `Email` (VARCHAR(200)) - Optional
- `UsageWithoutAttachment` (TEXT) - Optional
- `UsageWithAttachment` (TEXT) - Optional
- `Department` (VARCHAR(500)) - Optional
- `Section` (VARCHAR(500)) - Optional
- `Remark` (VARCHAR(200)) - Optional
- `IsDeleted` (BOOLEAN) - Default: false
- `CreatedDate` (TIMESTAMP) - Required
- `UpdatedDate` (TIMESTAMP) - Optional

## Next Steps
1. ✅ Run the PostgreSQL table creation script in Supabase
2. ✅ Test the API endpoints
3. ✅ Verify data is being saved correctly
4. ✅ Check that Singapore time is being used correctly

