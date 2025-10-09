---
title: "ZLGetCert"
short: "Modern Windows app for certificate requests from on-premises CA without PowerShell"
status: "beta"
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

![License](https://img.shields.io/github/license/ZentrixLabs/ZLGetCert)
![.NET Framework](https://img.shields.io/badge/.NET%20Framework-4.8-blue)
![Release](https://img.shields.io/github/v/release/ZentrixLabs/ZLGetCert)

## Overview

ZLGetCert is a modern Windows WPF application that simplifies certificate requests from on-premises Certificate Authority (CA) without requiring PowerShell or command-line expertise. Features a clean, card-based UI with comprehensive configuration management.

> **Status**: Currently in beta - actively developed and tested

### Key Features

- 🎨 **Modern UI**: Clean, card-based interface with improved UX and visual hierarchy
- 📜 **Multiple Certificate Types**: Standard, Wildcard, and CSR-based certificates
- ⚙️ **Configurable Options**: Dynamic hash algorithms and log levels from configuration
- 📝 **Centralized Logging**: Comprehensive logging system
- 🔧 **Environment Configuration**: Flexible `appsettings.json` configuration
- 🔐 **OpenSSL Integration**: Optional PEM/KEY extraction
- 🔒 **Secure Password Handling**: User-configurable PFX passwords with secure storage
- ⛓️ **Certificate Chain Support**: Automatic root/intermediate compilation
- ⚡ **Real-time Validation**: JSON validator with instant feedback

## Quick Start

### Prerequisites
- **Windows Server 2016** or later
- **.NET Framework 4.8**
- **OpenSSL for Windows** (optional, for PEM/KEY extraction)
- **Administrator privileges** (for certificate store operations)

### Getting Started

1. **Download**: Get the latest release from [GitHub](https://github.com/ZentrixLabs/ZLGetCert/releases)
2. **Configure**: Set up your CA settings via Edit → Settings
3. **Generate**: Create certificates using the intuitive interface

## Certificate Types

### Standard Certificate
Create regular hostname certificates with multiple Subject Alternative Names (SANs):

1. Select "Standard Certificate" radio button
2. Enter hostname in the Domain field
3. Add SANs if needed
4. Configure organization information
5. Set PFX password
6. Click "Generate Certificate"

### Wildcard Certificate
Generate wildcard domain certificates:

1. Select "Wildcard Certificate" radio button
2. Enter wildcard domain (e.g., `*.domain.com`)
3. Configure location and company details
4. Set PFX password
5. Generate certificate

### CSR-Based Request
Submit existing Certificate Signing Requests:

1. Select "From CSR" radio button
2. Browse to existing CSR file
3. Set PFX password
4. Submit to CA

## Configuration

### appsettings.json Structure

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
  "OpenSSL": {
    "ExecutablePath": "",
    "AutoDetect": true,
    "CommonPaths": [
      "C:\\Program Files\\OpenSSL-Win64\\bin\\openssl.exe"
    ]
  },
  "DefaultSettings": {
    "KeyLength": 2048,
    "HashAlgorithm": "sha256",
    "DefaultPassword": "password",
    "RequirePasswordConfirmation": true,
    "AutoCleanup": true,
    "RememberPassword": false,
    "AvailableHashAlgorithms": ["sha256", "sha384", "sha512"]
  },
  "Logging": {
    "LogLevel": "Information",
    "LogToFile": true,
    "MaxLogFileSize": "10MB",
    "MaxLogFiles": 5
  }
}
```

### Configuration Features

- **Dynamic Options**: All UI options loaded from configuration
- **No Hardcoded Values**: Easy customization through JSON
- **Environment-Specific**: Different settings for different deployments
- **JSON Validator**: Real-time validation with color-coded feedback
- **Configuration Editor**: Direct JSON editing with syntax validation

## Advanced Features

### Settings Panel
Access comprehensive configuration:
- Click the ⚙️ Settings button
- Modify CA server settings, file paths, and defaults
- Configure logging options and hash algorithms
- Changes applied immediately

### Configuration Editor
Direct JSON editing capabilities:
- Go to Edit → Configuration Editor
- Real-time JSON validation:
  - ✅ **Green**: Valid JSON - Ready to save
  - ⚠️ **Yellow**: Configuration issues
  - ❌ **Red**: Invalid JSON - Syntax errors
- Detailed error messages
- Safety checks prevent invalid configurations

### OpenSSL Integration

When OpenSSL is detected, the application can:
- Extract PEM and KEY files from PFX certificates
- Generate certificate chains (root/intermediate)
- Clean up temporary files automatically

Auto-detection searches common installation paths and configures itself automatically.

## Security Features

- **SecureString**: Passwords handled securely in memory
- **Password Masking**: UI and log password protection
- **Automatic Cleanup**: Memory cleared after operations
- **Secure Storage**: Encrypted password storage in configuration

## Logging & Auditing

All operations logged to `C:\ProgramData\ZentrixLabs\ZLGetCert`:
- **Detailed Operations**: Complete audit trail
- **Error Tracking**: Comprehensive error logging
- **Configurable Levels**: From Trace to Fatal
- **Rolling Files**: Automatic log rotation
- **Size Management**: Configurable max file size

## Architecture

### Project Structure
```
ZLGetCert/
├── Models/           # Data models (AppConfiguration, etc.)
├── ViewModels/       # MVVM ViewModels
├── Views/            # WPF XAML views
├── Services/         # Business logic services
├── Utilities/        # Helper classes
├── Enums/            # Enumerations
├── Styles/           # XAML styles and templates
├── Converters/       # Value converters for data binding
└── appsettings.json  # Application configuration
```

### Technologies
- **.NET Framework 4.8**: Target framework
- **WPF**: Windows Presentation Foundation
- **MVVM Pattern**: Model-View-ViewModel architecture
- **Newtonsoft.Json**: Configuration serialization
- **NLog**: Logging framework

## Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/ZentrixLabs/ZLGetCert.git
cd ZLGetCert

# Build solution
msbuild ZLGetCert.sln /p:Configuration=Release

# Run application
.\ZLGetCert\bin\Release\ZLGetCert.exe
```

### Development Guidelines
- Follow existing code style and patterns
- Add appropriate error handling and logging
- Update documentation for new features
- Test changes thoroughly
- Ensure all existing tests pass

## Roadmap

Future enhancements planned:
- 🔄 **Certificate Renewal**: Automated renewal workflows
- 🌐 **Multi-language Support**: Internationalization
- 🔌 **Plugin Architecture**: Custom validators
- 📊 **Enhanced Reporting**: Certificate inventory and expiry tracking
- 🎯 **Additional Certificate Types**: Extended format support

## Troubleshooting

### Common Issues

**CA Connection Fails**
- Verify CA server name in settings
- Check network connectivity
- Ensure proper permissions

**OpenSSL Not Detected**
- Install OpenSSL for Windows
- Check configured paths in settings
- Verify executable permissions

**Certificate Generation Errors**
- Review logs in `C:\ProgramData\ZentrixLabs\ZLGetCert`
- Verify CA template permissions
- Check domain validation

**Configuration Issues**
- Use Configuration Editor for validation
- Check JSON syntax
- Verify all required fields

### Support Resources
- Check logs in `C:\ProgramData\ZentrixLabs\ZLGetCert`
- Review configuration in `appsettings.json`
- Create issues on [GitHub](https://github.com/ZentrixLabs/ZLGetCert/issues)
- Verify OpenSSL installation if using PEM/KEY extraction

## Recent Updates

- ✅ Modern card-based UI layout
- ✅ Configuration-driven options
- ✅ Real-time JSON validation
- ✅ Enhanced logging and auditing
- ✅ Improved security features
- ✅ Comprehensive documentation

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

See [CONTRIBUTING.md](https://github.com/ZentrixLabs/ZLGetCert/blob/main/CONTRIBUTING.md) for details.

## License

Licensed under the [MIT License](https://github.com/ZentrixLabs/ZLGetCert/blob/main/LICENSE).

---

🔗 [Project Repository](https://github.com/ZentrixLabs/ZLGetCert) | 📦 [Latest Release](https://github.com/ZentrixLabs/ZLGetCert/releases)

