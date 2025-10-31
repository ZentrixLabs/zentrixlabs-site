---
title: "ZL File Relay"
short: "Enterprise file transfer solution for secure DMZ to SCADA network automation"
status: "active"
category: "enterprise"
repo: "https://github.com/ZentrixLabs/ZLFileRelay"
tags:
  - Windows
  - C#
  - .NET
  - Enterprise
  - Security
  - SCADA
heroImage: "/projects/ZLFileRelay.png"
order: 10
published: true
---

![.NET](https://img.shields.io/badge/.NET-8.0-blue)
![License](https://img.shields.io/badge/license-LGPL--3.0--or--later-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## Overview

**ZL File Relay** is a unified enterprise solution for secure, automated file transfer between DMZ and SCADA networks. It combines three powerful components into a single deployable package designed for industrial environments requiring robust, secure file transfers.

> Public repository and documentation available on GitHub: https://github.com/ZentrixLabs/ZLFileRelay

## System Components

### 🔄 File Transfer Service
**Automated Windows Service** that watches directories and securely transfers files:
- Real-time file system monitoring with `FileSystemWatcher`
- Secure SSH/SCP transfer (primary method)
- SMB3 fallback with authenticated connections
- Automatic retry logic with exponential backoff
- File integrity verification with SHA-256 checksums
- Comprehensive audit logging
- Runs as Windows Service for 24/7 reliability

### 🌐 Web Upload Portal
**User-friendly web interface** for file uploads:
- Modern responsive ASP.NET Core interface
- Hybrid authentication: Entra ID (Azure AD) OAuth/OIDC or Local Accounts
- Authorization Code Flow for Entra ID
- Multi-file upload support with progress tracking
- User-specific upload directories
- Runs on Kestrel; supports reverse proxy with IIS/NGINX
- Real-time status indicators and branding

### ⚙️ Configuration Tool
**Intuitive WPF application** for unified management:
- Unified configuration interface for all components
- SSH key generation and management
- Service installation and management
- IIS configuration automation
- Real-time service status monitoring
- Credential encryption with Windows DPAPI
- Configuration validation and testing

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    ZL File Relay                          │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌────────────────┐         ┌──────────────────┐        │
│  │  Web Portal    │         │  Transfer Service│        │
│  │  (IIS/ASP.NET) │         │  (Windows Service)│        │
│  └────────┬───────┘         └────────┬─────────┘        │
│           │                          │                   │
│           └──────────┬───────────────┘                   │
│                      │                                   │
│           ┌──────────▼──────────┐                        │
│           │  Shared Config      │                        │
│           │  (appsettings.json) │                        │
│           └─────────────────────┘                        │
└──────────────────────────────────────────────────────────┘
                      │
                      │ SSH/SCP or SMB
                      ▼
          ┌───────────────────────┐
          │   SCADA File Server   │
          └───────────────────────┘
```

## Key Features

### Enterprise Security
- 🔐 **Windows DPAPI Encryption** - Credentials encrypted at rest
- 🔑 **SSH Key Authentication** - Public key auth preferred over passwords
- 🛡️ **Hybrid Authentication** - Entra ID (Azure AD) + Local Accounts
- 🔒 **Authorization Code Flow** - Secure OAuth 2.0 flow for Entra ID
- ✅ **File Integrity Verification** - SHA-256 checksums for all transfers
- 📝 **Comprehensive Audit Logging** - All operations logged for security monitoring
- 🚧 **Input Validation** - All inputs sanitized and validated
- 🌐 **SSL/TLS Support** - Certificate store integration for secure HTTPS

### Operational Excellence
- ⚡ **Automatic Retry Logic** - Exponential backoff for failed transfers
- 📊 **Real-time Monitoring** - Service health and transfer status
- 🎯 **Multiple Transfer Methods** - SSH/SCP primary, SMB fallback
- 🔄 **Directory Watching** - Automatic processing of new files
- 📈 **Performance Optimized** - Built on .NET 8 for speed
- 🎨 **Professional UI** - Modern WPF and web interfaces

## Quick Start

### System Requirements
- **Windows Server 2019** or later (2022 recommended)
- **.NET 8.0 Runtime** (included in self-contained deployment)
- **ASP.NET Core 8.0 Runtime** (for web portal)
- **Administrative privileges** for installation

### Installation Steps

1. **Download** the installer: `ZLFileRelay-Setup.exe`
2. **Run as Administrator** to begin installation
3. **Select Components**:
   - File Transfer Service (recommended)
   - Web Upload Portal (requires IIS)
   - Configuration Tool (recommended)
4. **Complete** installation wizard
5. **Launch** Configuration Tool from Start Menu

### Initial Configuration

1. **Open Configuration Tool** as Administrator
2. **Configure Upload Paths**:
   - Upload Directory: `C:\FileRelay\uploads`
   - Transfer Directory: `C:\FileRelay\uploads\transfer`
   - Log Directory: `C:\FileRelay\logs`

3. **Configure SSH Transfer** (recommended):
   - Click **Generate SSH Keys**
   - Copy public key to SCADA server
   - Enter SSH host, username, and destination
   - Test connection

4. **Configure Web Portal Authentication**:
   - Choose Entra ID (Azure AD) or Local Accounts
   - For Entra ID: run Setup Wizard (OAuth/OIDC Authorization Code Flow)
   - Set site name and branding
   - Configure SSL certificate (via Certificate Store Browser)

5. **Install & Start Services**:
   - Click "Install Service" to register Windows Service
   - Start the Web Portal (runs on Kestrel; optional reverse proxy via IIS/NGINX)
   - Click "Start Service" to begin file monitoring

## Configuration

### Shared Configuration
All components share a unified `appsettings.json` file:

**Location**: `C:\ProgramData\ZLFileRelay\appsettings.json`

### Example Configuration

```json
{
  "ZLFileRelay": {
    "Branding": {
      "CompanyName": "Your Company",
      "SiteName": "Production Site A",
      "SupportEmail": "support@example.com"
    },
    "Paths": {
      "UploadDirectory": "C:\\FileRelay\\uploads",
      "LogDirectory": "C:\\FileRelay\\logs"
    },
    "Service": {
      "TransferMethod": "ssh",
      "RetryAttempts": 3
    },
    "Transfer": {
      "Ssh": {
        "Host": "scada-server.example.com",
        "Port": 22,
        "Username": "svc_filetransfer",
        "DestinationPath": "/data/incoming"
      }
    }
  }
}
```

## Deployment Scenarios

### Scenario 1: DMZ to SCADA Transfer
Users upload files via web portal → Service automatically transfers to SCADA network

**Use Case**: Production engineers need to transfer updates to air-gapped SCADA systems

### Scenario 2: Automated Directory Monitoring
Applications drop files in monitored directory → Service transfers automatically

**Use Case**: Automated backups or data exports that need SCADA network delivery

### Scenario 3: Multi-Site Deployment
Deploy at multiple sites with site-specific configurations

**Use Case**: Enterprise with multiple production facilities requiring consistent file transfer

## Project Structure

```
ZLFileRelay/
├── src/
│   ├── ZLFileRelay.Core/           # Shared models and services
│   ├── ZLFileRelay.Service/        # Windows Service
│   ├── ZLFileRelay.WebPortal/      # ASP.NET Core web app
│   └── ZLFileRelay.ConfigTool/     # WPF configuration tool
├── installer/
│   ├── ZLFileRelay.iss             # Inno Setup installer
│   └── scripts/                    # Installation scripts
├── docs/                           # Comprehensive documentation
└── tests/                          # Unit tests
```

## Technical Details

### Technologies Used
- **.NET 8.0** - Modern, high-performance framework
- **ASP.NET Core** - Web portal hosting (Kestrel)
- **WPF** - Configuration tool UI
- **SSH.NET** - Secure file transfers
- **Windows Services** - Background processing
- **Active Directory / Entra ID** - Authentication and authorization

### Building from Source

```powershell
# Clone repository
git clone https://github.com/ZentrixLabs/ZLFileRelay.git
cd ZLFileRelay

# Restore dependencies
dotnet restore

# Build all projects
dotnet build --configuration Release

# Run tests
dotnet test

# Build installer (requires Inno Setup)
.\build\build-installer.ps1
```

## Remote Management

For managing remote servers (e.g., Windows Server Core), WinRM must be enabled:

```powershell
# Run on target server as Administrator:
Enable-PSRemoting -Force
```

Most enterprise environments already have WinRM enabled via Group Policy.

## Security Considerations

### Authentication
- SSH key authentication preferred over passwords
- Windows Authentication for web portal
- DPAPI encryption for stored credentials

### Network Security
- Operates between DMZ and SCADA networks
- Designed for air-gapped or segmented environments
- Supports both SSH (port 22) and SMB (port 445)

### Audit & Compliance
- All transfers logged with timestamps
- User activity tracking in web portal
- File integrity verification for compliance
- Comprehensive event logging

## Troubleshooting

### Service Won't Start
- Check Windows Event Log
- Verify paths exist and are writable
- Ensure proper permissions

### Transfer Failures
- Test SSH connectivity manually
- Verify credentials and keys
- Check firewall rules
- Review service logs in `C:\FileRelay\logs`

### Web Portal Access Issues
- Verify IIS is running
- Check Windows Authentication settings
- Confirm AD group membership
- Review IIS logs

## Version History

### Version 2.0.0 (Current)
- ✨ Unified product combining Service + Web Portal
- ⬆️ Upgraded to .NET 8.0
- 🔐 NEW: Hybrid authentication (Entra ID + Local Accounts)
- 🌐 NEW: Switched from HTTP.sys to Kestrel for flexibility
- 🧙 NEW: Entra ID Setup Wizard with automatic hostname detection
- 🎨 Professional branding and configuration
- 📦 Single installer for all components
- ⚙️ Unified configuration tool
- 🔄 Improved retry logic and error handling
- 📝 Enhanced logging and monitoring

### Version 1.x (Legacy)
- Separate DMZFileTransferService and DMZUploader products

## Support

For technical support:
- 📧 Email: zlfilerelay_help@zentrixlabs.net
- 📖 Documentation: see `docs/` in the repository
- 🐛 Issues: use GitHub Issues on the public repo
- 📝 Logs: Check `C:\FileRelay\logs` or Windows Event Log

## License

Copyright © 2025 ZentrixLabs  
Licensed under the GNU Lesser General Public License v3.0 or later (LGPL-3.0-or-later)

---

**ZL File Relay** - Secure, Reliable, Professional File Transfer for Industrial Environments

