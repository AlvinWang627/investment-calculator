# CLAUDE.md - Multi-Tool Calculator Suite Project Guide

## Project Overview

This is a **Multi-Tool Calculator Suite** built with React, Vite, React Router, and shadcn/ui. It features a comprehensive multi-page architecture with collapsible sidebar navigation and submenu support, providing multiple specialized calculators including investment, mortgage, and fitness tools.

**Project Name:** react-essentials-practice (package.json)
**Display Name:** Calculator Suite (Investment, Mortgage, Fitness, Strength Training, Hypertrophy)
**Tech Stack:** React 18.2, Vite 4.4, React Router v7, Tailwind CSS 3.4, shadcn/ui, Recharts 3.4, JavaScript (JSX)
**Base Path:** `/calculator/` (GitHub Pages deployment)

## Codebase Structure

```
calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml                          # GitHub Pages deployment workflow
├── public/
│   └── investment-calculator-logo.png          # Logo asset
├── src/
│   ├── assets/
│   │   └── investment-calculator-logo.png      # Logo asset (also in src)
│   ├── components/
│   │   ├── ui/                                 # shadcn/ui components
│   │   │   ├── alert.jsx                       # Alert component
│   │   │   ├── button.jsx                      # Button component
│   │   │   ├── card.jsx                        # Card component
│   │   │   ├── input.jsx                       # Input component
│   │   │   ├── label.jsx                       # Label component
│   │   │   ├── radio-group.jsx                 # Radio group component
│   │   │   ├── select.jsx                      # Select dropdown component
│   │   │   └── table.jsx                       # Table component
│   │   ├── mortgage/                           # Mortgage calculator components
│   │   │   ├── MortgageInput.jsx              # Mortgage input form
│   │   │   ├── MortgageResults.jsx            # Mortgage results summary
│   │   │   ├── MortgageSchedule.jsx           # Payment schedule table
│   │   │   └── SavedParameters.jsx            # Saved calculations list
│   │   ├── strength/                           # Strength training components
│   │   │   ├── ExerciseInput.jsx              # Exercise input form
│   │   │   ├── FiveByFiveResults.jsx          # 5x5 program results
│   │   │   ├── FiveThreeOneResults.jsx        # 5/3/1 program results
│   │   │   └── ProgressChart.jsx              # Progress visualization
│   │   ├── hypertrophy/                        # Hypertrophy training components
│   │   │   ├── PPLResults.jsx                 # Push/Pull/Legs results
│   │   │   └── UpperLowerResults.jsx          # Upper/Lower split results
│   │   ├── Header.jsx                          # Application header with logo
│   │   ├── Sidebar.jsx                         # Collapsible navigation sidebar
│   │   ├── ScrollToTop.jsx                     # Floating scroll-to-top button
│   │   ├── UserInput.jsx                       # Investment input form
│   │   ├── Results.jsx                         # Investment results table
│   │   └── FitnessResults.jsx                  # Fitness calculations results
│   ├── pages/
│   │   ├── Home.jsx                            # Homepage with tool cards
│   │   ├── InvestmentCalculator.jsx           # Investment calculator page
│   │   ├── MortgageCalculator.jsx             # Mortgage calculator page
│   │   ├── FitnessCalculator.jsx              # Fitness calculator page
│   │   ├── FiveByFive.jsx                     # 5x5 strength program page
│   │   ├── FiveThreeOne.jsx                   # 5/3/1 strength program page
│   │   ├── PushPullLegs.jsx                   # PPL hypertrophy program page
│   │   └── UpperLowerSplit.jsx                # Upper/Lower split program page
│   ├── lib/
│   │   └── utils.js                            # Utility functions (cn helper)
│   ├── util/
│   │   ├── investment.js                       # Investment calculation logic
│   │   ├── mortgage.js                         # Mortgage calculation logic
│   │   ├── mortgageStorage.js                  # LocalStorage for mortgage data
│   │   ├── localStorage.js                     # General localStorage utilities
│   │   ├── fitness.js                          # Fitness calculations (BMI, BMR, TDEE)
│   │   ├── strengthCalculations.js             # Strength program calculations
│   │   └── hypertrophyCalculations.js          # Hypertrophy program calculations
│   ├── App.jsx                                 # Main application (router setup)
│   ├── index.jsx                               # React entry point
│   └── index.css                               # Global styles + Tailwind directives
├── index.html                                  # HTML entry point
├── package.json                                # Dependencies and scripts
├── vite.config.js                              # Vite configuration
├── tailwind.config.js                          # Tailwind CSS configuration
├── postcss.config.js                           # PostCSS configuration
├── components.json                             # shadcn/ui configuration
├── jsconfig.json                               # Path aliases configuration
├── SHADCN_SETUP.md                             # shadcn/ui setup documentation
├── CLAUDE.md                                   # This file - AI assistant guide
├── .gitignore                                  # Git ignore rules
└── README.md                                   # Project readme
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
- **Recharts 3.4.1** - Data visualization and charting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.22** - Vendor prefixes

### Radix UI Primitives
- **@radix-ui/react-label** - Accessible labels
- **@radix-ui/react-select ^2.2.6** - Select dropdowns
- **@radix-ui/react-radio-group ^1.3.8** - Radio button groups
- *(Other Radix primitives as needed by shadcn/ui)*

### Development Tools
- **ESLint 8.45.0** - Code linting
- **@vitejs/plugin-react 4.0.3** - React support for Vite
- **eslint-plugin-react** - React-specific linting rules
- **eslint-plugin-react-hooks** - React Hooks linting
- **eslint-plugin-react-refresh** - React refresh support

### Build & Deployment
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static hosting (base path: `/calculator/`)

## Application Architecture

### Routing Structure

The application uses **React Router v7** with a comprehensive page-based architecture:

**Routes:**
- `/calculator` - Home page (welcome screen with tool cards)
- `/calculator/investment` - Investment calculator
- `/calculator/mortgage` - Mortgage calculator (房貸計算機)
- `/calculator/fitness` - Fitness calculator (健身計算機)
- `/calculator/strength/5x5` - 5x5 strength training program
- `/calculator/strength/531` - 5/3/1 strength training program
- `/calculator/hypertrophy/ppl` - Push/Pull/Legs hypertrophy program
- `/calculator/hypertrophy/upper-lower` - Upper/Lower split program

**Layout:**
- Collapsible sidebar navigation (expanded: 250px, collapsed: 60px)
- Toggle button to collapse/expand sidebar
- Main content area (responsive, dynamic margin based on sidebar state)
- Submenu support with hover dropdowns
- Floating scroll-to-top button (appears after scrolling 300px)
- Responsive: Sidebar behavior optimized for mobile

### Component Hierarchy

```
App (Router Setup)
├── Sidebar (Collapsible navigation with submenus)
├── ScrollToTop (Floating button)
└── Routes
    ├── Home (/calculator)
    │   └── Tool cards grid (Investment, Mortgage, Fitness)
    ├── InvestmentCalculator (/calculator/investment)
    │   ├── Header
    │   ├── UserInput
    │   ├── Alert (validation, conditional)
    │   └── Results
    ├── MortgageCalculator (/calculator/mortgage)
    │   ├── MortgageInput
    │   ├── SavedParameters
    │   ├── MortgageResults
    │   └── MortgageSchedule
    ├── FitnessCalculator (/calculator/fitness)
    │   ├── Input form (inline)
    │   └── FitnessResults
    ├── FiveByFive (/calculator/strength/5x5)
    │   ├── ExerciseInput
    │   ├── FiveByFiveResults
    │   └── ProgressChart
    ├── FiveThreeOne (/calculator/strength/531)
    │   ├── ExerciseInput
    │   ├── FiveThreeOneResults
    │   └── ProgressChart
    ├── PushPullLegs (/calculator/hypertrophy/ppl)
    │   ├── Input form (inline)
    │   └── PPLResults
    └── UpperLowerSplit (/calculator/hypertrophy/upper-lower)
        ├── Input form (inline)
        └── UpperLowerResults
