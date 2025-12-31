/**
 * Boilerplate constants
 *
 * Example of how to structure constants in the shared package.
 * These can be imported in both web and mobile apps using:
 * import { BOILERPLATE_NAME } from "@shared/constants/boilerplate"
 */

export const BOILERPLATE_NAME = "Boilerplate 2026";

export const BOILERPLATE_DESCRIPTION =
  "A production-ready starter template for building web and mobile applications";

export const TECH_STACK = {
  WEB: "Next.js",
  MOBILE: "React Native + Expo",
  BACKEND: "Convex",
} as const;

export const TECH_STACK_ITEMS = [
  {
    name: TECH_STACK.WEB,
    description: "React framework for production with server-side rendering, static site generation, and API routes.",
    descriptionShort: "Next.js for production",
    icon: "atom", // SF Symbol name for mobile
    badge: "Frontend",
  },
  {
    name: TECH_STACK.MOBILE,
    description: "Build native mobile apps for iOS and Android using React with Expo's powerful tooling and services.",
    descriptionShort: "React Native + Expo",
    icon: "iphone", // SF Symbol name for mobile
    badge: "Mobile",
  },
  {
    name: TECH_STACK.BACKEND,
    description: "Backend as a service with real-time features, serverless functions, and built-in auth included.",
    descriptionShort: "Convex backend",
    icon: "server.rack", // SF Symbol name for mobile
    badge: "Backend",
  },
] as const;

export const SECTION_TITLES = {
  TECH_STACK: "Modern Tech Stack",
  TECH_STACK_DESCRIPTION: "Built with the best tools in the ecosystem to ensure scalability, performance, and developer experience.",
  DEVELOPER_EXPERIENCE: "Developer Experience",
  DEVELOPER_EXPERIENCE_DESCRIPTION: "Built with developer experience in mind. Type-safe environment variables, shared constants, and a modular architecture.",
  DEVELOPER_EXPERIENCE_DESCRIPTION_MOBILE: "Built with developer experience in mind. Type-safe environment variables, shared constants, and a modular architecture.",
} as const;

export const FAQS = [
  {
    title: "How do I get started?",
    description: "Run `pnpm install` in the root directory to install dependencies for both web and mobile."
  },
  {
    title: "What is the tech stack?",
    description: "We use Next.js for the website, React Native (Expo) for mobile, and Convex for the backend."
  },
  {
    title: "Is this open source?",
    description: "Yes, this boilerplate is open source and available for you to use in your projects."
  },
  {
    title: "How do I deploy?",
    description: "Deploy the website to Vercel and the mobile app to EAS (Expo Application Services)."
  }
];
