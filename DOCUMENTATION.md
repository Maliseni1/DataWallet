## DataWallet - Developer Documentation

This document provides an overview of the DataWallet project structure, key architectural decisions, and guidelines for development.

**1. Project Overview**

DataWallet is a Next.js 16 application designed as a carrier-agnostic mobile data wallet. It allows users to view balances, rollover data, and gift data across multiple network operators (ZedMobile, MTN, Airtel). The UI is built with React 19 and styled with Tailwind CSS v4 (Alpha).

**2. Tech Stack**

Framework: Next.js 16 (App Router)

UI Library: React 19

Styling: Tailwind CSS v4 (Alpha)

Language: TypeScript

Build System: Webpack (forced via next dev --webpack to support Tailwind v4 alpha)

Analytics: Vercel Analytics

**3. Folder Structure (src/app)**

The project follows the standard Next.js App Router structure.

layout.tsx: The root layout. It wraps the application in the Providers component (for context) and includes the Vercel Analytics script.

page.tsx: The main dashboard (Home). It contains the core wallet logic, operator switching, and the main action buttons.

globals.css: Global styles. It uses the new @theme directive from Tailwind v4 to define operator-specific color variables.

providers.tsx: A client-side wrapper that contains the ThemeContext. This manages the dark mode state and persists it to localStorage.

components/: Reusable UI components.

PaymentModal.tsx: A modal for simulating transaction flows.

TransactionDetailsModal.tsx: A modal for viewing transaction history details.

lib/: Shared logic and data.

data.ts: Contains the mock database and TypeScript interfaces for AccountData.

api/: Serverless API routes.

user/[operatorId]/route.ts: A dynamic API route that returns mock user data based on the selected operator.

**4. Key Concepts**

Dynamic Theming

The app uses a dynamic theming system that changes the color scheme based on the selected operator.

Implementation: CSS variables are defined in globals.css inside the @theme block.

Usage: Components use template literals to switch classes (e.g., bg-indigo-600 for ZedMobile, bg-yellow-500 for MTN).

Dark Mode

Dark mode is implemented manually using a React Context (ThemeContext).

It toggles a .dark class on a wrapper div in the Providers component.

It persists the user's preference to localStorage.

Components use conditional logic (e.g., darkModeEnabled ? 'bg-gray-900' : 'bg-white') to render the correct styles.

Mock Data & API

Since this is a prototype, there is no real backend database.

Data Source: src/app/lib/data.ts acts as the single source of truth.

Fetching: The frontend fetches data from the internal API route /api/user/[operatorId], which adds a simulated network delay before returning data from data.ts.

**5. Development Guidelines**

Adding a New Page

Create a new folder in src/app/ (e.g., src/app/rewards/).

Add a page.tsx file inside it.

Use the 'use client' directive if you need state or hooks.

Import useTheme from ../providers to access dark mode state.

Modifying the Theme

To change operator colors, edit the @theme block in src/app/globals.css. Tailwind v4 automatically makes these variables available as utility classes (e.g., --color-zed becomes available for background and text utilities).

Deployment

The project is configured for Vercel.

Build Command: next build (which uses the Webpack configuration from package.json).

Root Directory: Ensure Vercel is set to the directory containing package.json (e.g., datawallet).

Documentation maintained by **Chiza Labs.**