```

## Key Components

### 1. App.jsx (Main Component)
**Location:** `/src/App.jsx`

**Responsibilities:**
- Sets up React Router with BrowserRouter
- Manages sidebar collapsed state (useState hook)
- Renders Sidebar, ScrollToTop, and main content layout
- Defines all application routes
- Applies dynamic margin to main content based on sidebar state

**State:**
- `isCollapsed` (boolean) - Controls sidebar expanded/collapsed state

**Structure:**
```jsx
<Router>
  <div className="app-container">
    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    <main className="main-content" style={{ marginLeft: isCollapsed ? '60px' : '250px' }}>
      <Routes>
        {/* All calculator routes */}
      </Routes>
    </main>
    <ScrollToTop />
  </div>
</Router>
```

### 2. Sidebar.jsx (Navigation)
**Location:** `/src/components/Sidebar.jsx`

**Responsibilities:**
- Provides navigation between all calculator pages
- Manages collapsible sidebar state (controlled by App.jsx)
- Supports submenu navigation with expand/collapse
- Hover dropdowns for submenus when sidebar is collapsed
- Uses NavLink for active state styling
- Toggle button with chevron icons

**State:**
- `expandedMenus` (object) - Tracks which submenus are expanded

**Navigation Structure:**
1. Home (🏠) - `/calculator`
2. Investment Calculator (💰) - `/calculator/investment`
3. 房貸計算機 (🏡) - `/calculator/mortgage`
4. 健身計算機 (💪) - `/calculator/fitness`
5. 力量課表 (🏋️) - Submenu:
   - 5x5 課表 (📊) - `/calculator/strength/5x5`
   - 5/3/1 課表 (📈) - `/calculator/strength/531`
6. 肌肥大課表 (💪) - Submenu:
   - Push/Pull/Legs (🔄) - `/calculator/hypertrophy/ppl`
   - Upper/Lower Split (⬆️) - `/calculator/hypertrophy/upper-lower`

**Features:**
- Toggle button with ChevronLeft/ChevronRight icons (lucide-react)
- Submenu expand/collapse with ChevronDown/ChevronUp icons
- Hover dropdowns when collapsed (submenu-hover-dropdown class)
- Active link highlighting
- Responsive text hiding when collapsed

### 3. ScrollToTop.jsx (Floating Button)
**Location:** `/src/components/ScrollToTop.jsx`

**Responsibilities:**
- Shows floating button when user scrolls down > 300px
- Smooth scroll to top on click
- Uses lucide-react ArrowUp icon
- Fixed position (bottom-right corner)

**Behavior:**
- Listens to window scroll events
- Toggles visibility based on scroll position
- Smooth scroll animation using `window.scrollTo({ behavior: "smooth" })`

### 4. Home.jsx (Landing Page)
**Location:** `/src/pages/Home.jsx`

**Responsibilities:**
- Displays welcome message and introduction
- Shows tool cards grid with three main calculators
- Provides navigation to each calculator via Link components

**Tool Cards:**
1. **Investment Calculator** (💰) - English
2. **房貸計算機** (🏡) - Traditional Chinese
3. **健身計算機** (💪) - Traditional Chinese

**Styling:**
- Centered layout with responsive grid
- Gradient title styling
- Hover effects on cards
- Icon, title, description, and call-to-action link per card

### 5. InvestmentCalculator.jsx (Page)
**Location:** `/src/pages/InvestmentCalculator.jsx`

**Responsibilities:**
- Manages investment calculation state
- Validates user input (duration >= 1)
- Handles input changes
- Renders Header, UserInput, Alert, and Results components

**State Structure:**
```javascript
{
  initialInvestment: 10000,    // Default: $10,000
  annualInvestment: 1200,      // Default: $1,200/year
  expectedReturn: 6,           // Default: 6%
  duration: 10                 // Default: 10 years
}
```

**Validation:**
- Shows Alert component when duration < 1
- Results only render when validInput === true

### 6. MortgageCalculator.jsx (Page)
**Location:** `/src/pages/MortgageCalculator.jsx`

**Responsibilities:**
- Manages mortgage calculation state
- Validates all input fields (loan amount, rate, term, grace period, years)
- Handles parameter saving/loading via localStorage
- Calculates payment schedule and summary
- Renders MortgageInput, SavedParameters, MortgageResults, and MortgageSchedule

**State Structure:**
```javascript
{
  loanAmount: 500,              // 萬元 (10,000s of NTD)
  annualRate: 2.5,              // Annual interest rate (%)
  loanTerm: 20,                 // Loan term (years)
  gracePeriod: 2,               // Grace period (years, interest-only)
  startYear: 2020,              // Loan start year
  currentYear: 2025             // Current year (for highlighting)
}
```

**Features:**
- Grace period support (interest-only payments)
- Save/load multiple parameter sets
- Year-by-year payment schedule
- Current year highlighting
- LocalStorage persistence

### 7. FitnessCalculator.jsx (Page)
**Location:** `/src/pages/FitnessCalculator.jsx`

**Responsibilities:**
- Calculates BMI, BMR, TDEE, FFMI, ideal weight, and macronutrients
- Manages user fitness data state
- Validates input (age, height, weight, body fat)
- Supports gender selection, activity level, and fitness goals
- Renders input form and FitnessResults component

**State Structure:**
```javascript
{
  gender: "male",               // "male" or "female"
  age: 30,                      // Age (years)
  height: 170,                  // Height (cm)
  weight: 70,                   // Weight (kg)
  bodyFat: "",                  // Body fat % (optional)
  activityLevel: "moderate",    // Activity multiplier
  goal: "maintain"              // Fitness goal (maintain/cut/bulk)
}
```

**Calculations:**
- BMI (Body Mass Index)
- BMR (Basal Metabolic Rate) - Mifflin-St Jeor formula
- TDEE (Total Daily Energy Expenditure)
- FFMI (Fat-Free Mass Index) - if body fat provided
- Ideal weight range
- Macronutrient breakdown (protein, carbs, fats)

### 8. Strength Training Pages (5x5, 5/3/1)
**Locations:** `/src/pages/FiveByFive.jsx`, `/src/pages/FiveThreeOne.jsx`

**Responsibilities:**
- Generate strength training program recommendations
- Calculate working weights based on 1RM (one-rep max)
- Display progressive overload schedules
- Visualize progress with charts (Recharts)
- Support common compound lifts (squat, bench press, deadlift, overhead press)

**Features:**
- ExerciseInput component for entering 1RM values
- Week-by-week progression tables
- ProgressChart for visualizing strength gains
- Program-specific calculations (5x5 linear progression, 5/3/1 periodization)

### 9. Hypertrophy Training Pages (PPL, Upper/Lower)
**Locations:** `/src/pages/PushPullLegs.jsx`, `/src/pages/UpperLowerSplit.jsx`

**Responsibilities:**
- Generate hypertrophy (muscle-building) training programs
- Provide exercise selection and set/rep recommendations
- Calculate volume and intensity
- Display weekly training splits

**Features:**
- Push/Pull/Legs split (3-6 days per week)
- Upper/Lower split (4 days per week)
- Exercise recommendations by muscle group
- Volume and intensity guidance

## Utility Modules

### 1. investment.js
**Location:** `/src/util/investment.js`

**Exports:**
- `calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration })` - Compound interest calculation
- `formatter` - Intl.NumberFormat for USD currency

### 2. mortgage.js
**Location:** `/src/util/mortgage.js`

**Exports:**
- `calculateMortgageSchedule(params)` - Year-by-year payment schedule
- `calculateMortgageSummary(params)` - Total interest, principal, payments

**Features:**
- Grace period support (interest-only payments)
- Principal and interest breakdown
- Remaining balance tracking

### 3. mortgageStorage.js
**Location:** `/src/util/mortgageStorage.js`

**Exports:**
- `getSavedParameters()` - Load saved calculations from localStorage
- `saveParameters(name, params)` - Save calculation with name
- `deleteParameters(id)` - Delete saved calculation

### 4. fitness.js
**Location:** `/src/util/fitness.js`

**Exports:**
- BMI calculation
- BMR calculation (Mifflin-St Jeor formula)
- TDEE calculation with activity multipliers
- FFMI calculation
- Ideal weight calculation
- Macronutrient breakdown
- `ACTIVITY_LEVELS` constant (sedentary to athlete)
- `GOALS` constant (maintain, cut, bulk)

### 5. strengthCalculations.js
**Location:** `/src/util/strengthCalculations.js`

**Exports:**
- 5x5 program calculations
- 5/3/1 program calculations
- Progressive overload schedules
- Working weight calculations based on percentages of 1RM

### 6. hypertrophyCalculations.js
**Location:** `/src/util/hypertrophyCalculations.js`

**Exports:**
- PPL split calculations
- Upper/Lower split calculations
- Volume and intensity recommendations
- Exercise selection helpers

### 7. localStorage.js
**Location:** `/src/util/localStorage.js`

**Purpose:** General localStorage utilities for persisting data across sessions

### 8. utils.js
**Location:** `/src/lib/utils.js`

**Exports:**
- `cn(...inputs)` - Combines clsx and tailwind-merge for class name handling

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
- Used extensively across all calculator pages

#### 4. Input (`input.jsx`)
- Styled number/text input with focus states
- Integrated with Tailwind design tokens

#### 5. Label (`label.jsx`)
- Form label component
- Built on @radix-ui/react-label

#### 6. Table (`table.jsx`)
- Components: Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption
- Semantic table structure with styling

#### 7. Select (`select.jsx`)
- Dropdown select component
- Built on @radix-ui/react-select
- Components: Select, SelectTrigger, SelectValue, SelectContent, SelectItem

#### 8. RadioGroup (`radio-group.jsx`)
- Radio button group component
- Built on @radix-ui/react-radio-group
- Components: RadioGroup, RadioGroupItem

## Styling System

### Tailwind CSS Configuration

**File:** `tailwind.config.js`

**Key Features:**
- Dark mode: class-based (`darkMode: ["class"]`)
- Content paths: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- Extended theme with CSS variables for colors
- Border radius variables (lg, md, sm)
- Semantic color tokens (primary, secondary, accent, destructive, etc.)
- Chart colors (chart-1 through chart-5) for Recharts integration
- tailwindcss-animate plugin enabled

### Global Styles

**File:** `src/index.css`

**Structure:**
1. Google Fonts import (Quicksand, Roboto Condensed)
2. Tailwind directives (@tailwind base, components, utilities)
3. CSS variables for theming (light + dark mode)
4. Custom CSS for layout and components

**Custom CSS Sections:**
- App layout (flex container, dynamic sidebar layout)
- Sidebar styles (collapsible, submenus, hover dropdowns)
- Home page styles (welcome section, tool cards grid)
- Submenu styles (expand/collapse, hover dropdowns)
- Dark mode overrides
- Responsive design (mobile breakpoint @768px)

**Responsive Behavior:**
- Desktop (>768px): Collapsible sidebar (250px expanded, 60px collapsed)
- Mobile (≤768px): Auto-collapsed sidebar with hover support
- Tool grid: Auto-fit columns, min 280px
- Main content: Dynamic margin based on sidebar state

### CSS Variables

All shadcn/ui components use CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  /* ... more variables ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --chart-1: 220 70% 50%;
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
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { calculateMortgageSchedule } from "../util/mortgage"
```

