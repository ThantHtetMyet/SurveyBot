# IIS Deployment Guide for Survey Bot API

## Error 500.31 - Failed to load ASP.NET Core runtime

This error occurs when IIS cannot find the ASP.NET Core runtime. Follow these steps to resolve:

### Step 1: Install ASP.NET Core Hosting Bundle

1. Download the **ASP.NET Core 8.0 Hosting Bundle** from:
   https://dotnet.microsoft.com/download/dotnet/8.0

2. Look for "Hosting Bundle" (not just Runtime) - this includes:
   - .NET Runtime
   - ASP.NET Core Runtime
   - ASP.NET Core Module for IIS

3. Install it on the IIS server

4. **Restart IIS** after installation:
   ```powershell
   iisreset
   ```

### Step 2: Verify Installation

Check if the hosting bundle is installed:
- Open "Programs and Features" in Windows
- Look for "Microsoft ASP.NET Core 8.0.x - Windows Hosting Bundle"

### Step 3: Configure Application Pool

1. Open IIS Manager
2. Select your Application Pool
3. Right-click → "Basic Settings"
4. Set:
   - **.NET CLR Version**: "No Managed Code" (important!)
   - **Managed Pipeline Mode**: "Integrated"

### Step 4: Publish the Application

When publishing, ensure:

1. **Framework-dependent deployment** (recommended):
   ```powershell
   dotnet publish -c Release -o "C:\inetpub\wwwroot\SurveyBotAPI"
   ```

2. Or use Visual Studio:
   - Right-click project → Publish
   - Choose "Folder" or "IIS"
   - Configuration: Release
   - Target Framework: net8.0

### Step 5: Verify web.config

Ensure `web.config` exists in the published folder with:
- `AspNetCoreModuleV2` handler
- Correct `processPath` pointing to `dotnet`
- Correct `arguments` pointing to your DLL

### Step 6: Set Permissions

1. Right-click the published folder → Properties → Security
2. Add "IIS_IUSRS" with "Read & Execute" permissions
3. Add your application pool identity with "Read & Execute" permissions

### Step 7: Check Logs

Enable logging in `web.config`:
```xml
<stdoutLogEnabled="true" 
 stdoutLogFile=".\logs\stdout" />
```

Check logs in: `[PublishedFolder]\logs\stdout_*.log`

### Common Issues:

1. **Wrong .NET version installed**: Ensure .NET 8.0 Hosting Bundle is installed
2. **Application Pool .NET CLR**: Must be "No Managed Code" for ASP.NET Core
3. **Missing web.config**: Ensure web.config is in the published folder
4. **Permissions**: IIS needs read access to the folder
5. **Port conflicts**: Ensure the port (7001) is not in use

### Alternative: Self-Contained Deployment

If you cannot install the hosting bundle, use self-contained deployment:

```xml
<PropertyGroup>
  <RuntimeIdentifier>win-x64</RuntimeIdentifier>
  <SelfContained>true</SelfContained>
</PropertyGroup>
```

Then publish:
```powershell
dotnet publish -c Release -r win-x64 --self-contained true
```

This includes the runtime but creates a larger deployment package.

