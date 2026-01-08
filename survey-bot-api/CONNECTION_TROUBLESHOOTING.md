# Supabase Connection Troubleshooting Guide

## Current Error
"The requested name is valid, but no data of the requested type was found."

This is a DNS/network resolution error, which typically means:
- The hostname cannot be resolved
- Network/firewall is blocking the connection
- The connection string format might need adjustment

## Step-by-Step Troubleshooting

### 1. Verify Connection String from Supabase Dashboard

**Important:** Get the exact connection string from your Supabase dashboard:

1. Go to **Supabase Dashboard** → Your Project
2. Click **Settings** (gear icon) → **Database**
3. Click **"Connect to your project"** button
4. In the modal, select:
   - **Type**: URI (or Connection String)
   - **Source**: Primary Database (or Session Pooler for port 6543)
   - **Method**: Direct connection (port 5432) or Session Pooler (port 6543)
5. **Copy the exact connection string** provided
6. Replace `[YOUR-PASSWORD]` with your actual password

### 2. Check Session Pooler Settings

If using port 6543 (Session Pooler):
1. Go to **Settings** → **Database** → **Connection Pooling**
2. Check if Session Pooler is enabled
3. Note the exact hostname (it might be different from direct connection)
4. Some Supabase projects use a different hostname format like:
   - `aws-1-ap-northeast-2.pooler.supabase.com`
   - Or a region-specific pooler hostname

### 3. Test Network Connectivity

Try these commands in PowerShell/Command Prompt to test connectivity:

```powershell
# Test DNS resolution
nslookup db.yyzwexlijvekoktqjdcg.supabase.co

# Test port connectivity (for port 6543)
Test-NetConnection -ComputerName db.yyzwexlijvekoktqjdcg.supabase.co -Port 6543

# Test port connectivity (for port 5432)
Test-NetConnection -ComputerName db.yyzwexlijvekoktqjdcg.supabase.co -Port 5432
```

### 4. Try Different Connection Formats

#### Option A: URI Format (Current)
```json
"SupabaseConnection": "postgresql://postgres:Willowglen_12345@db.yyzwexlijvekoktqjdcg.supabase.co:6543/postgres?sslmode=Require"
```

#### Option B: Key-Value Format
```json
"SupabaseConnection": "Host=db.yyzwexlijvekoktqjdcg.supabase.co;Port=6543;Database=postgres;Username=postgres;Password=Willowglen_12345;SslMode=Require;TrustServerCertificate=true"
```

#### Option C: Try Direct Connection (Port 5432)
```json
"SupabaseConnection": "postgresql://postgres:Willowglen_12345@db.yyzwexlijvekoktqjdcg.supabase.co:5432/postgres?sslmode=Require"
```

### 5. Check Firewall/Network Settings

- Ensure your network allows outbound connections to Supabase
- Check if your organization's firewall is blocking the connection
- Try from a different network to rule out network issues

### 6. Verify Supabase Project Status

- Ensure your Supabase project is active and not paused
- Check if there are any IP restrictions enabled
- Verify your account has access to the project

### 7. Check Connection Pooler Hostname

If the standard hostname doesn't work, check your Supabase dashboard for:
- **Settings** → **Database** → **Connection Pooling**
- Look for the actual pooler hostname (might be region-specific)
- It might look like: `aws-1-[region].pooler.supabase.com`

### 8. Alternative: Use Direct Connection

If Session Pooler (6543) doesn't work:
1. Try direct connection on port 5432
2. Note: Direct connection might have IPv4 compatibility issues
3. If you get IPv4 errors, you may need to:
   - Purchase IPv4 add-on from Supabase, OR
   - Use a VPN/proxy that supports IPv6

## Quick Test

Create a simple test to verify the connection:

```csharp
// Add this temporarily to test connection
try
{
    using var connection = new NpgsqlConnection(_connectionString);
    await connection.OpenAsync();
    Console.WriteLine("Connection successful!");
}
catch (Exception ex)
{
    Console.WriteLine($"Connection failed: {ex.Message}");
}
```

## Next Steps

1. ✅ Get the exact connection string from Supabase dashboard
2. ✅ Test network connectivity using PowerShell commands
3. ✅ Try both port 5432 and 6543
4. ✅ Check if Session Pooler hostname is different
5. ✅ Verify firewall/network settings
6. ✅ Test from a different network if possible

## Contact Supabase Support

If none of the above works:
- Check Supabase status page: https://status.supabase.com
- Contact Supabase support with:
  - Your project reference ID
  - The exact error message
  - Network connectivity test results

