# 🚀 Boilerplate 2026

> A modern, production-ready monorepo boilerplate featuring Next.js, Expo, and Convex. Start building full-stack applications with web and mobile support in minutes.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Expo](https://img.shields.io/badge/Expo-55-000020.svg)](https://expo.dev/)
[![Convex](https://img.shields.io/badge/Convex-1.31-purple.svg)](https://convex.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange.svg)](https://pnpm.io/)

## ✨ Features

- 🎯 **Full-Stack Ready** - Next.js web app + Expo mobile app + Convex backend
- 🎨 **Shared Design System** - Unified theme and components across web and mobile
- ⚡ **Type-Safe** - End-to-end TypeScript with shared types
- 🔥 **Modern Stack** - React 19, Next.js 16, Expo Router, Tailwind CSS
- 📦 **Monorepo** - pnpm workspaces for efficient dependency management
- 🎭 **UI Components** - Pre-built shadcn/ui components for web
- 📱 **Native Components** - Custom native components for mobile
- 🚀 **Zero Config** - Pre-configured with best practices
- 🔐 **Production Ready** - ESLint, TypeScript, and optimized builds

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **pnpm** 8.0 or higher ([Install guide](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))

For mobile development:

- **Expo CLI** (optional, included in dependencies)
- **iOS Simulator** (macOS only) or **Android Studio** (for Android)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/boilerplate-2026.git
cd boilerplate-2026
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Add your other environment variables here
```

### 4. Set Up Convex

If you're using Convex, initialize it:

```bash
pnpm exec convex dev
```

Follow the prompts to create a new Convex project or link to an existing one.

### 5. Start Development

Choose one of the following options:

**Option A: Run Everything**

```bash
pnpm dev:all
```

This starts the website, mobile app, and Convex backend simultaneously.

**Option B: Run Website Only**

```bash
pnpm dev:website
```

Starts the Next.js website and Convex backend.

**Option C: Run Mobile (iOS)**

```bash
pnpm dev:mobile:ios
```

Starts the Expo mobile app (iOS) and Convex backend.

**Option D: Run Mobile (Android)**

```bash
pnpm dev:mobile:android
```

Starts the Expo mobile app (Android) and Convex backend.

## 📱 Mobile Development

### Running on iOS Simulator (macOS)

From the root directory:

```bash
pnpm dev:mobile:ios
```

This starts the mobile app (iOS) and Convex backend together.

To run only the mobile app without Convex:

```bash
pnpm dev:mobile-only:ios
```

### Running on Android Emulator

From the root directory:

```bash
pnpm dev:mobile:android
```

This starts the mobile app (Android) and Convex backend together.

To run only the mobile app without Convex:

```bash
pnpm dev:mobile-only:android
```

### Running on Physical Device

1. Install the Expo Go app on your device
2. Start the development server from the root:
   ```bash
   pnpm dev:mobile-only:ios
   # or
   pnpm dev:mobile-only:android
   ```
3. Scan the QR code with Expo Go (iOS) or the Expo app (Android)

Alternatively, you can run from the mobile directory:

```bash
cd mobile
pnpm start
```

### Running Mobile Web Version

From the mobile directory:

```bash
cd mobile
pnpm web
```

## 🌐 Web Development

The website runs on `http://lvh.me:3000` by default.

- **Development**: `http://lvh.me:3000`
- **Hot Reload**: Enabled with Turbopack
- **TypeScript**: Full type checking

## 🏗️ Project Structure

```
boilerplate-2026/
├── website/          # Next.js web application
├── mobile/           # Expo React Native application
├── shared/           # Shared code, types, and constants
├── convex/           # Convex backend functions
└── package.json      # Root workspace configuration
```

## 📦 Available Scripts

### Root Level

| Command                        | Description                       |
| ------------------------------ | --------------------------------- |
| `pnpm dev:all`                 | Start website, mobile, and Convex |
| `pnpm dev:website`             | Start website and Convex          |
| `pnpm dev:website-only`        | Start only website                |
| `pnpm dev:mobile:ios`          | Start mobile (iOS) and Convex     |
| `pnpm dev:mobile:android`      | Start mobile (Android) and Convex |
| `pnpm dev:mobile-only:ios`     | Start only mobile (iOS)           |
| `pnpm dev:mobile-only:android` | Start only mobile (Android)       |
| `pnpm dev:convex`              | Start only Convex                 |
| `pnpm build`                   | Build website for production      |

### Website (`website/`)

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

### Mobile (`mobile/`)

| Command        | Description                   |
| -------------- | ----------------------------- |
| `pnpm start`   | Start Expo development server |
| `pnpm ios`     | Run on iOS simulator          |
| `pnpm android` | Run on Android emulator       |
| `pnpm web`     | Run web version               |
| `pnpm lint`    | Run ESLint                    |

## 🎨 Styling

### Web (Next.js)

Uses Tailwind CSS with a shared theme system. Colors and design tokens are defined in `shared/constants/theme/`.

### Mobile (Expo)

Uses Uniwind (Tailwind for React Native) with the same shared theme system for consistency across platforms.

## 🔧 Configuration

### TypeScript

Each package has its own `tsconfig.json` that extends the root configuration. The shared package is configured to be imported across workspaces.

### ESLint

- Website: Next.js ESLint config
- Mobile: Expo ESLint config
- Root: Shared rules

### Environment Variables

- `.env.example` - Template for environment variables
- `.env.local` - Local development variables (not committed)

## 🚢 Deployment

### Website (Vercel)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Set the root directory to `website`
4. Add environment variables in Vercel dashboard
5. Deploy!

### Mobile (EAS Build)

1. Install EAS CLI:

   ```bash
   npm install -g eas-cli
   ```

2. Configure your project:

   ```bash
   cd mobile
   eas build:configure
   ```

3. Build for production:

   ```bash
   eas build --platform ios
   eas build --platform android
   ```

4. Submit to app stores:
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

### Convex

Convex automatically deploys when you push to your main branch. Configure deployment in your Convex dashboard.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Convex Documentation](https://docs.convex.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it in `website/package.json`:

```json
"dev": "next dev --turbopack --hostname lvh.me --port 3001"
```

### Metro Bundler Issues

Clear Metro cache:

```bash
cd mobile
pnpm start -- --reset-cache
```

### Convex Connection Issues

Make sure your `.env.local` has the correct `NEXT_PUBLIC_CONVEX_URL` and that Convex is running.

### pnpm Issues

If you encounter dependency issues:

```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Expo](https://expo.dev/) for the incredible mobile development experience
- [Convex](https://convex.dev/) for the powerful backend platform
- [Vercel](https://vercel.com/) for Next.js and hosting

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!

---

**Built with ❤️ using Next.js, Expo, and Convex**
