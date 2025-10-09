---
title: "PRTG SDK"
short: ".NET 9 SDK for PRTG Network Monitor API with sensor classification and monitoring"
status: "active"
category: "enterprise"
repo: "https://github.com/ZentrixLabs/ZentrixLabs.PrtgSdk"
website: "https://www.nuget.org/packages/ZentrixLabs.PrtgSdk"
tags:
  - .NET
  - C#
  - SDK
  - Monitoring
  - PRTG
  - NuGet
order: 36
published: true
---

![NuGet](https://img.shields.io/nuget/v/ZentrixLabs.PrtgSdk)
![NuGet Downloads](https://img.shields.io/nuget/dt/ZentrixLabs.PrtgSdk)
![License](https://img.shields.io/github/license/ZentrixLabs/ZentrixLabs.PrtgSdk)
![.NET](https://img.shields.io/badge/.NET-9.0-blue)

## Overview

**ZentrixLabs.PrtgSdk** is a clean, lightweight .NET 9 SDK for working with the PRTG Network Monitor API. Designed for building monitoring dashboards, automated reports, and infrastructure management tools.

> Available on [NuGet.org](https://www.nuget.org/packages/ZentrixLabs.PrtgSdk)

## Quick Start

### Installation

Install via NuGet Package Manager:

```bash
dotnet add package ZentrixLabs.PrtgSdk
```

Or via Package Manager Console:

```powershell
Install-Package ZentrixLabs.PrtgSdk
```

### Basic Usage

```csharp
using ZentrixLabs.PrtgSdk;

// Configure PRTG connection
var options = new PrtgOptions
{
    BaseUrl = "https://prtg.example.com",
    ApiToken = "your_token_here"
};

// Initialize service
var prtgService = new PrtgService(httpClient, options, logger);

// Get all devices with their groups
var devices = await prtgService.GetAllDevicesWithGroupsAsync();

// Get sensors for a specific device
var sensors = await prtgService.GetSensorsByDeviceIdAsync(device.ObjectId);
```

## Features

### ✅ Core Features

- 🔐 **API Token Authentication** - Secure PRTG API v1 authentication
- 📡 **Device Management** - Fetch devices and device groups
- 🔍 **Sensor Queries** - Retrieve and filter sensors
- 🧠 **Sensor Classification** - Intelligent sensor categorization
- 🎨 **Data Formatting** - Built-in formatters for display
- 🚦 **Pagination Handling** - Automatic pagination and throttling
- 📝 **ILogger Integration** - Standard .NET logging support
- 🪶 **Minimal Dependencies** - Lightweight and focused

### API Coverage

The SDK provides access to:
- **Devices**: Retrieve all devices with group information
- **Sensors**: Query sensors by device
- **Groups**: Device and sensor group hierarchies
- **Status**: Sensor states and health information
- **Metadata**: Device and sensor properties

## Configuration

### appsettings.json

```json
{
  "PRTG": {
    "BaseUrl": "https://prtg.example.com",
    "ApiToken": "your_token_here"
  }
}
```

### Dependency Injection Setup

```csharp
// Configure services
builder.Services.Configure<PrtgOptions>(
    builder.Configuration.GetSection("PRTG")
);

builder.Services.AddHttpClient<PrtgService>();

// Validate configuration
var prtgOptions = new PrtgOptions();
builder.Configuration.GetSection("PRTG").Bind(prtgOptions);
prtgOptions.Validate(); // Throws if invalid
```

## Security & Authentication

### API Token Best Practices

This SDK uses **PRTG API v1** with token-based authentication:

- ✅ **Dedicated User**: Use a read-only PRTG account
- 🔐 **HTTPS Required**: Ensure your PRTG server uses HTTPS
- 🚫 **Token Redaction**: SDK automatically redacts tokens in debug logs
- ⏱️ **Timeout Protection**: HTTP requests have configurable timeouts
- 🔒 **Minimal Permissions**: Use least-privilege API accounts

### Authentication Flow

```csharp
// Token is passed in query string (PRTG API v1)
// SDK handles token injection automatically
var devices = await prtgService.GetAllDevicesWithGroupsAsync();
```

**Note**: For session-based auth with bearer tokens (API v2), use a different integration. This SDK is optimized for unattended, background service use.

## Advanced Features

### Sensor Classification

The SDK includes intelligent sensor classification:

```csharp
var sensors = await prtgService.GetSensorsByDeviceIdAsync(deviceId);

// Classify sensors by type
var classified = sensors.GroupBy(s => s.SensorType);

foreach (var group in classified)
{
    Console.WriteLine($"Type: {group.Key}");
    Console.WriteLine($"Count: {group.Count()}");
}
```

### Data Formatting

Built-in formatters for display:

```csharp
// Format sensor values for display
var formattedValue = sensorFormatter.FormatValue(sensor);

// Sanitize for logging (redacts sensitive data)
var sanitized = sensor.SanitizeForLog();
```

### Pagination Handling

The SDK automatically handles PRTG's pagination:

```csharp
// Automatically handles pagination internally
var allDevices = await prtgService.GetAllDevicesWithGroupsAsync();

// SDK manages page size and continuation tokens
```

## Logging

### ILogger Integration

All operations use `ILogger<T>` for comprehensive logging:

**Debug Level**:
- API calls with sanitized URLs
- Pagination progress
- Record counts
- Operation timing

**Warning Level**:
- Non-success HTTP responses
- API errors
- Timeout warnings

### Log Sanitization

```csharp
// Automatically sanitizes sensitive data
logger.LogDebug("Sensor data: {Sensor}", sensor.SanitizeForLog());

// Redacts:
// - API tokens
// - Diagnostic messages
// - Internal status fields
```

## Use Cases

### Monitoring Dashboards
- Build custom PRTG dashboards
- Aggregate sensor data
- Display device health status
- Real-time monitoring views

### Automated Reporting
- Generate infrastructure reports
- Track sensor trends
- Export monitoring data
- Schedule automated reports

### Integration
- Connect PRTG to other systems
- Feed data to analytics platforms
- Trigger actions based on sensor states
- Synchronize with CMDB systems

### Custom Tools
- Build specialized monitoring tools
- Create device inventory systems
- Develop alerting solutions
- Automate PRTG management

## Example Workflows

### Device Inventory

```csharp
// Get all devices with their groups
var devices = await prtgService.GetAllDevicesWithGroupsAsync();

foreach (var device in devices)
{
    Console.WriteLine($"Device: {device.Name}");
    Console.WriteLine($"Group: {device.Group}");
    Console.WriteLine($"Status: {device.Status}");
    
    // Get sensors for this device
    var sensors = await prtgService.GetSensorsByDeviceIdAsync(device.ObjectId);
    Console.WriteLine($"Sensors: {sensors.Count}");
}
```

### Sensor Health Check

```csharp
// Get all sensors for a device
var sensors = await prtgService.GetSensorsByDeviceIdAsync(deviceId);

// Filter by status
var downSensors = sensors.Where(s => s.Status == "Down");
var warningSensors = sensors.Where(s => s.Status == "Warning");

Console.WriteLine($"Down: {downSensors.Count()}");
Console.WriteLine($"Warning: {warningSensors.Count()}");
```

### Custom Dashboard Data

```csharp
// Build dashboard data structure
var dashboardData = new
{
    TotalDevices = devices.Count,
    TotalSensors = devices.Sum(d => d.SensorCount),
    HealthyDevices = devices.Count(d => d.Status == "Up"),
    DevicesNeedingAttention = devices.Count(d => d.Status != "Up")
};
```

## Requirements

- **.NET 9.0** or later
- **PRTG Network Monitor** server with API access
- **Valid API token** with read permissions

## Technical Details

### Architecture
- **Clean Service Layer**: Simple, focused API
- **POCO Models**: Serializable data models
- **HttpClient**: Standard .NET HTTP patterns
- **Async/Await**: Modern asynchronous operations
- **DI-Ready**: Works with dependency injection

### Performance
- Efficient pagination handling
- Automatic throttling support
- Timeout protection
- Minimal memory footprint

### Dependencies
- Minimal external dependencies
- Built on .NET 9 BCL
- Standard `ILogger<T>` for logging
- HttpClient for API communication

## Project Structure

```
ZentrixLabs.PrtgSdk/
├── Models/           # Data models for devices, sensors
├── Services/         # PrtgService and API layer
├── Options/          # Configuration options
├── Classification/   # Sensor classification logic
├── Formatting/       # Data formatters
└── *.csproj          # Project file
```

## Roadmap

Future enhancements planned:
- 🔔 **Notification Management**: Create and manage notifications
- 📊 **Historical Data**: Query historical sensor data
- 🎯 **Advanced Filtering**: Complex query filters
- ✏️ **Write Operations**: Create and modify sensors
- 🔄 **Webhook Support**: Webhook integration
- 🚨 **Alert Management**: Alert configuration and queries

## Contributing

Pull requests are welcome!

To contribute:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

### Development Guidelines
- Maintain clarity and reliability
- Keep dependencies minimal
- Add comprehensive logging
- Follow existing patterns
- Test all changes

## Security Considerations

### Token Security
- Store tokens in secure configuration
- Never commit tokens to source control
- Use environment variables or Azure Key Vault
- Rotate tokens regularly

### HTTPS Requirement
- Always use HTTPS for PRTG connections
- Validate SSL certificates
- Avoid token transmission over HTTP

### Logging Security
- SDK automatically redacts tokens from logs
- Use `.SanitizeForLog()` for sensitive data
- Configure appropriate log levels
- Protect log files from unauthorized access

## Troubleshooting

### Common Issues

**Authentication Failures**
- Verify API token is valid
- Check token permissions
- Ensure HTTPS is configured
- Validate BaseUrl format

**No Data Returned**
- Confirm devices/sensors exist in PRTG
- Check API token read permissions
- Verify network connectivity
- Review PRTG API logs

**Timeout Errors**
- Increase timeout configuration
- Check PRTG server performance
- Verify network latency
- Consider pagination size

## Links

- 📦 [NuGet Package](https://www.nuget.org/packages/ZentrixLabs.PrtgSdk)
- 💻 [Source Code](https://github.com/ZentrixLabs/ZentrixLabs.PrtgSdk)
- 📚 [PRTG API Documentation](https://www.paessler.com/manuals/prtg/api)

## Acknowledgments

Thanks to the PRTG community for their support and the comprehensive API documentation that made this SDK possible.

## License

Licensed under the [MIT License](https://github.com/ZentrixLabs/ZentrixLabs.PrtgSdk/blob/main/LICENSE).

Free to use, modify, and distribute - including in commercial products - with attribution.

---

**Available on NuGet** | **Open Source** | **MIT Licensed**

*The SDK continues to evolve with new features and endpoints. Contributions welcome!*

