# Roma1990 - Retro Flip Clock Pomodoro Timer

A beautiful Pomodoro timer styled after vintage TWEMCO flip clocks. Features a matte coral/orange body with "Roma1990" branding, smooth flip card countdown animation, and simple session tracking.

![Roma1990 Timer](src-tauri/icons/icon.png)

## Features

- Vintage flip clock design with smooth animations
- Adjustable timer duration (5-60 minutes)
- Session counter that persists daily
- Completion chime notification
- Clean, distraction-free interface

## Install (macOS)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/) (latest stable)
- Xcode Command Line Tools (`xcode-select --install`)

### Build & Install

```bash
# Clone the repository
git clone https://github.com/rahulsingh0890/Roma1990.git
cd Roma1990

# Install dependencies
npm install

# Build the macOS app
npm run tauri:build

# Copy to Applications
cp -r src-tauri/target/release/bundle/macos/Roma1990.app /Applications/

# Launch
open /Applications/Roma1990.app
```

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
