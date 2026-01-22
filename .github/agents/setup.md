# Copilot Agent Setup

This file configures the environment for GitHub Copilot Coding Agent when working in this repository.

## Environment Setup

When the Copilot Coding Agent starts working in this repository, it should:

1. **Verify Node.js Installation**
   - Check that Node.js is available
   - Confirm npm is available for package management

2. **Install Dependencies**
   - Run `npm install` to install all project dependencies
   - This ensures all required packages are available

3. **Understand Available Commands**
   - `npm run dev` - Start the development server (port 5173 by default)
   - `npm run build` - Build the application for production
   - `npm run lint` - Check code for linting errors
   - `npm run lint:fix` - Automatically fix linting errors
   - `npm run preview` - Preview the production build

4. **Development Workflow**
   - Make code changes in the `src/` directory
   - The dev server will hot-reload changes automatically
   - Run linting before committing changes
   - Build and preview to test production builds

## Project Context

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Router**: TanStack Router
- **Data Fetching**: TanStack Query
- **Linting**: ESLint with TypeScript support
- **Styling**: CSS modules or inline styles

## Common Tasks

### Adding a New Route
1. Create a new route file in `src/routes/`
2. Use TanStack Router conventions
3. The router will automatically pick up the new route

### Adding Components
1. Create components in `src/components/`
2. Use TypeScript for type safety
3. Follow React 19 best practices

### API Integration
1. Use TanStack Query for data fetching
2. Consider using MSW for mocking during development
3. Define types for API responses

## Testing

Currently, there are no automated tests configured. When adding tests:
- Consider using Vitest (Vite's test runner)
- Add test scripts to `package.json`
- Follow React Testing Library conventions
