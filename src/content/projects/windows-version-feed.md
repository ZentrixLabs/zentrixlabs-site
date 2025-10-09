---
title: "Windows Version Feed"
short: "JSON feed for Windows OS build information and CVE-to-KB mappings"
status: "active"
category: "enterprise"
repo: "https://github.com/ZentrixLabs/windows-version-feed"
tags:
  - Windows
  - PowerShell
  - Security
  - CVE
order: 30
published: true
---

![License](https://img.shields.io/github/license/ZentrixLabs/windows-version-feed)
![Last Commit](https://img.shields.io/github/last-commit/ZentrixLabs/windows-version-feed)

## Purpose

This repository is a JSON feed that provides up-to-date Windows OS build information and CVE mappings, making it easy to track Microsoft's patching cycle and vulnerability management.

### What It Does

This project collects and organizes Microsoft's monthly CVRF (Common Vulnerability Reporting Framework) data and extracts:

- **Windows Versions:** Dynamic mapping of Windows Server, Windows 10, and Windows 11 product names to their current build numbers and latest KB fixes
- **CVE Mappings:** Comprehensive mapping of CVEs to relevant KB fixes, product names, and builds

## Key Files

### Current Data (Always Up-to-Date)
- **windows-versions-current.json** — Latest OS build information including build number, latest KB, and release date
- **CVE_KB_Mapping_current.json** — Latest CVE-to-KB mappings for Windows systems

### Historical Archives
- **windows-versions.json** — Monthly snapshots of Windows version data
- **CVE_KB_Mapping_YYYY-MMM.json** — Monthly snapshots of CVE-to-KB mappings

## Use Cases

These JSON files can be integrated into:

- 🔍 Automated vulnerability scanning workflows
- 📊 Security dashboards and monitoring systems
- ✅ Patch compliance validation tools
- 🛡️ Vulnerability management systems
- 📈 Tracking Microsoft's patching cycle

### Example Use Cases

1. **Validate Patch Levels:** Check if your Windows systems are running the latest builds
2. **Correlate CVEs:** Map specific vulnerabilities to Windows builds and KB articles
3. **Automated Reporting:** Generate patch compliance reports
4. **Dashboard Integration:** Display current Windows version status

## Automation

This repository uses **GitHub Actions** to keep data fresh:

- **Schedule:** Every Wednesday at 00:00 UTC
- **Manual Trigger:** On push to `main` when `generate_os_cve_data.ps1` or `kb_cve_data.csv` changes
- **Workflow:** `.github/workflows/update-windows-versions.yml`

The automation ensures you always have access to the latest Microsoft security data without manual intervention.

## Getting Started

### Quick Start

Simply reference the JSON files directly from GitHub:

```powershell
# Get latest Windows versions
$versions = Invoke-RestMethod -Uri "https://raw.githubusercontent.com/ZentrixLabs/windows-version-feed/main/windows-versions-current.json"

# Get latest CVE mappings
$cveMappings = Invoke-RestMethod -Uri "https://raw.githubusercontent.com/ZentrixLabs/windows-version-feed/main/CVE_KB_Mapping_current.json"
```

### Integration Example

```powershell
# Check if a system is up to date
$currentBuild = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion").CurrentBuild
$latestBuild = $versions.Products | Where-Object { $_.Name -like "*Windows 11*" } | Select-Object -First 1

if ($currentBuild -lt $latestBuild.Build) {
    Write-Host "System needs updating! Current: $currentBuild, Latest: $($latestBuild.Build)"
}
```

## Data Structure

### Windows Versions JSON
```json
{
  "Products": [
    {
      "Name": "Windows 11 Version 23H2",
      "Build": "22631",
      "LatestKB": "KB5035853",
      "ReleaseDate": "2024-03-12"
    }
  ]
}
```

### CVE Mapping JSON
```json
{
  "CVE-2024-XXXXX": {
    "KB": "KB5035853",
    "Products": ["Windows 11", "Windows Server 2022"],
    "Severity": "Critical"
  }
}
```

## Contributing

This is an automated data collection project, but contributions are welcome for:

- Improvements to the PowerShell data collection script
- Enhanced data formatting
- Additional automation features
- Bug fixes

## License

Licensed under the [MIT License](https://github.com/ZentrixLabs/windows-version-feed/blob/main/LICENSE).

## Maintainers

Mike @ ZentrixLabs

---

**Note:** For the most current data, always use `windows-versions-current.json` and `CVE_KB_Mapping_current.json`. Historical files are provided for trend analysis and auditing purposes.

