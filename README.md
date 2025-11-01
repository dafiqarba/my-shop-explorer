# Shop Explorer

A simple and modern e-commerce product explorer built with React 19, TypeScript, React Router 7, and TanStack Query.

## Features

- Browse products with search and category filtering
- Responsive design
- Optimistic UI updates for cart operations
- 💾 Persistent cart state across sessions
- 🔄 Efficient data fetching with TanStack Query
- 🎨 Clean UI with Tailwind CSS

## Tech Stack

- **React 19** - Latest React with improved features
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing
- **TanStack Query v5** - Server state management with optimistic updates
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:dafiqarba/my-shop-explorer.git
cd shop-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Copy the env variable, and fill the variable with: https://api.escuelajs.co/api/v1

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── commons/       # Reusable UI components
│   └── layout/        # Layout components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── context/           # React Context
├── utils/             # Utility functions
├── types/             # TypeScript types
├── config/            # Configuration
├── App.tsx            # Root app component
├── main.tsx           # Entry point
└── styles/            # Global styles
```

## Implementation Decisions

### State Management

- **TanStack Query**: Used for fetching data (products, categories) with caching and automatic refetching
- **React Context**: Used for cart state management, providing a simple global state solution
- **localStorage**: Cart persistence to maintain state across browser sessions

### Optimistic Updates

The "Add to Cart" feature uses optimistic updates:

1. UI updates immediately when user clicks "Add to Cart"
2. API call happens in the background
3. If API fails (5% simulated failure rate), the change is rolled back and user is notified

### Routing

React Router 7 is used with nested routes:

- `/` - Product list page
- `/product/:id` - Product detail page
- `/cart` - Shopping cart page

### API Integration

Using the Platzi Fake Store API (https://api.escuelajs.co/api/v1):

- Products List
- Individual product details
- Categories for filtering

### Design Approach

- Clean, minimal interface with generous white space
- Smooth transitions and hover effects
- Card-based layouts
- Subtle shadows and rounded corners

### Error Handling

- API errors are caught and displayed to users
- Image URLs are validated (API sometimes returns malformed URLs)
- Loading states for better UX
- Rollback mechanism for failed cart operations

## API Limitations

The Platzi Fake Store API occasionally returns:

- Malformed image URLs (handled with fallback placeholders)
- Inconsistent data (validated on the client side)
