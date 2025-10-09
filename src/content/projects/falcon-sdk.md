---
title: "Falcon SDK"
short: ".NET 9 SDK for CrowdStrike Falcon API with OAuth2 authentication and telemetry"
status: "active"
category: "enterprise"
repo: "https://github.com/ZentrixLabs/ZentrixLabs.FalconSdk"
website: "https://www.nuget.org/packages/ZentrixLabs.FalconSdk"
tags:
  - .NET
  - C#
  - SDK
  - Security
  - CrowdStrike
  - NuGet
order: 35
published: true
---

![NuGet](https://img.shields.io/nuget/v/ZentrixLabs.FalconSdk)
![NuGet Downloads](https://img.shields.io/nuget/dt/ZentrixLabs.FalconSdk)
![License](https://img.shields.io/github/license/ZentrixLabs/ZentrixLabs.FalconSdk)
![.NET](https://img.shields.io/badge/.NET-9.0-blue)

## Overview

**ZentrixLabs.FalconSdk** is a lightweight, MIT-licensed .NET 9 SDK for querying CrowdStrike Falcon data using their OAuth2 API. This SDK simplifies local telemetry analysis, patch readiness, and device visibility by abstracting Falcon's token and device API interactions.

> Available on [NuGet.org](https://www.nuget.org/packages/ZentrixLabs.FalconSdk)

## Quick Start

### Installation

Install via NuGet Package Manager:

```bash
dotnet add package ZentrixLabs.FalconSdk
```

Or via Package Manager Console:

```powershell
Install-Package ZentrixLabs.FalconSdk
```

### Basic Usage

```csharp
using ZentrixLabs.FalconSdk;

// Configure with your API credentials
var options = new CrowdStrikeOptions
{
    ClientId = "your-client-id",
    ClientSecret = "your-client-secret"
};

// Initialize authentication
var auth = new CrowdStrikeAuthService(options);
var token = await auth.GetTokenAsync();

// Query devices
var deviceService = new CrowdStrikeDeviceService(auth);
var deviceIds = await deviceService.GetDeviceIdsAsync();
var devices = await deviceService.GetDeviceDetailsAsync(deviceIds);

// Query vulnerabilities
var spotlightService = new CrowdStrikeSpotlightService(httpClient, auth, options, logger);
var vulnIds = await spotlightService.GetVulnerabilityIdsForHostAsync("host-aid");
var vulnDetails = await spotlightService.GetVulnerabilityDetailsAsync("host-aid", vulnIds.Data);

// Query alerts
var alertService = new AlertService(httpClient, auth, options, logger);
var alertIds = await alertService.GetAlertIdsAsync();
var alertDetails = await alertService.GetAlertDetailsAsync(alertIds.Data);
```

## Features

### ✅ Currently Supported

- **OAuth2 Authentication**: Automatic token generation from API keys
- **Device Management**: Search and retrieve device details
- **Host Groups**: Query host group information
- **Vulnerability Management**: 
  - Search vulnerabilities by filter
  - Get vulnerability details by ID
  - Query vulnerability hosts
  - Retrieve remediation information
  - Get vulnerability counts
  - Access evaluation logic
- **Alert Management**:
  - Search alerts by criteria
  - Retrieve alert details

### 🔌 Supported API Endpoints

| Purpose | Falcon API Endpoint |
|---------|---------------------|
| Device search | `/devices/queries/devices/v1` |
| Device details | `/devices/entities/devices/v2` |
| Host groups | `/devices/entities/host-groups/v1` |
| Vulnerabilities by filter | `/spotlight/queries/vulnerabilities/v1` |
| Vulnerabilities by ID | `/spotlight/entities/vulnerabilities/v1` |
| Vulnerability hosts | `/spotlight/combined/hosts/v1` |
| Vulnerability remediations | `/spotlight/combined/remediations/v1` |
| Vulnerability counts | `/spotlight/queries/vulnerabilities/v1` |
| Vulnerability host counts | `/spotlight/queries/hosts/v1` |
| Vulnerability remediation counts | `/spotlight/queries/remediations/v1` |
| Vulnerability evaluation logic | `/spotlight/entities/evaluation-logic/v1` |
| Alerts search (IDs) | `/alerts/queries/alerts/v1` |
| Alert details | `/alerts/entities/alerts/v2` |

### 🚧 Future Roadmap

Planned features for future releases:
- Streaming detections and real-time event subscriptions
- Threat Graph integration
- Incident management
- Host group mutations
- Retry logic and circuit breaker support
- Built-in structured logging and telemetry
- Response actions and remediation

## Demo Application

A complete console demo application is available to help you get started:

**[ZentrixLabs.FalconConsoleDemo](https://github.com/ZentrixLabs/ZentrixLabs.FalconConsoleDemo)**

The demo showcases:
- Authentication setup
- Device queries
- Vulnerability scanning
- Alert retrieval
- Error handling patterns
- Best practices

## Prerequisites

### CrowdStrike API Key

You need a CrowdStrike Falcon API key with the following permissions:

- ✅ **Hosts**: Read
- ✅ **Host Groups**: Read
- ✅ **Assets**: Read
- ✅ **Vulnerabilities**: Read
- ✅ **Alerts**: Read

### Creating an API Key

From the Falcon console:
1. Go to **Support > API Clients and Keys**
2. Create a new key
3. Grant the required permissions listed above
4. Save your Client ID and Client Secret

**Note**: The user creating the key must have the necessary permissions (Vulnerability Manager, Device Control, etc.)

## Advanced Features

### Device Queries

```csharp
// Search for specific devices
var deviceService = new CrowdStrikeDeviceService(auth);
var deviceIds = await deviceService.GetDeviceIdsAsync(
    filter: "platform_name:'Windows'+hostname:'*server*'"
);

// Get detailed information
var devices = await deviceService.GetDeviceDetailsAsync(deviceIds);

foreach (var device in devices)
{
    Console.WriteLine($"Host: {device.Hostname}");
    Console.WriteLine($"OS: {device.OsVersion}");
    Console.WriteLine($"Last Seen: {device.LastSeen}");
}
```

### Vulnerability Management

```csharp
var spotlightService = new CrowdStrikeSpotlightService(httpClient, auth, options, logger);

// Get vulnerabilities for a specific host
var vulnIds = await spotlightService.GetVulnerabilityIdsForHostAsync("host-aid");
var vulnDetails = await spotlightService.GetVulnerabilityDetailsAsync("host-aid", vulnIds.Data);

// Get remediation information
var remediations = await spotlightService.GetRemediationsAsync(vulnIds.Data);

// Get vulnerability counts for reporting
var counts = await spotlightService.GetVulnerabilityCountsAsync();
```

### Alert Queries

```csharp
var alertService = new AlertService(httpClient, auth, options, logger);

// Search for alerts
var alertIds = await alertService.GetAlertIdsAsync(
    filter: "severity:>=5"
);

// Get alert details
var alerts = await alertService.GetAlertDetailsAsync(alertIds.Data);
```

## Use Cases

### Security Operations
- **Device Inventory**: Track all endpoints managed by Falcon
- **Vulnerability Scanning**: Automated vulnerability assessment
- **Patch Readiness**: Identify systems needing updates
- **Alert Monitoring**: Integrate alerts into dashboards
- **Compliance Reporting**: Generate security posture reports

### Automation
- **Automated Queries**: Schedule regular security checks
- **Custom Dashboards**: Build tailored security dashboards
- **Integration**: Connect Falcon data to other systems
- **Reporting**: Generate custom security reports
- **Monitoring**: Real-time security monitoring

### Development
- **Local Testing**: Test Falcon integrations locally
- **Prototype Development**: Rapid prototyping with Falcon data
- **Custom Tools**: Build specialized security tools
- **Data Analysis**: Analyze Falcon telemetry data

## Technical Details

### Architecture
- **Modular Services**: Clean separation of concerns
- **Async/Await**: Modern asynchronous patterns
- **Dependency Injection**: Ready for DI containers
- **POCO Models**: Simple, serializable data models
- **HttpClient**: Standard .NET HTTP communication

### Pagination Support
Some endpoints require handling pagination:
- Device queries use scroll tokens
- Spotlight queries use next tokens
- Alert queries support pagination
- SDK handles token management

### Error Handling
```csharp
try
{
    var devices = await deviceService.GetDeviceDetailsAsync(deviceIds);
}
catch (HttpRequestException ex)
{
    // Handle API errors
    Console.WriteLine($"API Error: {ex.Message}");
}
catch (Exception ex)
{
    // Handle other errors
    Console.WriteLine($"Error: {ex.Message}");
}
```

## Requirements

- **.NET 9.0** or later
- **CrowdStrike Falcon** subscription with API access
- **Valid API credentials** with appropriate permissions

## Installation & Setup

### 1. Install Package

```bash
dotnet add package ZentrixLabs.FalconSdk
```

### 2. Configure Options

```csharp
var options = new CrowdStrikeOptions
{
    ClientId = Environment.GetEnvironmentVariable("FALCON_CLIENT_ID"),
    ClientSecret = Environment.GetEnvironmentVariable("FALCON_CLIENT_SECRET"),
    BaseUrl = "https://api.crowdstrike.com" // Optional, uses default
};
```

### 3. Initialize Services

```csharp
var auth = new CrowdStrikeAuthService(options);
var deviceService = new CrowdStrikeDeviceService(auth);
```

### 4. Query Data

```csharp
var deviceIds = await deviceService.GetDeviceIdsAsync();
var devices = await deviceService.GetDeviceDetailsAsync(deviceIds);
```

## Demo Application

Check out the complete demo application:

**[ZentrixLabs.FalconConsoleDemo](https://github.com/ZentrixLabs/ZentrixLabs.FalconConsoleDemo)**

The demo includes:
- Complete authentication flow
- Device enumeration examples
- Vulnerability queries
- Alert retrieval
- Error handling patterns
- Console output formatting

## Community & Support

### Contributing

Contributions are welcome! The SDK continues to evolve to encompass more features from the CrowdStrike Falcon API.

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Testing

Unit test contributions are especially welcome:
- Fork and add xUnit test coverage
- Test edge cases and error conditions
- Improve API coverage

### Issues & Questions

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/ZentrixLabs/ZentrixLabs.FalconSdk/issues)
- 💡 **Feature Requests**: Submit via GitHub Issues
- 📖 **Documentation**: Check the [README](https://github.com/ZentrixLabs/ZentrixLabs.FalconSdk)

## Acknowledgments

This SDK would not have been possible without:
- The **PSFalcon** module team
- The **Falcon SDK** community
- CrowdStrike API community support and documentation

## Links

- 📦 [NuGet Package](https://www.nuget.org/packages/ZentrixLabs.FalconSdk)
- 💻 [Source Code](https://github.com/ZentrixLabs/ZentrixLabs.FalconSdk)
- 🎮 [Demo Application](https://github.com/ZentrixLabs/ZentrixLabs.FalconConsoleDemo)
- 📚 [CrowdStrike API Docs](https://falcon.crowdstrike.com/documentation)

## License

Licensed under the [MIT License](https://github.com/ZentrixLabs/ZentrixLabs.FalconSdk/blob/main/LICENSE).

You are free to use, modify, and distribute - including in commercial products - with attribution.

---

**Available on NuGet** | **Open Source** | **MIT Licensed**

*The SDK continues to evolve with new features and endpoints. Contributions welcome!*

