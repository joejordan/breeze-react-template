# Breeze React Starter Template

A simple and fast frontend starter template with delicious defaults.

## Tech Included

- [Vite (v7)](https://vitejs.dev/) - Lightning fast build tool for modern web dev.
- [React (v19)](https://reactjs.org/) - Everybody's favorite frontend library.
- [Tanstack Router](https://tanstack.com/router) - Type-safe router with incredible features.
- [Tanstack Query](https://tanstack.com/query) - Powerful data fetching and caching.
- [Tailwind (v4)](https://tailwindcss.com/) - Everybody's favorite CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components.
- [ESLint](https://https://eslint.org/) - Modern flat config and best practices to make you better.
- [pnpm](https://pnpm.io/) - npm _but better._

## Getting Started

- Press the "**Use this template**" button at the top of this repository's GitHub page.
- Run `pnpm install` (get pnpm: https://pnpm.io/installation).
- `pnpm start` for development.
- Use `pnpm test` to run tests.
- `pnpm build` for production builds.
- `pnpm bump:[patch|minor|major]` for automatic version bumps with tagging.

_Note: You can install `pnpm` via `homebrew` on macOS: `brew install pnpm`._


## Authentication

Auth is handled through an unopinionated hook that can be configured for any provider. The `useAuthState` hook in `src/auth/protected-route/index.tsx` currently returns mock data - replace it with your chosen auth provider:

- **Clerk**: Import `useAuth` from `@clerk/clerk-react` and use `{ isSignedIn, isLoaded }`
- **Auth0**: Import `useUser` from `@auth0/auth0-react` and use `{ user, isLoading }`
- **Firebase**: Import `useAuthState` from `reactfire` or similar

To simulate authentication for testing, change the return value in `useAuthState` - set `isAuthenticated: false` to test redirects.

Use the `ProtectedRoute` component to guard routes. It automatically redirects unauthenticated users to `/login`.

## Credits

This template was originally based on [vite-ts-react-tailwind-template](https://github.com/cpojer/vite-ts-react-tailwind-template). This fork has been updated with my own personal preferences and a better
eslint experience (thanks to [Antfu's ESLint Config](https://github.com/antfu/eslint-config)).
