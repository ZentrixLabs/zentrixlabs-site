---
title: "ZLGetCert"
short: "Modern Windows app for certificate requests from on-premises CA without PowerShell"
status: "active"
category: "enterprise"
repo: "https://github.com/ZentrixLabs/ZLGetCert"
heroImage: "/projects/ZLGetCert_logo.png"
tags:
  - Windows
  - C#
  - .NET
  - WPF
  - Security
  - Certificates
order: 25
published: true
---

[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
![.NET Framework](https://img.shields.io/badge/.NET%20Framework-4.8-blue)
[![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey.svg)](https://www.microsoft.com/windows)
![Release](https://img.shields.io/github/v/release/ZentrixLabs/ZLGetCert)

## Overview

ZLGetCert is a Windows WPF application that streamlines certificate enrollment from on-premises Certificate Authorities—no PowerShell or command-line experience required. Built on **.NET Framework 4.8**, it is intentionally compatible with legacy servers, OT/SCADA networks, and air-gapped environments.

> **Status**: Digitally signed installer available on GitHub. Grab the latest release for production deployments.

### Why teams choose ZLGetCert

- 🖥️ **Enterprise-Grade UI**: Modern card-based layout with Font Awesome 7 Pro icons and consistent branding
- 📜 **Template-Driven Workflows**: Standard, wildcard, and CSR signing with smart template detection
- 🔐 **Pure .NET PEM/KEY Export**: Zero external dependencies; works offline on any Windows host
- ⚙️ **Configuration-First**: Every option loaded from JSON with live validation inside the app
- 🛡️ **Security Hardened**: SecureString handling, command injection safeguards, and password enforcement baked in
- 📊 **Audit Ready**: Centralized, configurable logging with full activity traceability

## Prerequisites

- Windows Server 2016 or later (2012 R2 supported)
- .NET Framework 4.8 (built-in on Server 2019+)
- Local administrator rights for certificate store operations

## Quick Start

1. **Download** the signed installer or binaries from [GitHub Releases](https://github.com/ZentrixLabs/ZLGetCert/releases).
2. **Install** (or build from source via Visual Studio) and launch the application.
3. **Configure** your CA connection and defaults via the in-app ⚙️ Settings panel.
4. **Generate or sign** certificates using the guided workflow.

## Core Functionality

- **Modern UI/UX**: Real-time validation, validation summary cards, and inline feedback to reduce form errors.
- **Multi-Workflow Support**: Standard and wildcard enrollment, plus dedicated CSR import with streamlined signing.
- **Template Automation**: Smart template recommendations detect certificate type, OIDs, and key usage automatically.
- **Certificate Chain Builder**: Automatically compiles intermediate and root certificates for complete bundles.
- **Password Tools**: One-click 16-character strong password generation with live strength meter and policy indicators.

## Security & Compliance

- **SecureString Passwords**: Sensitive values stored securely in memory and disposed automatically.
- **Command Injection Prevention**: DNS, file path, template, and thumbprint validation on all external process calls.
- **Strong Password Enforcement**: Blocks weak/common passwords and enforces length and complexity requirements.
- **Template/Type Validation**: Guards against mismatched Enhanced Key Usage combinations before submission.
- **Pure .NET Cryptography**: PEM/KEY export via `System.Security.Cryptography`—no OpenSSL, no third-party binaries.
- **User-Scope Configuration**: Settings stored in `%APPDATA%\ZentrixLabs\ZLGetCert\appsettings.json`, keeping admin templates read-only.

## User Experience Highlights

- **Certificate Subject Preview** updates live as you type X.500 details.
- **Bulk SAN Entry** supports pasting 10+ DNS/IP entries at once—90% faster than single-field workflows.
- **FQDN Auto-Generation** suggests fully qualified hostnames with manual override when needed.
- **Template Help Tooltips** explain usage scenarios directly within the UI.
- **CSR Workflow Clarity** hides irrelevant fields after importing a CSR to reduce confusion.

## Installation & Deployment

### Build from Source

1. Clone the repository and open `ZLGetCert.sln` in Visual Studio 2019 or newer.
2. Build the solution in `Release | x64`.
3. Run `ZLGetCert\bin\Release\ZLGetCert.exe`.

> Command-line `msbuild`/`dotnet` builds are not supported for this .NET Framework 4.8 WPF project.

### Silent Enterprise Install

```cmd
ZLGetCertInstaller.exe /SILENT /NORESTART
```

```cmd
ZLGetCertInstaller.exe /VERYSILENT /NORESTART /SUPPRESSMSGBOXES /LOG="C:\Windows\Temp\ZLGetCert_install.log"
```

Additional flags:
- `/DIR="C:\Custom\Path"` – Set installation directory
- `/NOICONS` – Skip Start Menu shortcuts
- `/TASKS="desktopicon"` – Force desktop shortcut creation

## Configuration & Management

All runtime options are delivered through JSON configuration—no hardcoded defaults.

```json
{
  "CertificateAuthority": {
    "Server": "your-ca-server.domain.com",
    "Template": "WebServerV2",
    "DefaultCompany": "your-domain.com",
    "DefaultOU": "IT"
  },
  "FilePaths": {
    "CertificateFolder": "C:\\ssl",
    "LogPath": "C:\\ProgramData\\ZentrixLabs\\ZLGetCert"
  },
  "DefaultSettings": {
    "KeyLength": 2048,
    "HashAlgorithm": "sha256",
    "RequirePasswordConfirmation": true,
    "AutoCleanup": true,
    "RememberPassword": false,
    "AvailableHashAlgorithms": ["sha256", "sha384", "sha512"]
  },
  "Logging": {
    "LogLevel": "Information",
    "LogToFile": true,
    "LogToConsole": false,
    "MaxLogFileSize": "10MB",
    "MaxLogFiles": 5,
    "AvailableLogLevels": ["Trace", "Debug", "Information", "Warning", "Error", "Fatal"]
  }
}
```

- **In-App Settings Editor**: Real-time JSON validation with color-coded feedback (green/yellow/red).
- **Instant Apply**: Changes write to user-scoped configuration and take effect immediately.
- **Configuration Safety**: Built-in validation prevents saving invalid JSON or unsupported values.

## Logging & Auditing

Operations log to `C:\ProgramData\ZentrixLabs\ZLGetCert`, providing:
- Detailed operation and error logs
- Configurable verbosity (Trace → Fatal)
- Rolling file retention and maximum size controls
- Audit-ready history for compliance teams

## Designed for Restricted Environments

- **Air-Gapped Ready**: Runs fully offline with no telemetry or forced updates.
- **Minimal Footprint**: Single WPF executable with bundled dependencies.
- **Policy Friendly**: Targets .NET Framework 4.8—commonly pre-approved in enterprise environments.
- **Predictable Behavior**: No registry modifications beyond standard .NET requirements.

## Documentation & Support

- Primary documentation and user guides live in the repository’s `docs/` folder.
- Feature-specific walkthroughs cover SAN management, password UX, template selection, and more.
- For issues or feature requests, open a ticket on [GitHub](https://github.com/ZentrixLabs/ZLGetCert/issues).
- Review local logs and the in-app configuration editor for troubleshooting guidance.

## Recent Updates

- **Security Hardening**: SecureString handling, command sanitation, strong password enforcement, and EKU validation.
- **UX Enhancements**: Inline validation, template guidance, certificate subject preview, and improved password tooling.
- **PEM Export Overhaul**: Fully managed PEM/KEY generation with certificate chain packaging.
- **Branding Refresh**: Font Awesome 7 Pro icons, standardized palette, and modern card-based layout.
- **Documentation Expansion**: New security and UX guides, implementation summaries, and testing checklists.

## Project Details

- **Tech Stack**: .NET Framework 4.8, WPF, MVVM, Font Awesome 7 Pro, Newtonsoft.Json, NLog.
- **Repository**: [GitHub – ZentrixLabs/ZLGetCert](https://github.com/ZentrixLabs/ZLGetCert)
- **License**: [GNU LGPL v3.0](https://github.com/ZentrixLabs/ZLGetCert/blob/main/LICENSE)

---

🔗 [Project Repository](https://github.com/ZentrixLabs/ZLGetCert) | 📦 [Latest Release](https://github.com/ZentrixLabs/ZLGetCert/releases)

