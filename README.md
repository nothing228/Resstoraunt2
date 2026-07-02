# Savory & Co. — Premium Food Delivery

A modern, high-performance food delivery web application for a premium restaurant built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** — Functional components with Hooks
- **TypeScript** — Strict mode
- **Vite** — Build tool and dev server
- **SCSS Modules** — CSS custom properties for theming
- **React Router v6** — Client-side routing with lazy loading
- **Framer Motion** — Smooth UI animations
- **Axios** — API layer with mock data
- **React Icons** — Icon library
- **Context API + useReducer** — Global state management

## Features

### Pages
- **Home** — Hero, category navigation, today's specials, promo banner, customer reviews
- **Menu** — Full dish grid with advanced filtering, sorting, and search
- **About** — Restaurant story, chef profile, gallery, hours, contact, map
- **Cart** — Order summary, promo codes, delivery form, order placement
- **Favorites** — Saved dishes with localStorage persistence
- **404** — Not found page

### Core Functionality
- **i18n** — English, Russian, Uzbek with persistent language preference
- **Theme Toggle** — Light/Dark mode with warm food-inspired color palettes
- **Shopping Cart** — Context + useReducer, mini-cart dropdown, localStorage persistence
- **Favorites** — Heart toggle, dedicated page, localStorage persistence
- **Search & Filters** — Debounced global search, category/dietary/price filters, sorting
- **Toast Notifications** — Cart and favorites action feedback
- **Error Boundary** — Graceful error handling
- **Code Splitting** — React.lazy + Suspense for all pages

## Project Structure

```
src/
├── assets/i18n/     # Translation JSON files (en, ru, uz)
├── components/      # Reusable UI components
├── context/         # AppContext, cart & filter reducers
├── data/            # Mock dishes, restaurant info, API
├── hooks/           # useTheme, useLanguage, useCart, useFavorites, useFilters
├── pages/           # Route-level page components
├── styles/          # Global SCSS, variables, reset
├── types/           # TypeScript interfaces
└── utils/           # Filter logic, validation helpers
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Promo Codes (Demo)

| Code       | Discount        |
|------------|-----------------|
| SAVE10     | 10% off         |
| WELCOME20  | 20% off         |
| TASTY5     | $5 off          |

## Scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start development server |
| `npm run build`   | Type-check and build     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run oxlint               |
