# FE_ChatApplication

This repository contains the front-end of a social chat application built with React and Vite. It provides core UI, client-side logic, and API clients to power chat, feed, profiles, and friend features.

**Goals:** a lightweight, component-driven React app with real-time chat support and a modular structure ready for extension.

**Quick start**

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

Top-level layout of the repository (key folders and files):

- **src/**: application source code
	- **api/**: API client modules (e.g., `authApi.js`, `conversationApi.js`, `userApi.js`)
	- **components/**: reusable UI components, grouped by feature (chat, feed, profile, users)
	- **contexts/**: React context providers (`AuthProvider`, `SignalRProvider`, `ToastProvider`)
	- **hooks/**: custom hooks (`useAuth`, `useChat`, `useToast`)
	- **pages/**: route pages organized by client/admin and feature areas (auth, chat, home, friends)
	- **realtime/**: SignalR hub client (`chatHub.js`) used for live messaging
	- **utils/**: utility helpers (query builders, datetime, reactions)
- **public/**: static assets and images
- **index.html**, **package.json**, **vite.config.js**, **eslint.config.js**: build and tooling config

See the `src/components` tree for feature-level organization: `chat/`, `feed/`, `profile/`, `users/`.

## Key functionalities

- **Real-time Chat**: one-to-one and group messaging using SignalR. Components: chat header, conversation list, message input, message bubbles.
- **Feed / Posts**: create posts with text and media, comments, reactions, and a composer UI.
- **Profiles & Friends**: view user profiles, friend lists, send/accept/reject requests.
- **Authentication**: sign-in and sign-up flows with client-side auth context and API integration.
- **Notifications & Toasts**: global toast provider for in-app notifications and feedback.

## Development notes

- Components are primarily functional React components with hooks and context.
- API modules in `src/api` wrap fetch/axios calls and centralize HTTP handling.
- SignalR client lives in `src/realtime/chatHub.js` and is provided via `SignalRProvider` for components to consume.

## Future updates / Roadmap

- Add end-to-end and unit tests (Jest + React Testing Library)
- CI/CD pipeline with linting, tests, and preview deployments
- Improve accessibility (a11y) and keyboard navigation across components
- Add i18n support and localisation
- Mobile-responsive improvements and a lightweight PWA shell
- Performance tuning: code-splitting, lazy-loading, image optimization
- Security hardening: stricter input validation and content sanitization on the client

## Contributing

Feel free to open issues or PRs. For code style, follow the existing ESLint setup and project conventions.
