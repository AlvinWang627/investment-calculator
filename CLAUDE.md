# CLAUDE.md - Investment Calculator Project Guide

## Project Overview

This is a **React Investment Calculator** application built with Vite. It allows users to calculate investment growth over time based on initial investment, annual contributions, expected returns, and investment duration.

**Project Name:** react-essentials-practice (package.json)
**Display Name:** React Investment Calculator
**Tech Stack:** React 18.2, Vite 4.4, JavaScript (JSX)

## Codebase Structure

```
investment-calculator/
├── public/
│   └── investment-calculator-logo.png     # Logo asset
├── src/
│   ├── assets/
│   │   └── investment-calculator-logo.png # Logo asset (also in src)
│   ├── components/
│   │   ├── Header.jsx                     # Application header with logo
│   │   ├── UserInput.jsx                  # Input form for investment parameters
│   │   └── Results.jsx                    # Results table component
│   ├── util/
│   │   └── investment.js                  # Core calculation logic
│   ├── App.jsx                            # Main application component
│   ├── index.jsx                          # React entry point
│   └── index.css                          # Global styles
├── index.html                             # HTML entry point
├── package.json                           # Dependencies and scripts
├── vite.config.js                         # Vite configuration
├── .gitignore                             # Git ignore rules
└── README.md                              # Project readme

```

## Technology Stack

### Core Technologies
- **React 18.2.0** - UI library
- **React DOM 18.2.0** - React rendering
- **Vite 4.4.5** - Build tool and dev server

### Development Tools
- **ESLint 8.45.0** - Code linting
- **@vitejs/plugin-react 4.0.3** - React support for Vite
- **eslint-plugin-react** - React-specific linting rules
- **eslint-plugin-react-hooks** - React Hooks linting
- **eslint-plugin-react-refresh** - React refresh support