## Development Workflows

### Setup and Installation

```bash
# Install dependencies
npm install

# Install new shadcn/ui component
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
- Base path: `/calculator/` (for GitHub Pages)

#### Preview Production Build
```bash
npm run preview
```
- Previews the production build locally
- Serves files from `dist/` directory

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
- Base path: `/calculator/` (set in `vite.config.js`)
- Deployment URL: https://[username].github.io/calculator/

## Code Conventions

### File Naming
- **Components:** PascalCase with `.jsx` extension (Sidebar.jsx, ScrollToTop.jsx)
- **Pages:** PascalCase with `.jsx` extension in `/pages/` directory
- **UI Components:** lowercase with `.jsx` extension in `/components/ui/`
- **Utilities:** camelCase with `.js` extension (mortgage.js, fitness.js)
- **Styles:** camelCase with `.css` extension (index.css)
- **Config:** lowercase with extensions (vite.config.js, tailwind.config.js)

### Component Structure
- **Functional components** exclusively (no class components)
- **Default exports** for page and regular components
- **Named exports** for utility functions and UI components
- React import only when using hooks

### State Management
- **useState** hook for local component state
- **useEffect** hook for side effects (localStorage, scroll listeners)
- State managed in page components
- Props drilling pattern (no Context API or state management library)
- LocalStorage for persistence (mortgage calculator, training programs)

### Routing Patterns
- **React Router v7** with BrowserRouter
- **NavLink** for navigation with active state
- **Link** for regular navigation without active state
- **Routes/Route** for route configuration
- Base path: `/calculator/` configured in Vite

### Event Handling
- Inline arrow functions for event handlers in JSX
- Event handler functions defined in parent component
- Use computed property names for dynamic state updates

### Styling Conventions
- **Tailwind utility classes** for most styling
- **shadcn/ui components** for UI elements
- **CSS variables** for theming (defined in index.css)
- **Custom CSS** for complex layouts (sidebar, submenus)
- ID selectors for major sections (#sidebar, #header)
- Class selectors for custom styles (.submenu-hover-dropdown)
- `cn()` utility for conditional and merged classes

### Multilingual Support

The application includes both English and Traditional Chinese (繁體中文):

**English Content:**
- Investment Calculator
- General UI components

**Traditional Chinese Content:**
- 房貸計算機 (Mortgage Calculator)
- 健身計算機 (Fitness Calculator)
- 力量課表 (Strength Training Programs)
- 肌肥大課表 (Hypertrophy Training Programs)

**Best Practices:**
- Use appropriate language for target audience
- Keep naming consistent within each calculator
- Comments can be in either language
- UI labels should match the primary user base

## Key Features

### Multi-Calculator Architecture
- Three main calculators: Investment, Mortgage, Fitness
- Four training program generators: 5x5, 5/3/1, PPL, Upper/Lower
- Shared navigation via collapsible sidebar
- Consistent UI/UX across all calculators

### Collapsible Sidebar with Submenus
- Toggle button to expand/collapse (250px ↔ 60px)
- Submenu support with expand/collapse arrows
- Hover dropdowns when sidebar is collapsed
- Active route highlighting
- Smooth transitions (0.3s ease)
- Responsive text hiding when collapsed

### Scroll-to-Top Button
- Floating button (bottom-right corner)
- Appears after scrolling 300px
- Smooth scroll animation
- Hover scale effect (110%)
- Uses lucide-react ArrowUp icon

### LocalStorage Persistence
- Save/load mortgage calculations
- Named parameter sets
- Delete saved calculations
- Persist training program data

### Data Visualization
- **Recharts** integration for training progress charts
- Line charts for strength progression
- Responsive chart sizing
- Custom color schemes using CSS variables

### Input Validation
- Comprehensive validation for all calculators
- Real-time validation feedback
- Alert components for error messages
- Disabled state for invalid inputs

### Responsive Design
- Fixed collapsible sidebar
- Dynamic main content margin
- Responsive grid layouts (tool cards, input forms)
- Mobile-optimized sidebar (auto-collapsed)
- Breakpoint: 768px

### Accessibility
- Proper semantic HTML (nav, main, aside)
- Label associations with htmlFor
- Required attributes on inputs
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus states visible

## Common Tasks for AI Assistants

### Adding New Calculator Page

1. Create new page component in `/src/pages/NewCalculator.jsx`
2. Create utility file in `/src/util/newCalculator.js` for calculations
3. Add route in `App.jsx`:
   ```javascript
   <Route path="/calculator/new-calculator" element={<NewCalculator />} />
   ```
4. Add navigation link in `Sidebar.jsx`:
   ```javascript
   <li>
     <NavLink to="/calculator/new-calculator">
       <span className="icon">🔧</span>
       <span className="nav-text">New Calculator</span>
     </NavLink>
   </li>
   ```
5. Add tool card in `Home.jsx`:
   ```javascript
   <Link to="/calculator/new-calculator" className="tool-card">
     <div className="tool-icon">🔧</div>
     <h2>New Calculator</h2>
     <p>Description of calculator</p>
     <span className="tool-link">Get Started →</span>
   </Link>
   ```

### Adding Submenu Item

1. Identify parent submenu in `Sidebar.jsx` (e.g., strengthTraining, hypertrophy)
2. Add new route in `App.jsx`
3. Add submenu item in both expanded and collapsed sections:
   ```javascript
   {/* Expanded submenu */}
   <li>
     <NavLink to="/calculator/category/new-item">
       <span className="submenu-icon">📊</span>
       <span className="nav-text">New Item</span>
     </NavLink>
   </li>

   {/* Hover dropdown for collapsed */}
   <NavLink to="/calculator/category/new-item">
     <span className="submenu-icon">📊</span>
     <span>New Item</span>
   </NavLink>
   ```

### Adding New Submenu Category

1. Add state to `Sidebar.jsx`:
   ```javascript
   const [expandedMenus, setExpandedMenus] = useState({
     strengthTraining: false,
     hypertrophy: false,
     newCategory: false  // Add this
   });
   ```
2. Add submenu structure (copy existing submenu pattern)
3. Add CSS for hover dropdown if needed
4. Create pages for submenu items

### Adding New shadcn/ui Component

1. Visit https://ui.shadcn.com/docs/components/[component-name]
2. Check dependencies (install Radix UI packages if needed):
   ```bash
   npm install @radix-ui/react-[component-name]
   ```
3. Copy component code from documentation
4. Create file `/src/components/ui/[component-name].jsx`
5. Convert TypeScript to JavaScript (remove type annotations)
6. Import and use:
   ```javascript
   import { Component } from "@/components/ui/component"
   ```

### Integrating Recharts

1. Ensure recharts is installed (already in package.json)
2. Import required chart components:
   ```javascript
   import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
   ```
3. Prepare data in array format:
   ```javascript
   const data = [
     { week: 1, weight: 100 },
     { week: 2, weight: 105 },
     // ...
   ]
   ```
4. Use chart colors from CSS variables:
   ```javascript
   <Line stroke="hsl(var(--chart-1))" />
   ```
5. Wrap in ResponsiveContainer for responsive sizing

### Adding LocalStorage Persistence

1. Create storage utility in `/src/util/[feature]Storage.js`
2. Implement functions:
   ```javascript
   export function getSavedData() {
     const saved = localStorage.getItem('feature-key')
     return saved ? JSON.parse(saved) : []
   }

   export function saveData(data) {
     localStorage.setItem('feature-key', JSON.stringify(data))
   }
   ```
3. Use in page component with useEffect:
   ```javascript
   useEffect(() => {
     const loaded = getSavedData()
     setState(loaded)
   }, [])
   ```

### Styling Changes

1. **Tailwind Utilities:** Add classes directly to JSX
2. **Theme Colors:** Edit CSS variables in `/src/index.css` (`:root` and `.dark`)
3. **Component Variants:** Edit shadcn/ui component files in `/src/components/ui/`
4. **Custom Styles:** Add to `/src/index.css` (use class selectors)
5. **Responsive:** Use Tailwind breakpoints (sm:, md:, lg:, xl:)

## Build and Deployment

### Build Output
- Location: `dist/` directory
- Includes: Minified JS, CSS, HTML, and assets
- Base path: `/calculator/` (for GitHub Pages)
- Ready for static hosting

### Vite Configuration

**File:** `vite.config.js`

**Key Settings:**
- React plugin enabled
- Base path: `/calculator/` (GitHub Pages)
- Path alias: `@` → `./src`
- Standard Vite optimizations

### Environment

**Development:**
- Vite dev server with HMR
- Base path: `/`
- Port: 5173 (default)

**Production:**
- Static files served from `dist/`
- Base path: `/calculator/`
- Deployed to GitHub Pages automatically

## Performance Considerations

### Current Optimizations
- Vite's code splitting and tree shaking
- Tailwind CSS purging of unused styles
- Production build minification
- Static site generation
- Recharts lazy loading

### Potential Optimizations
- **React.lazy:** Code split pages for faster initial load
- **useMemo:** Memoize complex calculations
- **useCallback:** Memoize event handlers
- **Virtual scrolling:** For long lists/tables
- **Bundle analysis:** Use `vite-bundle-visualizer`

## Important Notes for AI Assistants

### When Modifying Code

1. **Preserve Existing Functionality**
   - Don't break core calculation logic
   - Maintain state management patterns
   - Keep existing props interfaces
   - Preserve routing structure
   - Maintain sidebar submenu functionality

2. **Follow Established Patterns**
   - Use functional components with hooks
   - Keep state in page components
   - Use controlled inputs
   - Maintain consistent file naming
   - Use path aliases (@/* imports)
   - Use shadcn/ui components for UI elements
   - Follow submenu pattern for navigation

3. **Maintain Code Style**
   - Use Tailwind utility classes
   - Follow shadcn/ui component patterns
   - Keep JSX readable
   - Use destructuring for props
   - Use const for component functions

4. **Testing**
   - Test calculations with various inputs
   - Verify input validation works
   - Check edge cases
   - Test routing and navigation
   - Test sidebar collapse/expand
   - Test submenu expand/collapse and hover
   - Test responsive behavior
   - Test localStorage persistence

5. **Documentation**
   - Update this file when making structural changes
   - Add comments for complex logic
   - Document any new utilities or helpers

### Common Pitfalls to Avoid

1. **Don't** modify calculation formulas without understanding the math
2. **Don't** break the controlled input pattern
3. **Don't** remove input validation
4. **Don't** break path aliases (always use `@/` for src imports)
5. **Don't** mix custom CSS and Tailwind (prefer Tailwind utilities)
6. **Don't** modify sidebar without testing collapse/expand
7. **Don't** break submenu hover dropdowns
8. **Don't** forget to update both expanded and collapsed submenu sections
9. **Don't** hardcode the base path (use vite.config.js)
10. **Don't** break responsive layout (test at 768px breakpoint)

### Base Path Configuration

**CRITICAL:** The base path is set to `/calculator/` for GitHub Pages deployment.

**When to update:**
- Changing repository name
- Deploying to different hosting
- Testing production build locally

**Files to update:**
- `vite.config.js` - Change `base` property
- Test all routes after changing base path

### Sidebar Submenu Pattern

When working with submenus:
1. Both expanded and collapsed versions must be updated
2. Hover dropdown uses absolute positioning
3. Submenu state managed in Sidebar component
4. Click events disabled when sidebar is collapsed
5. Hover events always work when collapsed

## Troubleshooting

### Common Issues

**Issue:** Path alias not resolving
- **Solution:** Check `jsconfig.json` and `vite.config.js` have matching alias configuration
- **Verify:** Restart dev server after config changes

**Issue:** Tailwind classes not applying
- **Solution:** Check class names are correct (no typos)
- **Verify:** Purge is not removing classes (check `tailwind.config.js` content paths)

**Issue:** Submenu not showing on hover when collapsed
- **Solution:** Check CSS for `.submenu-hover-dropdown` class
- **Verify:** Parent element has `.has-submenu` class

**Issue:** Routes not working on GitHub Pages
- **Solution:** Ensure base path in `vite.config.js` matches repository name
- **Verify:** All routes include base path in production build

**Issue:** LocalStorage data not persisting
- **Solution:** Check browser allows localStorage (incognito mode may block)
- **Verify:** JSON.stringify and JSON.parse are handling data correctly

**Issue:** Recharts not displaying
- **Solution:** Ensure data is in correct array format
- **Verify:** ResponsiveContainer has defined height
- **Check:** CSS variables for chart colors are defined

## Version Information

**Last Updated:** 2025-11-18
**React Version:** 18.2.0
**Vite Version:** 4.4.5
**React Router Version:** 7.9.6
**Tailwind CSS Version:** 3.4.18
**Recharts Version:** 3.4.1
**Node Version Required:** 18+ (LTS recommended)

## Recent Changes

**Recent commits:**
- Updated calculator routes to use `/calculator` base path
- Added floating scroll-to-top button
- Implemented sidebar submenu with hover functionality
- Fixed sidebar collapse behavior
- Improved submenu dropdown display

## Git Workflow

**Main Branch:** main
**Current Branch:** claude/claude-md-mi4bk43tax2ysp4l-01YMUvS3Ce5TjyShXci27fDy

### Commit Message Convention
- Use conventional commits format
- Prefix: feat, fix, docs, style, refactor, test, chore, ci
- Keep messages concise and descriptive
- Examples:
  - `feat: add mortgage calculator with grace period support`
  - `fix: correct BMI calculation formula`
  - `docs: update CLAUDE.md with fitness calculator info`
  - `style: improve sidebar submenu hover styles`

## Additional Resources

### Documentation
- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Lucide Icons:** https://lucide.dev
- **Recharts:** https://recharts.org

### Project Files
- **SHADCN_SETUP.md** - shadcn/ui installation guide
- **README.md** - Project readme
- **This file** - Comprehensive development guide

---

**Note for AI Assistants:** This file should be updated whenever significant structural changes are made to the codebase. Always verify information in this file matches the current state of the repository before making recommendations. This document was last updated to reflect the multi-calculator architecture with collapsible sidebar, submenus, scroll-to-top button, and comprehensive calculator suite (investment, mortgage, fitness, strength training, hypertrophy programs).
