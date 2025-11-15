# CLAUDE.md - Investment Calculator Project Guide

## Project Overview

This is a **React Investment Calculator** application built with Vite, React Router, and shadcn/ui. It features a multi-page architecture with sidebar navigation, allowing users to calculate investment growth over time based on initial investment, annual contributions, expected returns, and investment duration.

**Project Name:** react-essentials-practice (package.json)
**Display Name:** React Investment Calculator
**Tech Stack:** React 18.2, Vite 4.4, React Router v7, Tailwind CSS 3.4, shadcn/ui, JavaScript (JSX)

## Codebase Structure

```
investment-calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml                      # GitHub Pages deployment workflow
├── public/
│   └── investment-calculator-logo.png      # Logo asset
├── src/
│   ├── assets/
│   │   └── investment-calculator-logo.png  # Logo asset (also in src)
│   ├── components/
│   │   ├── ui/                            # shadcn/ui components
│   │   │   ├── alert.jsx                  # Alert component
│   │   │   ├── button.jsx                 # Button component
│   │   │   ├── card.jsx                   # Card component
│   │   │   ├── input.jsx                  # Input component
│   │   │   ├── label.jsx                  # Label component
│   │   │   └── table.jsx                  # Table component
│   │   ├── Header.jsx                     # Application header with logo
│   │   ├── Sidebar.jsx                    # Navigation sidebar
│   │   ├── UserInput.jsx                  # Input form for investment parameters
│   │   └── Results.jsx                    # Results table component
│   ├── pages/
│   │   ├── Home.jsx                       # Homepage with welcome section
│   │   └── InvestmentCalculator.jsx      # Main calculator page
│   ├── lib/
│   │   └── utils.js                       # Utility functions (cn helper)
│   ├── util/
│   │   └── investment.js                  # Core calculation logic
│   ├── App.jsx                            # Main application component (router setup)
│   ├── index.jsx                          # React entry point
│   └── index.css                          # Global styles + Tailwind directives
├── index.html                             # HTML entry point
├── package.json                           # Dependencies and scripts
├── vite.config.js                         # Vite configuration (with path aliases)
├── tailwind.config.js                     # Tailwind CSS configuration
├── postcss.config.js                      # PostCSS configuration
├── components.json                        # shadcn/ui configuration
├── jsconfig.json                          # Path aliases configuration
├── SHADCN_SETUP.md                        # shadcn/ui setup documentation
├── .gitignore                             # Git ignore rules
└── README.md                              # Project readme
```

## Technology Stack

### Core Technologies
- **React 18.2.0** - UI library
- **React DOM 18.2.0** - React rendering
- **Vite 4.4.5** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing

### UI Framework & Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library built on Radix UI
  - `class-variance-authority ^0.7.1` - Component variant styling
  - `clsx ^2.1.1` - Conditional class names
  - `tailwind-merge ^3.4.0` - Merge Tailwind classes intelligently
  - `lucide-react ^0.553.0` - Icon library
  - `tailwindcss-animate ^1.0.7` - Animation utilities
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.22** - Vendor prefixes

### Development Tools
- **ESLint 8.45.0** - Code linting
- **@vitejs/plugin-react 4.0.3** - React support for Vite
- **eslint-plugin-react** - React-specific linting rules
- **eslint-plugin-react-hooks** - React Hooks linting
- **eslint-plugin-react-refresh** - React refresh support

### Build & Deployment
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static hosting (base path: `/investment-calculator/`)

## Application Architecture

### Routing Structure

The application uses **React Router v7** with a page-based architecture:

**Routes:**
- `/` - Home page (welcome screen with tool cards)
- `/investment-calculator` - Investment calculator tool

**Layout:**
- Fixed sidebar navigation (left side, 250px width)
- Main content area (responsive, margin-left: 250px)
- Responsive: Sidebar collapses to 60px on mobile (≤768px)

### Component Hierarchy

```
App (Router Setup)
├── Sidebar (Fixed navigation)
└── Routes
    ├── Home (/)
    │   └── Welcome section + tool cards
    └── InvestmentCalculator (/investment-calculator)
        ├── Header
        ├── UserInput (Card with inputs)
        ├── Alert (validation error, conditional)
        └── Results (Table, conditional)
```

## Key Components

### 1. App.jsx (Main Component)
**Location:** `/src/App.jsx`