### Styling
- **Custom CSS** (index.css) with Google Fonts (Quicksand, Roboto Condensed)
- Radial gradient background (#303b37 to #1a1f1d)
- Green/teal color scheme (#307e6c, #2b996d, #76c0ae, #c2e9e0, #83e6c0)

## Key Components

### 1. App.jsx (Main Component)
**Location:** `/src/App.jsx`

**Responsibilities:**
- Manages application state using `useState` hook
- Stores user input: initialInvestment, annualInvestment, expectedReturn, duration
- Validates input (duration >= 1)
- Handles input changes via `handleChange` function
- Renders Header, UserInput, and Results components

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

### 2. Header.jsx
**Location:** `/src/components/Header.jsx`

**Responsibilities:**
- Displays application logo and title
- Imports logo from `/src/assets/investment-calculator-logo.png`
- Pure presentational component

**Structure:**
- Uses `#header` id for styling
- Contains image and h1 elements

### 3. UserInput.jsx
**Location:** `/src/components/UserInput.jsx`

**Responsibilities:**
- Renders input form with 4 number fields
- Accepts props: `userInput` (state object) and `onChange` (handler function)
- Provides controlled inputs for all investment parameters

**Input Fields:**
1. Initial Investment
2. Annual Investment
3. Expected Return (%)
4. Duration (years)

**Layout:**
- Two `.input-group` divs, each containing 2 inputs
- All inputs are type="number" and required

### 4. Results.jsx
**Location:** `/src/components/Results.jsx`

**Responsibilities:**
- Calculates and displays investment results in a table
- Uses `calculateInvestmentResults` utility function
- Formats currency using `formatter` utility
- Derives initial investment from first year's data

**Calculations:**
- `initialInvestment` = first year's valueEndOfYear - interest - annualInvestment
- `totalInterest` = valueEndOfYear - (annualInvestment × year) - initialInvestment
- `totalAmountInvested` = valueEndOfYear - totalInterest

**Table Columns:**
1. Year
2. Investment Value (end of year)
3. Interest (earned that year)
4. Total Interest (cumulative)
5. Invested Capital (cumulative)

### 5. investment.js (Utility Module)
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

## Development Workflows

### Setup and Installation
```bash
npm install
```

### Available Scripts

#### Development Server
```bash
npm run dev
```
- Starts Vite dev server with hot module replacement
- Default: http://localhost:5173

#### Build for Production
```bash
npm run build
```
- Creates optimized production build in `dist/` directory
- Minifies and bundles all assets

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

## Code Conventions

### File Naming
- **Components:** PascalCase with `.jsx` extension (Header.jsx, UserInput.jsx)
- **Utilities:** camelCase with `.js` extension (investment.js)
- **Styles:** camelCase with `.css` extension (index.css)
- **Entry points:** camelCase (index.jsx, index.html)

### Component Structure
- **Functional components** exclusively (no class components)
- **Default exports** for all components
- **Named exports** for utility functions
- React import only when using JSX (can be omitted with modern React)

### State Management
- **useState** hook for local component state
- State lifted to App.jsx (top-level)
- Props drilling pattern (no Context API or state management library)

### Event Handling
- Inline arrow functions for event handlers in JSX
- Event handler functions defined in parent component
- Use computed property names for dynamic state updates

### Props Patterns
- Destructured props in function parameters
- Clear prop names (userInput, onChange, input)
- No PropTypes validation (consider adding TypeScript for type safety)

### Styling Conventions
- **ID selectors** for major sections (#header, #user-input, #result)
- **Class selectors** for reusable styles (.input-group, .center)
- Global CSS file (no CSS modules or styled-components)
- Mobile-first approach with max-width constraints

## File Organization

### Assets
- Logo duplicated in two locations:
  - `/public/investment-calculator-logo.png` (referenced in index.html)
  - `/src/assets/investment-calculator-logo.png` (imported in Header.jsx)

### Component Hierarchy
```
App
├── Header
├── UserInput
└── Results (conditionally rendered)
```

### Import Patterns
- Relative imports for local files (`./App.jsx`, `../util/investment`)
- Absolute imports for node_modules (`react`, `react-dom`)
- Asset imports use absolute path from src (`/src/assets/...`)

## Key Features

### Input Validation
- Duration must be >= 1 year
- Invalid input shows error message: "please input valid input"
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

### Responsive Design
- Max width constraints on sections
- Flexible input groups
- Centered layout
- Radial gradient background

## Common Tasks for AI Assistants

### Adding New Input Fields
1. Update state in App.jsx (add new property to initial state)
2. Add input field in UserInput.jsx
3. Update handleChange call with new identifier
4. Update calculateInvestmentResults if needed
5. Update Results component if calculation changes

### Modifying Calculations
1. Edit `calculateInvestmentResults` in `/src/util/investment.js`
2. Update Results.jsx if output structure changes
3. Test with various input values
4. Ensure no breaking changes to existing functionality

### Styling Changes
1. Edit `/src/index.css` for global styles
2. Follow existing ID/class naming conventions
3. Maintain color scheme consistency
4. Test responsive behavior

### Adding New Components
1. Create new .jsx file in `/src/components/`
2. Use PascalCase naming
3. Import and use in App.jsx or other components
4. Add corresponding styles to index.css

### Validation Enhancements
1. Update validInput logic in App.jsx
2. Add specific validation for each field
3. Provide clear error messages
4. Consider adding field-level validation

## Build and Deployment

### Build Output
- Location: `dist/` directory
- Includes: Minified JS, CSS, HTML, and assets
- Ready for static hosting

### Vite Configuration
- Default React plugin enabled
- No custom build settings
- Standard Vite optimizations apply

### Environment
- Development: Uses Vite dev server with HMR
- Production: Static files served from dist/

## Testing Considerations

**Current State:** No testing framework configured

**Recommendations for Adding Tests:**
- Install Vitest (Vite-native testing)
- Add React Testing Library for component tests
- Test calculation logic in investment.js
- Test user interactions in components
- Add E2E tests with Playwright or Cypress

## Important Notes for AI Assistants

### When Modifying Code

1. **Preserve Existing Functionality**
   - Don't break the core calculation logic
   - Maintain state management pattern
   - Keep existing props interface

2. **Follow Established Patterns**
   - Use functional components with hooks
   - Keep state in App.jsx
   - Use controlled inputs
   - Maintain consistent file naming

3. **Maintain Code Style**
   - Use existing formatting conventions
   - Match indentation (2 spaces)
   - Keep JSX readable
   - Use destructuring for props

4. **Testing**
   - Always test calculations with multiple values
   - Verify input validation works
   - Check edge cases (zero values, large numbers)
   - Ensure UI updates correctly

5. **Documentation**
   - Update this file when making structural changes
   - Add comments for complex logic
   - Document any new utilities or helpers

### Common Pitfalls to Avoid

1. **Don't** modify the calculation formula without understanding compound interest
2. **Don't** break the controlled input pattern
3. **Don't** remove input validation
4. **Don't** change state structure without updating all dependent code
5. **Don't** add external dependencies without justification

### Performance Considerations

- Results component recalculates on every render
- Consider useMemo for expensive calculations if performance issues arise
- Current implementation is fine for typical use cases (duration < 100 years)

### Accessibility

**Current State:** Basic HTML semantics only

**Improvements to Consider:**
- Add proper label associations (htmlFor attributes)
- Add ARIA labels for better screen reader support
- Ensure keyboard navigation works
- Add proper focus management

### Browser Compatibility

- Modern browsers (ES6+ required)
- Vite default browser targets apply
- Intl.NumberFormat widely supported
- No polyfills included

## Version Information

**Last Updated:** 2025-11-15
**React Version:** 18.2.0
**Vite Version:** 4.4.5
**Node Version Required:** LTS (v16+ recommended)

## Git Workflow

**Main Branch:** Not specified in current git status
**Current Branch:** claude/claude-md-mi0j3789cj89m4ek-015tMptECEMAi3w6nHY89hQH

**Recent Commits:**
- ee23cc2 - Create README.md
- 7f64c2f - feat: add table
- ca0752a - feat: first commit

### Commit Message Convention
- Use conventional commits format
- Prefix: feat, fix, docs, style, refactor, test, chore
- Keep messages concise and descriptive

## Contact and Support

For questions about the codebase or AI assistant integration, refer to:
- Project README.md
- This CLAUDE.md file
- Git commit history for context on changes

---

**Note for AI Assistants:** This file should be updated whenever significant structural changes are made to the codebase. Always verify information in this file matches the current state of the repository before making recommendations.
