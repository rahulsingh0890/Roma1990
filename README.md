# Roma1990 - Retro Flip Clock Pomodoro Timer

A beautiful Pomodoro timer styled after vintage TWEMCO flip clocks. Features a matte coral/orange body with "Roma1990" branding, smooth flip card countdown animation, and simple session tracking.

![Roma1990 Timer](src-tauri/icons/icon.png)

## Features

- Vintage flip clock aesthetic with smooth animations
- Adjustable timer duration (5-60 minutes)
- Session counter that persists daily
- Completion chime notification
- Clean, distraction-free interface

## Download & Install (macOS)

### Option 1: Download the DMG (Recommended)

1. Go to the [Releases](../../releases) page
2. Download `Roma1990_x.x.x_aarch64.dmg` (for Apple Silicon) or `Roma1990_x.x.x_x64.dmg` (for Intel)
3. Open the DMG file
4. Drag `Roma1990.app` to your Applications folder
5. Double-click to launch!

> **Note:** On first launch, macOS may show a security warning. Go to **System Preferences > Privacy & Security** and click "Open Anyway".

### Option 2: Build from Source

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/) (latest stable)
- Xcode Command Line Tools (`xcode-select --install`)

#### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/the-pomodoro.git
cd the-pomodoro

# Install dependencies
npm install

# Build the macOS app
npm run tauri:build

# The app will be at:
# src-tauri/target/release/bundle/macos/Roma1990.app
```

Copy `Roma1990.app` to your Applications folder.

## Development

### Run as Web App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run as Desktop App (Development Mode)

```bash
npm run tauri:dev
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, CSS Modules
- **Desktop:** Tauri 2.0 (Rust)
- **Audio:** Web Audio API

## Usage

1. **Set Duration:** Use the slider to set your focus time (5-60 minutes)
2. **Start Timer:** Click the green START button
3. **Focus:** Watch the beautiful flip animation count down
4. **Complete:** A chime plays when done, and your session is recorded
5. **Stop Early:** Click STOP to reset the timer at any time

## License

MIT License - feel free to use and modify!

---

Made with love and tomatoes.
