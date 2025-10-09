---
title: "ZL File Relay"
short: "Enterprise file transfer solution for secure DMZ to SCADA network automation"
status: "beta"
tags:
  - Windows
  - C#
  - .NET
  - Enterprise
  - Security
  - SCADA
heroImage: "/projects/ZLFileRelay.png"
order: 15
published: true
---

![.NET](https://img.shields.io/badge/.NET-8.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-beta-yellow)

## Overview

**ZL File Relay** is a unified enterprise solution for secure, automated file transfer between DMZ and SCADA networks. It combines three powerful components into a single deployable package designed for industrial environments requiring robust, secure file transfers.

> **Status**: Currently in beta - active development with private repository access

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
- Windows Authentication (NTLM/Kerberos)
- Active Directory group authorization
- Multi-file upload support with progress tracking
- User-specific upload directories
- IIS hosted for enterprise reliability
- Real-time status indicators

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
- 🛡️ **Windows Authentication** - Integrated with Active Directory
- ✅ **File Integrity Verification** - SHA-256 checksums for all transfers
- 📝 **Comprehensive Audit Logging** - All operations logged for compliance
- 🚧 **Input Validation** - All inputs sanitized and validated
- 🔒 **Secure Defaults** - Security-first configuration out of the box

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
- **IIS** (optional, for web portal hosting)

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

4. **Configure Web Portal**:
   - Set site name and branding
   - Configure AD groups for access
   - Set upload limits and policies

5. **Install & Start Services**:
   - Click "Install Service"
   - Click "Configure IIS" (if using web portal)
   - Click "Start Service"

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
- **ASP.NET Core** - Web portal hosting
- **WPF** - Configuration tool UI
- **SSH.NET** - Secure file transfers
- **IIS** - Enterprise web hosting
- **Windows Services** - Background processing
- **Active Directory** - Authentication and authorization

### Building from Source

```powershell
# Clone repository (private access required)
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

### Version 2.0.0 (Current Beta)
- ✨ Unified product combining Service + Web Portal
- ⬆️ Upgraded to .NET 8.0
- 🎨 Professional branding and configuration
- 📦 Single installer for all components
- ⚙️ Unified configuration tool
- 🔄 Improved retry logic and error handling
- 📝 Enhanced logging and monitoring

### Version 1.x (Legacy)
- Separate DMZFileTransferService and DMZUploader products

## Support

For technical support and access:
- 📧 **Enterprise Support**: Contact ZentrixLabs
- 📖 **Documentation**: Comprehensive docs included
- 📝 **Logs**: Check `C:\FileRelay\logs`
- 🐛 **Issues**: Private repository access required

## License

Copyright © 2025 ZentrixLabs  
Licensed under the MIT License

---

**ZL File Relay** - Secure, Reliable, Professional File Transfer for Industrial Environments

*Access to the source repository is currently limited during beta development. Contact ZentrixLabs for enterprise licensing and deployment assistance.*

