# 99techteam-code-challenge

A comprehensive code challenge solution featuring algorithmic problems, React form implementation, and code refactoring exercises.

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Problem Solutions Overview](#problem-solutions-overview)
- [Tech Stack](#tech-stack)

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 99techteam-code-challenge
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## 💻 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🧪 Running Tests

### Run Tests in Watch Mode

```bash
npm test
# or
yarn test
```

### Run Tests Once

```bash
npm run test:run
# or
yarn test:run
```

### Run Tests with UI

```bash
npm run test:ui
# or
yarn test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📝 Problem Solutions Overview

### Problem 1: Sum to N

**Location:** `src/problem1/sum.ts`

Implemented three different approaches to calculate the sum of all numbers from 1 to n:

- **Method A (Mathematical Formula):** O(1) time complexity using the formula `n * (n + 1) / 2`
- **Method B (Iterative Loop):** O(n) time complexity using a for loop
- **Method C (Recursive):** O(n) time complexity using recursion

All methods handle negative numbers by calculating the absolute sum and negating the result.

**Tests:** `src/problem1/tests.test.ts`

### Problem 2: Currency Swap Form

**Location:** `src/problem2/CurrencySwapForm.tsx`

A fully functional currency swap interface built with React and Material-UI:

**Features:**

- Real-time currency data fetching from Switcheo API
- Autocomplete dropdowns for currency selection with search functionality
- Real-time exchange rate calculation
- Swap currencies button to quickly reverse the transaction
- Form validation using react-hook-form
- Loading states and error handling
- Responsive design
- Token deduplication and filtering

**Key Technologies:**

- React Hooks (useState, useEffect, useMemo)
- React Hook Form for form management
- Material-UI components
- TypeScript for type safety

### Problem 3: Code Refactoring

**Location:** `src/problem3/refactored.tsx`

Refactored a React component with multiple improvements:

**Key Improvements:**

1. **Performance Optimization:**

   - Proper use of `useMemo` to prevent unnecessary recalculations
   - Split computations into separate memoized values
   - Removed redundant filtering operations

2. **Code Quality:**

   - Extracted blockchain priority logic into a constant object
   - Created pure, testable utility functions (`isValidBalance`, `comparePriorities`)
   - Removed anti-patterns and unnecessary complexity
   - Better variable naming and code organization

3. **Type Safety:**

   - Proper TypeScript interfaces
   - Type-safe priority lookups
   - Proper component prop typing

4. **Maintainability:**
   - Separated concerns (filtering, sorting, formatting)
   - Easy to extend blockchain priorities
   - Clear data flow

**Tests:** `src/problem3/tests.test.ts`

## 🛠 Tech Stack

- **Frontend Framework:** React 18.3
- **Build Tool:** Vite 5.3
- **Language:** TypeScript 5.9
- **UI Library:** Material-UI 5.16
- **Form Management:** React Hook Form 7.53
- **Routing:** React Router DOM 7.9
- **Testing:** Vitest 4.0 with React Testing Library
- **Linting:** ESLint

## 📁 Project Structure

```
src/
├── problem1/          # Sum to N implementations
├── problem2/          # Currency swap form
├── problem3/          # Refactored wallet page
├── pages/             # Application pages
└── test/              # Test setup
```

## 🎯 Features

- Interactive web interface to view all problem solutions
- Comprehensive test coverage
- Type-safe implementation with TypeScript
- Modern React patterns and best practices
- Responsive design with Material-UI

## 📄 License

This project is part of a code challenge assessment.
