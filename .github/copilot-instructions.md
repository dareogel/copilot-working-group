# GitHub Copilot Working Group Workshops

This repository contains hands-on workshops for learning and practicing GitHub Copilot features, including Copilot Chat in GitHub UI, Copilot in VSCode, and custom agents.

## Project Structure

This is a React application built with:
- **React 19** with TypeScript
- **Vite** as the build tool and dev server
- **TanStack Router** for routing
- **TanStack Query** for data fetching
- **ESLint** for code linting
- **Mock Service Worker (MSW)** for API mocking

## Development Commands

### Running the Application

To start the development server:
```bash
npm run dev
```
This starts a local development server with hot module replacement (HMR).

### Building the Application

To build the application for production:
```bash
npm run build
```
This compiles TypeScript and builds the application using Vite.

### Linting

To check code for linting errors:
```bash
npm run lint
```

To automatically fix linting errors:
```bash
npm run lint:fix
```

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Getting Started

1. Fork this repository to your own account
2. Enable workflows in your forked repo (Actions tab)
3. Enable Issues in repository settings (Settings → General → Features)
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Code Style Guidelines

- Use TypeScript for all code
- Follow ESLint configuration
- Use React 19 features and hooks
- Use TanStack Router for navigation
- Use TanStack Query for data fetching