**Responsibilities:**
- Sets up React Router with BrowserRouter
- Renders Sidebar and main content layout
- Defines routes for Home and InvestmentCalculator pages
- No state management (state moved to InvestmentCalculator page)

**Structure:**
```jsx
<Router>
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investment-calculator" element={<InvestmentCalculator />} />
      </Routes>
    </main>
  </div>
</Router>
```

### 2. Sidebar.jsx
**Location:** `/src/components/Sidebar.jsx`

**Responsibilities:**
- Provides navigation between pages
- Uses NavLink for active state styling
- Fixed position sidebar with responsive behavior

**Navigation Items:**
1. Home (🏠) - Links to `/`
2. Investment Calculator (💰) - Links to `/investment-calculator`

**Styling:**
- Fixed position (left: 0, width: 250px)
- Dark gradient background (#1e293b to #0f172a)
- Active link highlighting with blue accent
- Responsive: Text hidden on mobile, icon-only (60px width)

### 3. Home.jsx (Page)
**Location:** `/src/pages/Home.jsx`

**Responsibilities:**
- Displays welcome message and introduction
- Shows tool cards grid (currently only Investment Calculator)
- Provides navigation to calculator via Link component

**Structure:**
- Welcome section with gradient title
- Tools grid (responsive grid layout)
- Tool card with icon, title, description, and link

**Styling:**
- Centered layout with max-width: 1200px
- Gradient text for heading (blue to purple)
- Hover effects on tool cards
- Responsive grid (auto-fit columns)

### 4. InvestmentCalculator.jsx (Page)
**Location:** `/src/pages/InvestmentCalculator.jsx`

**Responsibilities:**
- Manages investment calculation state using `useState` hook
- Validates user input (duration >= 1)
- Handles input changes via `handleChange` function
- Renders Header, UserInput, Alert (on error), and Results components

**State Structure:**
```javascript
{
  initialInvestment: 10000,    // Default: $10,000
  annualInvestment: 1200,      // Default: $1,200/year
  expectedReturn: 6,           // Default: 6%
  duration: 10                 // Default: 10 years
}
```

**Key Function:**
- `handleChange(inputIdentifier, newValue)` - Updates state using computed property names, converts string to number with unary `+`

**Validation:**
- Shows destructive Alert component when duration < 1
- Uses lucide-react AlertCircle icon
- Results component only renders when `validInput === true`

### 5. Header.jsx
**Location:** `/src/components/Header.jsx`

**Responsibilities:**
- Displays application logo and title
- Imports logo from `/src/assets/investment-calculator-logo.png`
- Pure presentational component

**Structure:**
- Uses `#header` id for styling
- Contains image and h1 elements

### 6. UserInput.jsx
**Location:** `/src/components/UserInput.jsx`

**Responsibilities:**
- Renders input form using shadcn/ui Card, Input, and Label components
- Accepts props: `userInput` (state object) and `onChange` (handler function)
- Provides controlled inputs for all investment parameters

**Input Fields:**
1. Initial Investment ($)
2. Annual Investment ($)
3. Expected Return (%)
4. Duration (Years)

**Layout:**
- Card component with header (title + description)
- Grid layout (2 columns on medium+ screens, 1 column on mobile)
- All inputs use Label + Input components from shadcn/ui
- Proper label associations with htmlFor attributes

**Accessibility:**
- Labels properly associated with inputs
- Required attribute on all inputs
- Type="number" for numeric validation

### 7. Results.jsx
**Location:** `/src/components/Results.jsx`

**Responsibilities:**
- Calculates and displays investment results using shadcn/ui Card and Table components
- Uses `calculateInvestmentResults` utility function
- Formats currency using `formatter` utility
- Derives initial investment from first year's data

**Calculations:**
- `initialInvestment` = first year's valueEndOfYear - interest - annualInvestment
- `totalInterest` = valueEndOfYear - (annualInvestment × year) - initialInvestment
- `totalAmountInvested` = valueEndOfYear - totalInterest

**Table Columns:**
1. Year (left-aligned)
2. Investment Value (right-aligned, emerald color, semibold)
3. Interest - Year (right-aligned)
4. Total Interest (right-aligned, teal color)
5. Invested Capital (right-aligned)

**Styling:**
- Card component with header
- Table component with proper semantic structure
- Color coding for emphasis (emerald for value, teal for interest)
- Responsive table layout

### 8. investment.js (Utility Module)
**Location:** `/src/util/investment.js`

**Exports:**

#### `calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration })`
- Returns array of annual data objects
- Uses compound interest calculation
- Each year object contains:
  - `year` - Year number (1-indexed)
  - `interest` - Interest earned that year
  - `valueEndOfYear` - Total investment value
  - `annualInvestment` - Amount added that year

**Formula:**
```javascript
interestEarnedInYear = investmentValue * (expectedReturn / 100)
investmentValue += interestEarnedInYear + annualInvestment
```

#### `formatter`
- Intl.NumberFormat configured for US currency
- Format: "$1,000" (no decimal places)
- Usage: `formatter.format(value)`

### 9. lib/utils.js (Utility Module)
**Location:** `/src/lib/utils.js`

**Purpose:** Utility functions for shadcn/ui components

**Exports:**

#### `cn(...inputs)`
- Combines clsx and tailwind-merge for optimal class name handling
- Handles conditional classes and merges conflicting Tailwind utilities
- Essential for shadcn/ui component variants

**Usage:**
```javascript
import { cn } from "@/lib/utils"

<div className={cn("base-class", condition && "conditional-class", className)} />
```

## shadcn/ui Components

### Available Components

All components are located in `/src/components/ui/` and built with Tailwind CSS + Radix UI primitives.

#### 1. Alert (`alert.jsx`)
- Variants: default, destructive
- Uses lucide-react for icons
- Components: Alert, AlertTitle, AlertDescription

#### 2. Button (`button.jsx`)
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Built with class-variance-authority

#### 3. Card (`card.jsx`)
- Components: Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
- Used for input form and results display

#### 4. Input (`input.jsx`)
- Styled number/text input with focus states
- Integrated with Tailwind design tokens

#### 5. Label (`label.jsx`)
- Form label component
- Built on @radix-ui/react-label

#### 6. Table (`table.jsx`)
- Components: Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption
- Semantic table structure with styling

### Adding New shadcn/ui Components

**Method 1: Manual Installation (Recommended)**
1. Visit https://ui.shadcn.com/docs/components/[component-name]
2. Copy the component code
3. Install required Radix UI dependencies if needed
4. Save to `/src/components/ui/[component-name].jsx`
5. Convert TypeScript to JavaScript if necessary (remove type annotations)
6. Import using path alias: `import { Component } from "@/components/ui/component"`

**Method 2: Using CLI (if available)**
```bash
npx shadcn-ui@latest add [component-name]
```

See `SHADCN_SETUP.md` for detailed setup instructions.

## Styling System

### Tailwind CSS Configuration

**File:** `tailwind.config.js`

**Key Features:**
- Dark mode: class-based (`darkMode: ["class"]`)
- Content paths: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- Extended theme with CSS variables for colors
- Border radius variables (lg, md, sm)
- Semantic color tokens (primary, secondary, accent, destructive, etc.)
- tailwindcss-animate plugin enabled

**Color System:**
Uses CSS variables defined in `index.css`:
- Light mode: Defined in `:root`
- Dark mode: Defined in `.dark`
- Semantic tokens: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring
- Chart colors: chart-1 through chart-5

### Global Styles

**File:** `src/index.css`

**Structure:**
1. Google Fonts import (Quicksand, Roboto Condensed)
2. Tailwind directives (@tailwind base, components, utilities)
3. CSS variables for theming (light + dark mode)
4. Custom CSS for layout and components

**Custom CSS Sections:**
- App layout (flex container, sidebar layout)
- Sidebar styles (fixed position, navigation, active states)
- Home page styles (welcome section, tool cards grid)
- Dark mode overrides
- Responsive design (mobile breakpoint @768px)

**Responsive Behavior:**
- Desktop (>768px): Full sidebar (250px) with text labels
- Mobile (≤768px): Collapsed sidebar (60px) with icons only
- Tool grid: Auto-fit columns, min 280px

### CSS Variables

All shadcn/ui components use CSS variables for theming, allowing easy customization:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides ... */
}
```

Variables use HSL values without the `hsl()` wrapper for compatibility with Tailwind's opacity modifiers.

## Path Aliases

**Configuration Files:**
- `jsconfig.json` - For editor intellisense
- `vite.config.js` - For build-time resolution
- `components.json` - For shadcn/ui CLI

**Alias Mapping:**
- `@/*` → `./src/*`

**Usage:**
```javascript
// Instead of: import { Button } from "../../components/ui/button"
import { Button } from "@/components/ui/button"

// Instead of: import { cn } from "../../lib/utils"
import { cn } from "@/lib/utils"
```

## Development Workflows

### Setup and Installation

```bash
# Install dependencies
npm install

# Install new shadcn/ui component (if CLI works)
npx shadcn-ui@latest add [component-name]
```

### Available Scripts

#### Development Server
```bash
npm run dev
```
- Starts Vite dev server with hot module replacement
- Default: http://localhost:5173
- Base path: `/` (in development)

#### Build for Production
```bash
npm run build
```
- Creates optimized production build in `dist/` directory
- Minifies and bundles all assets
- Base path: `/investment-calculator/` (for GitHub Pages)

#### Preview Production Build
```bash
npm run preview
```
- Previews the production build locally
- Serves files from `dist/` directory
- Uses production base path

#### Lint Code
```bash
npm run lint
```
- Runs ESLint on all .js and .jsx files
- Reports unused disable directives
- Max warnings: 0 (strict mode)

### GitHub Pages Deployment

**Workflow File:** `.github/workflows/deploy.yml`

**Trigger:**
- Push to `main` branch
- Manual workflow dispatch

**Process:**
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (`npm ci`)
4. Build project (`npm run build`)
5. Upload `dist/` directory as artifact
6. Deploy to GitHub Pages

**Configuration:**
- Base path: `/investment-calculator/` (set in `vite.config.js`)
- Deployment URL: https://[username].github.io/investment-calculator/

**Permissions:**
- contents: read
- pages: write
- id-token: write

## Code Conventions

### File Naming
- **Components:** PascalCase with `.jsx` extension (Header.jsx, UserInput.jsx, Sidebar.jsx)
- **Pages:** PascalCase with `.jsx` extension in `/pages/` directory (Home.jsx, InvestmentCalculator.jsx)
- **UI Components:** lowercase with `.jsx` extension in `/components/ui/` (button.jsx, card.jsx)
- **Utilities:** camelCase with `.js` extension (investment.js, utils.js)
- **Styles:** camelCase with `.css` extension (index.css)
- **Config:** lowercase with extensions (vite.config.js, tailwind.config.js)

### Component Structure
- **Functional components** exclusively (no class components)
- **Default exports** for page and regular components
- **Named exports** for utility functions and UI components
- React import only when using hooks (can be omitted for pure JSX with modern React)

### State Management
- **useState** hook for local component state
- State managed in page components (InvestmentCalculator.jsx)
- Props drilling pattern (no Context API or state management library)
- No global state (each page is independent)

### Routing Patterns
- **React Router v7** with BrowserRouter
- **NavLink** for navigation with active state
- **Link** for regular navigation without active state
- **Routes/Route** for route configuration
- Base path configured in Vite for GitHub Pages

### Event Handling
- Inline arrow functions for event handlers in JSX
- Event handler functions defined in parent component
- Use computed property names for dynamic state updates

### Props Patterns
- Destructured props in function parameters
- Clear prop names (userInput, onChange, input)
- No PropTypes validation (consider adding TypeScript for type safety)

### Styling Conventions
- **Tailwind utility classes** for most styling
- **shadcn/ui components** for UI elements
- **CSS variables** for theming (defined in index.css)
- **Custom CSS** for layout and complex components
- ID selectors for major sections (#header, #sidebar)
- Class selectors for custom styles (.app-container, .tool-card)
- `cn()` utility for conditional and merged classes

### Import Patterns
- Path aliases for local files (`@/components/ui/button`)
- Relative imports for page-level imports (`../components/Header`)
- Absolute imports for node_modules (`react`, `react-dom`)
- Group imports: external → internal → components → styles

## File Organization

### Assets
- Logo duplicated in two locations:
  - `/public/investment-calculator-logo.png` (referenced in index.html)
  - `/src/assets/investment-calculator-logo.png` (imported in Header.jsx)

### Component Categories
1. **Pages** (`/src/pages/`) - Top-level route components
2. **Components** (`/src/components/`) - Reusable components
3. **UI Components** (`/src/components/ui/`) - shadcn/ui components
4. **Utilities** (`/src/util/`, `/src/lib/`) - Helper functions

### Import Patterns by Component Type

**Pages:**
```javascript
import { useState } from "react"
import Header from "../components/Header"
import UserInput from "../components/UserInput"
import { Alert, AlertDescription } from "@/components/ui/alert"
```

**Components:**
```javascript
import { Card, CardContent } from "@/components/ui/card"
import { calculateInvestmentResults } from "../util/investment"
```

**UI Components:**
```javascript
import { cn } from "@/lib/utils"
```

## Key Features

### Multi-Page Architecture
- Home page with welcome section and tool cards
- Dedicated calculator page with full functionality
- Sidebar navigation between pages
- React Router for client-side routing

### Input Validation
- Duration must be >= 1 year
- Invalid input shows shadcn/ui Alert component (destructive variant)
- Error message: "Please enter a valid duration (at least 1 year)."
- AlertCircle icon from lucide-react
- Results component only renders when input is valid
- All inputs are controlled (value from state)

### Calculation Logic
- Compound interest calculation
- Annual contributions added after interest calculation
- Year-by-year breakdown of investment growth
- Derived metrics (total interest, invested capital)

### Currency Formatting
- Consistent USD formatting across all monetary values
- No decimal places (whole dollars)
- Thousands separators
- Format: "$10,000"

### Responsive Design
- Fixed sidebar (desktop: 250px, mobile: 60px)
- Responsive main content area
- Responsive grid layouts (tool cards, input form)
- Mobile-first approach with media queries
- Breakpoint: 768px

### Accessibility
- Proper semantic HTML (nav, main, aside)
- Label associations with htmlFor
- Required attributes on inputs
- Table semantic structure (thead, tbody, th, td)
- NavLink active states for screen readers
- Keyboard navigation support

### Dark Mode Support
- CSS variables for light and dark themes
- `.dark` class for dark mode activation
- All shadcn/ui components dark mode compatible
- Custom dark mode styles for tool cards and sections

## Common Tasks for AI Assistants

### Adding New Pages

1. Create new page component in `/src/pages/PageName.jsx`
2. Add route in `App.jsx`:
   ```javascript
   <Route path="/page-name" element={<PageName />} />
   ```
3. Add navigation link in `Sidebar.jsx`:
   ```javascript
   <NavLink to="/page-name">
     <span className="icon">🔧</span>
     <span>Page Name</span>
   </NavLink>
   ```
4. Add styles to `index.css` if needed

### Adding New shadcn/ui Components

1. Visit https://ui.shadcn.com/docs/components/[component-name]
2. Check dependencies (install Radix UI packages if needed):
   ```bash
   npm install @radix-ui/react-[component-name]
   ```
3. Copy component code from documentation
4. Create file `/src/components/ui/[component-name].jsx`
5. Convert TypeScript to JavaScript:
   - Remove type annotations (`: type`, `<Type>`)
   - Change interface to object destructuring
6. Import and use:
   ```javascript
   import { Component } from "@/components/ui/component"
   ```

### Adding New Input Fields

1. Update state in `InvestmentCalculator.jsx` (add new property to initial state)
2. Add input field in `UserInput.jsx` using shadcn/ui components:
   ```javascript
   <div className="space-y-2">
     <Label htmlFor="newField">New Field</Label>
     <Input
       id="newField"
       type="number"
       value={userInput.newField}
       onChange={(event) => onChange("newField", event.target.value)}
     />
   </div>
   ```
3. Update `calculateInvestmentResults` in `/src/util/investment.js` if needed
4. Update `Results.jsx` if calculation or display changes

### Modifying Calculations

1. Edit `calculateInvestmentResults` in `/src/util/investment.js`
2. Update `Results.jsx` if output structure changes
3. Test with various input values
4. Ensure no breaking changes to existing functionality
5. Update derived calculations (totalInterest, totalAmountInvested) if needed

### Styling Changes

1. **Tailwind Utilities:** Add classes directly to JSX
2. **Theme Colors:** Edit CSS variables in `/src/index.css` (`:root` and `.dark`)
3. **Component Variants:** Edit shadcn/ui component files in `/src/components/ui/`
4. **Custom Styles:** Add to `/src/index.css` (use class selectors)
5. **Responsive:** Use Tailwind breakpoints (sm:, md:, lg:, xl:) or media queries

### Adding Navigation Items

1. Edit `/src/components/Sidebar.jsx`
2. Add new `<li>` with `<NavLink>`:
   ```javascript
   <li>
     <NavLink to="/new-route">
       <span className="icon">📊</span>
       <span>New Tool</span>
     </NavLink>
   </li>
   ```
3. Ensure route exists in `App.jsx`

### Validation Enhancements

1. Update `validInput` logic in `InvestmentCalculator.jsx`
2. Add specific validation for each field
3. Update Alert component message for new validations
4. Consider adding field-level validation with error messages per input

### Adding Icons

Use **lucide-react** for icons:

```javascript
import { IconName } from "lucide-react"

<IconName className="h-4 w-4" />
```

Browse icons: https://lucide.dev

## Build and Deployment

### Build Output
- Location: `dist/` directory
- Includes: Minified JS, CSS, HTML, and assets
- Base path: `/investment-calculator/` (for GitHub Pages)
- Ready for static hosting

### Vite Configuration

**File:** `vite.config.js`

**Key Settings:**
- React plugin enabled
- Base path: `/investment-calculator/` (GitHub Pages)
- Path alias: `@` → `./src`
- Standard Vite optimizations

### Environment

**Development:**
- Vite dev server with HMR
- Base path: `/`
- Port: 5173 (default)

**Production:**
- Static files served from `dist/`
- Base path: `/investment-calculator/`
- Deployed to GitHub Pages automatically on push to `main`

### Deployment Process

**Automatic (via GitHub Actions):**
1. Push to `main` branch
2. GitHub Actions workflow triggers
3. Build runs (`npm ci && npm run build`)
4. Artifact uploaded to Pages
5. Site deployed to https://[username].github.io/investment-calculator/

**Manual:**
1. Run `npm run build`
2. Upload `dist/` folder to hosting provider
3. Configure base path if needed

## Testing Considerations

**Current State:** No testing framework configured

**Recommendations for Adding Tests:**
- Install Vitest (Vite-native testing):
  ```bash
  npm install -D vitest @testing-library/react @testing-library/jest-dom
  ```
- Add React Testing Library for component tests
- Test calculation logic in `investment.js`
- Test user interactions in components
- Test routing and navigation
- Add E2E tests with Playwright or Cypress
- Test responsive behavior
- Test dark mode switching

**Test Structure:**
```
src/
  __tests__/
    util/
      investment.test.js
    components/
      UserInput.test.jsx
      Results.test.jsx
    pages/
      InvestmentCalculator.test.jsx
```

## Performance Considerations

### Current Optimizations
- Vite's code splitting and tree shaking
- Tailwind CSS purging of unused styles
- Production build minification
- Static site generation (no server-side rendering)

### Potential Optimizations
- **useMemo:** Memoize `calculateInvestmentResults` call in Results.jsx
- **useCallback:** Memoize `handleChange` function
- **React.lazy:** Code split pages for faster initial load
- **Image optimization:** Optimize logo assets (WebP format)
- **Bundle analysis:** Use `vite-bundle-visualizer` to analyze bundle size

**When to Optimize:**
- Results component recalculates on every render (consider useMemo if duration > 50 years)
- Adding more pages (implement lazy loading)
- Bundle size > 500KB (analyze and split)

## Important Notes for AI Assistants

### When Modifying Code

1. **Preserve Existing Functionality**
   - Don't break the core calculation logic
   - Maintain state management pattern
   - Keep existing props interface
   - Preserve routing structure

2. **Follow Established Patterns**
   - Use functional components with hooks
   - Keep state in page components (not App.jsx)
   - Use controlled inputs
   - Maintain consistent file naming
   - Use path aliases (@/* imports)
   - Use shadcn/ui components for UI elements

3. **Maintain Code Style**
   - Use Tailwind utility classes
   - Follow shadcn/ui component patterns
   - Keep JSX readable (max 2-3 props per line)
   - Use destructuring for props
   - Use const for component functions

4. **Testing**
   - Always test calculations with multiple values
   - Verify input validation works
   - Check edge cases (zero values, large numbers)
   - Ensure UI updates correctly
   - Test routing and navigation
   - Test responsive behavior

5. **Documentation**
   - Update this file when making structural changes
   - Add comments for complex logic
   - Document any new utilities or helpers
   - Update SHADCN_SETUP.md when adding new shadcn/ui setup steps

### Common Pitfalls to Avoid

1. **Don't** modify the calculation formula without understanding compound interest
2. **Don't** break the controlled input pattern
3. **Don't** remove input validation
4. **Don't** change state structure without updating all dependent code
5. **Don't** add external dependencies without justification
6. **Don't** break path aliases (always use `@/` for src imports)
7. **Don't** mix custom CSS and Tailwind (prefer Tailwind utilities)
8. **Don't** modify shadcn/ui components without understanding the variant system
9. **Don't** forget to test dark mode when adding new components
10. **Don't** break the responsive layout (test at 768px breakpoint)

### Path Alias Best Practices

**Always use path aliases for:**
- UI components: `@/components/ui/button`
- Utilities: `@/lib/utils`
- Components: `@/components/Header`

**Use relative imports for:**
- Same-level files: `./investment`
- Parent-level when in pages: `../components/Header`

### Styling Best Practices

**Priority Order:**
1. **Tailwind utilities** - First choice for styling
2. **shadcn/ui components** - For common UI elements
3. **CSS variables** - For theming and colors
4. **Custom CSS** - Only for complex layouts not achievable with Tailwind

**Avoid:**
- Inline styles (except dynamic values from props/state)
- Hardcoded colors (use Tailwind color tokens)
- !important (indicates specificity issues)

### Dark Mode Implementation

When adding new components:
1. Use Tailwind color tokens (bg-background, text-foreground)
2. Test with `.dark` class on root element
3. Use CSS variables for custom colors
4. Avoid hardcoded hex colors
5. Check shadcn/ui component dark mode support

### Accessibility Checklist

When adding new features:
- [ ] All interactive elements keyboard accessible
- [ ] Labels associated with inputs (htmlFor)
- [ ] Semantic HTML (nav, main, section, article)
- [ ] ARIA labels for icon-only buttons
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader tested (if possible)

## Troubleshooting

### Common Issues

**Issue:** Path alias not resolving
- **Solution:** Check `jsconfig.json` and `vite.config.js` have matching alias configuration
- **Verify:** Restart dev server after config changes

**Issue:** Tailwind classes not applying
- **Solution:** Check class names are correct (no typos)
- **Verify:** Purge is not removing classes (check `tailwind.config.js` content paths)

**Issue:** shadcn/ui component not styled
- **Solution:** Ensure CSS variables defined in `index.css`
- **Verify:** Tailwind directives are imported
- **Check:** Component uses `cn()` utility correctly

**Issue:** Build fails on GitHub Pages
- **Solution:** Check base path in `vite.config.js` matches repository name
- **Verify:** All imports use correct paths (no absolute URLs)

**Issue:** Routes not working on GitHub Pages
- **Solution:** Ensure BrowserRouter is used (not HashRouter needed for GitHub Pages)
- **Note:** GitHub Pages serves all routes to index.html, so BrowserRouter works

## Version Information

**Last Updated:** 2025-11-15
**React Version:** 18.2.0
**Vite Version:** 4.4.5
**React Router Version:** 7.9.6
**Tailwind CSS Version:** 3.4.18
**Node Version Required:** 18+ (LTS recommended)

## Git Workflow

**Main Branch:** (not specified in current status)
**Current Branch:** claude/claude-md-mi0llyecznmexa7i-01BxBJYXRFtVDicJSb5zy3qQ

**Recent Commits:**
- 8bbd147 - Merge pull request #5 (add sidebar navigation and homepage)
- 34b1eb9 - feat: add sidebar navigation and homepage
- 00f7e0d - Merge pull request #4 (redesign with shadcn/ui)
- e42b3f8 - feat: redesign UI with shadcn/ui components
- 565fb14 - ci: add GitHub Pages deployment workflow

### Commit Message Convention
- Use conventional commits format
- Prefix: feat, fix, docs, style, refactor, test, chore, ci
- Keep messages concise and descriptive
- Examples:
  - `feat: add new calculator feature`
  - `fix: correct compound interest calculation`
  - `docs: update CLAUDE.md with routing info`
  - `style: improve responsive design`

## Additional Resources

### Documentation
- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Lucide Icons:** https://lucide.dev

### Project Files
- **SHADCN_SETUP.md** - shadcn/ui installation guide (Chinese)
- **README.md** - Project readme
- **This file** - Comprehensive development guide

## Contact and Support

For questions about the codebase or AI assistant integration, refer to:
- Project README.md
- This CLAUDE.md file
- SHADCN_SETUP.md (shadcn/ui specific)
- Git commit history for context on changes
- shadcn/ui documentation for component usage

---

**Note for AI Assistants:** This file should be updated whenever significant structural changes are made to the codebase. Always verify information in this file matches the current state of the repository before making recommendations. This document was last updated to reflect the addition of React Router, shadcn/ui components, sidebar navigation, and multi-page architecture.
