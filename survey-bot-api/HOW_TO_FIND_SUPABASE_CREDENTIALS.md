# How to Find Supabase Database Credentials

## Step-by-Step Guide

### 1. Log in to Supabase Dashboard
- Go to https://app.supabase.com
- Log in with your account

### 2. Select Your Project
- Click on your project (in this case, the one with host `db.yyzwexlijvekoktqjdcg.supabase.co`)

### 3. Navigate to Database Settings
- In the left sidebar, click on **Settings** (gear icon at the bottom)
- Then click on **Database** in the settings menu

### 4. Find Connection String
You'll see several sections:

#### **Connection Info Section:**
- **Host**: `db.yyzwexlijvekoktqjdcg.supabase.co` (you already have this)
- **Database name**: Usually `postgres` (but you changed it to `SurveyBot` - verify this is correct)
- **Port**: 
  - `5432` for direct connections
  - `6543` for connection pooling
- **User**: Usually `postgres` (default)
- **Password**: This is shown here (you can reset it if needed)

#### **Connection String Section:**
Supabase provides connection strings in different formats:
- **URI**: `postgres://postgres:[YOUR-PASSWORD]@db.yyzwexlijvekoktqjdcg.supabase.co:5432/postgres`
- **JDBC**: For Java applications
- **Direct connection**: For direct database access
- **Session mode**: For connection pooling

### 5. Verify Your Password
- If you don't remember your password:
  1. In the **Database** settings page
  2. Scroll to the **Database Password** section
  3. Click **Reset database password**
  4. Enter a new password
  5. **Save it securely** - you'll need it for your connection string

### 6. Check Database Name
- The default database name is usually `postgres`
- If you created a custom database, check:
  1. Go to **SQL Editor** in the left sidebar
  2. Run: `SELECT current_database();`
  3. This will show your current database name

### 7. Test Connection
You can test the connection using:
- **Supabase SQL Editor** (built-in)
- **pgAdmin** (PostgreSQL client)
- **DBeaver** (Database management tool)

## Current Connection String Format

Based on your current settings:
```
Host=db.yyzwexlijvekoktqjdcg.supabase.co
Port=5432
Database=SurveyBot (or postgres - verify this!)
Username=postgres
Password=Willowglen_12345 (verify this is correct!)
SslMode=Require
TrustServerCertificate=true
```

## Common Issues

### Wrong Database Name
- Default is usually `postgres`
- If `SurveyBot` doesn't exist, change it back to `postgres`

### Wrong Password
- Reset it in Supabase dashboard
- Make sure there are no extra spaces or special characters

### Wrong Port
- Try `5432` for direct connection
- Try `6543` for connection pooling

### IP Restrictions
- Check **Settings** → **Database** → **Connection Pooling**
- Make sure your IP is not blocked
- Some Supabase plans have IP restrictions

## Quick Verification Steps

1. ✅ Go to Supabase Dashboard → Settings → Database
2. ✅ Check the **Database Password** section
3. ✅ Verify the **Database name** (usually `postgres`)
4. ✅ Copy the exact connection string from Supabase
5. ✅ Update your `appsettings.json` with the correct values

