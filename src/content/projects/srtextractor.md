---
title: "SrtExtractor"
short: "Extract and convert subtitles from MKV/MP4 files with intelligent OCR correction"
status: "active"
category: "media"
repo: "https://github.com/ZentrixLabs/SrtExtractor"
heroImage: "/projects/SrtExtractor.png"
tags:
  - Windows
  - C#
  - .NET
  - WPF
  - Media
order: 10
published: true
---

![Release](https://img.shields.io/github/v/release/ZentrixLabs/SrtExtractor)
![License](https://img.shields.io/github/license/ZentrixLabs/SrtExtractor)
![Last Commit](https://img.shields.io/github/last-commit/ZentrixLabs/SrtExtractor)

## Overview

SrtExtractor is a powerful Windows application that extracts and converts subtitles from video files (MKV and MP4) into SRT format. Built with .NET 9 and WPF, it provides an intuitive interface for both single-file and batch processing operations.

### 🆕 What's New in v2.5.1

**Architecture Refactoring & Code Quality:**
- 🏗️ **Major Code Restructuring** - Eliminated God Object anti-pattern from MainViewModel
- 📉 **46% Code Reduction** - MainViewModel reduced from 2,190 to 1,172 lines
- 🎯 **Coordinator Pattern** - Introduced 5 focused coordinators for better separation of concerns
- ✨ **Better Maintainability** - Each coordinator has a single, clear responsibility
- 🧪 **Improved Testability** - Coordinators can be unit tested independently
- 📚 **Enhanced Readability** - No file exceeds 600 lines, easier to understand
- 🔧 **Zero Breaking Changes** - Fully backward compatible, all features preserved

**What This Means for You:**
- Same powerful features, better code architecture
- Foundation for faster future development
- More reliable and maintainable codebase
- Easier to extend with new features

### Key Features

- 🎬 **Multi-Format Support**: Extract subtitles from both MKV and MP4 files
- 🔄 **OCR Conversion**: Convert image-based subtitles (HDMV PGS, VobSub) to text
- 🧠 **Smart Correction**: Intelligent multi-pass OCR correction system
- 📦 **Batch Processing**: Process multiple files or entire folders at once
- ⚡ **Fast & Efficient**: Built on .NET 9 for optimal performance
- 🎯 **Smart Track Selection**: Automatically recommends the best subtitle track
- 🔧 **Auto-Detection**: Finds and configures external tools automatically

## Quick Start

### Installation

1. Download the latest installer from the [Releases page](https://github.com/ZentrixLabs/SrtExtractor/releases)
2. Run `SrtExtractorSetup.exe`
3. External tools (MKVToolNix, FFmpeg) are auto-detected or installed

### Basic Workflow

1. **Load Video**: Click "Select File" to choose your MKV or MP4 file
2. **Choose Track**: Select the subtitle track (or use the recommended one)
3. **Configure**: Set your preferred language and output options
4. **Extract**: Click "Extract" to create your SRT file

## Smart Features

### Intelligent Track Recommendation

SrtExtractor automatically analyzes available subtitle tracks and recommends the best option based on:
- **Format Priority**: Prefers SubRip/SRT over image-based formats
- **Language Match**: Considers your preferred language setting
- **Forced/CC Status**: Respects your subtitle preference settings
- **Visual Indicators**: Shows 🌟 for recommended tracks in the UI

### Multi-Pass OCR Correction

The advanced correction system ensures professional-quality subtitles, powered by **[ZentrixLabs.OcrCorrection](https://www.nuget.org/packages/ZentrixLabs.OcrCorrection)** - our comprehensive OCR error correction library with **~841 professionally-tested patterns**.

#### Correction Modes
- **Quick Mode** (1 pass): Fast processing for obvious errors
- **Standard Mode** (3 passes): Recommended balance of speed and quality
- **Thorough Mode** (5 passes): Maximum quality, no stone unturned

#### Smart Convergence
Automatically stops when no more corrections are found, saving time while ensuring quality.

#### What It Fixes
- **Extra Spaces**: `T he` → `The`, `sh it` → `shit`
- **Missing Spaces**: `Yougotanybiscuits` → `You got any biscuits`
- **Character Substitutions**: `RipIey` → `Ripley`, `HeIIo` → `Hello` (capital I ↔ lowercase l)
- **Pipe Character Issues**: `| think` → `I think`, `| am` → `I am` (~668 patterns)
- **Apostrophe Issues**: `you)re` → `you're`, `dont` → `don't` (~42 patterns)
- **Number Confusion**: `I 00` → `100`, `$I O` → `$10` (~20 patterns)
- **Spacing Errors**: `th e` → `the`, `confus i on` → `confusion` (~287 patterns)

### Real-World Results
- **Average**: 1,000+ corrections per SRT file
- **Large Collections**: 80,000+ total corrections across batch operations
- **Multi-Pass Benefits**: Each pass finds 5–15% additional corrections
- **Observed Success Rate**: ~99% on our internal test set of 10,000+ subtitles
- **Low False Positives**: Patterns designed to minimize changes to valid words

## Batch Processing

### Batch Extraction

Process multiple video files at once:

1. **Enable Batch Mode**: Toggle the batch processing switch
2. **Add Files**: Drag & drop or use "Add Files" button
3. **Queue Management**: Reorder, remove, or clear the queue
4. **Process All**: Click "Process Batch" to extract from all files
5. **Monitor Progress**: Real-time progress tracking with file status

### Batch SRT Correction

Clean up existing SRT files in bulk:

1. **Select Folder**: Choose a directory containing SRT files
2. **Scan Files**: Discover all SRT files (optionally include subfolders)
3. **Configure**: Choose correction mode and backup options
4. **Process**: Apply OCR corrections to all files at once
5. **Review**: See correction counts and detailed statistics

**Example Results**: 79 files processed with 81,000+ corrections in minutes!

## Bundled Tools

All tools are included in the SrtExtractor release - no installation, downloads, or internet connection required!

### Tesseract OCR
- **Purpose**: High-quality OCR for image-based (PGS) subtitles
- **Included**: `tesseract.exe` + 51 DLLs (~160 MB)
- **Language Data**: English training data (`eng.traineddata`) included
- **License**: Apache 2.0
- **Quality**: High accuracy on clear subtitle images in our tests

### MKVToolNix
- **Purpose**: MKV file analysis and subtitle extraction
- **Included**: `mkvmerge.exe`, `mkvextract.exe` + DLLs (~37 MB)
- **License**: GPL-2.0
- **Version**: Latest stable release bundled

### FFmpeg
- **Purpose**: MP4 file processing and subtitle extraction
- **Included**: `ffmpeg.exe`, `ffprobe.exe` (~334 MB)
- **License**: GPL
- **Version**: Latest stable release bundled

**Total Size**: ~530 MB (fully portable, zero dependencies)

## User Interface

### Modern Design
- Clean, intuitive WPF interface
- Real-time progress indicators
- Visual tool status indicators
- Network file detection with time estimates
- Drag & drop support

### Dedicated Windows
- **Main Window**: Single-file extraction interface
- **Batch Queue Panel**: Multi-file processing management
- **Batch SRT Correction**: Bulk SRT file cleanup
- **About Window**: Credits and version information

## File Naming Pattern

Customize output filenames with flexible patterns:

**Default Pattern**: `{basename}.{lang}{forced}{cc}.srt`

**Variables**:
- `{basename}` - Original video filename (without extension)
- `{lang}` - Subtitle language code
- `{forced}` - ".forced" if it's a forced subtitle
- `{cc}` - ".cc" if it's a closed caption

**Examples**:
- `Movie.eng.forced.srt`
- `Show.eng.cc.srt`

## Settings & Configuration

### Subtitle Preferences
- Choose between forced subtitles or closed captions
- Set OCR language (default: English)
- Customize filename patterns

### Correction Settings
- Enable/disable multi-pass correction
- Select correction mode (Quick/Standard/Thorough)
- Configure smart convergence
- Set maximum correction passes

## Technical Details

### Architecture

Built with modern .NET 9 and WPF, SrtExtractor follows the MVVM pattern with clean separation of concerns:

- **Models**: Data structures for tracks, settings, and tool status
- **ViewModels**: UI coordination, track selection, and settings management
- **Views**: XAML-based user interface with modern design
- **Coordinators** (NEW in v2.5.0): Focused business logic handlers
  - **ExtractionCoordinator**: Extraction strategies and OCR correction
  - **BatchCoordinator**: Batch queue management and processing
  - **FileCoordinator**: File picking, recent files, network detection
  - **ToolCoordinator**: Tool detection and path management
  - **CleanupCoordinator**: Temporary file cleanup operations
- **Services**: External tool integration and file operations
- **State**: Observable state management for data binding
- **Recommendation Engine**: Intelligent track selection prioritizing SubRip/SRT over HDMV PGS

### Logging
Comprehensive logging system:
- **UI Log**: Real-time display in application
- **File Log**: Rolling daily logs in `C:\ProgramData\ZentrixLabs\SrtExtractor\Logs\`
- **Format**: `srt_YYYYMMDD.txt`
- **Transparency**: Track recommendation decisions are logged

## Troubleshooting

### Common Issues

1. **Tools Not Found**: Use "Re-detect Tools" button or check tool installation
2. **Extraction Fails**: Verify the selected track is a supported format
3. **OCR Issues**: Ensure Tesseract is properly bundled and available
4. **Batch Mode Not Working**: Switch to the Batch tab and add files to the queue via drag & drop
5. **Network Files Slow**: Files on network drives will take longer - this is normal
6. **Temporary Files Left Behind**: Use the "🧹 Cleanup Temp Files" button if needed
7. **Cancellation Issues**: If processes don't stop, restart the application
8. **Batch SRT Correction Shows "None Found"**: Ensure you've selected a folder and clicked "Scan for SRT Files"
9. **SRT Files Not Updating**: Check that files aren't read-only or locked by another application
10. **Wrong Track Recommended**: Check the log for recommendation decisions; you can manually select a different track

### Log Files

Check the log files in `C:\ProgramData\ZentrixLabs\SrtExtractor\Logs\` for detailed error information.

## Contributing

Contributions are welcome! Please submit issues and pull requests on [GitHub](https://github.com/ZentrixLabs/SrtExtractor).

## License

Licensed under the [MIT License](https://github.com/ZentrixLabs/SrtExtractor/blob/master/LICENSE.txt).

## Acknowledgments

- **[ZentrixLabs.OcrCorrection](https://www.nuget.org/packages/ZentrixLabs.OcrCorrection)** - Advanced OCR error correction engine
- **MKVToolNix** - Matroska tools for video container operations
- **Subtitle Edit** - BluRay SUP parsing library for image-based subtitle conversion
- **Tesseract OCR** - High-quality optical character recognition engine
- **FFmpeg** - Complete multimedia framework for MP4 processing

---

**Developed by ZentrixLabs** - Making video processing simple and efficient.

🔗 [Project Repository](https://github.com/ZentrixLabs/SrtExtractor)

