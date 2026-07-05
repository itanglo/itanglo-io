# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the personal website from plain HTML/CSS to Next.js App Router with TypeScript and Tailwind CSS v4, preserving the existing design exactly.

**Architecture:** All three pages (home, about, posts) are static React Server Components under `app/`. Three shared components (Nav, Avatar, LogoSvgs) are extracted from the existing HTML. The Avatar's complex pseudo-element styling uses a CSS module; all other styling uses Tailwind v4 utilities.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, next/font/google, next/image, Jest, React Testing Library

## Global Constraints

- Like-for-like: no visual changes — all pixel values, colours, and breakpoints must match the original `styles.css` exactly
- TypeScript strict mode throughout
- Tailwind CSS v4 with CSS-first `@theme` configuration (no `tailwind.config.ts`)
- No `"use client"` directive — all components are React Server Components
- Font: Atkinson Hyperlegible loaded via `next/font/google` (self-hosted, not Google CDN)
- No data fetching in this milestone
- Custom Tailwind breakpoints: `sm = 800px`, `xl = 1180px` (override Tailwind defaults)
- Avatar custom colours: `--color-avatar-orange: #ffb175`, `--color-avatar-teal: #1dfbc7`

---

### Task 1: Scaffold Next.js project and configure test suite

**Files:**
- Create: `package.json` (generated, then extended)
- Create: `tsconfig.json` (generated)
- Create: `next.config.ts` (generated)
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `app/layout.tsx` (stub — replaced in Task 2)
- Create: `app/globals.css` (stub — replaced in Task 2)
- Create: `app/page.tsx` (stub — replaced in Task 6)
- Create: `public/me.jpg`
- Create: `public/me-code-complete.jpg`
- Create: `public/favicon.ico`

**Interfaces:**
- Produces: runnable Next.js dev server, Jest + RTL test suite ready

- [ ] **Step 1: Run create-next-app**

From the `kabul/` directory (which already contains the HTML/CSS files — that's fine):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias '@/*'
```

If prompted interactively, choose: TypeScript ✓, ESLint ✓, Tailwind ✓, no `src/` directory, App Router ✓, `@/*` import alias.

- [ ] **Step 2: Copy existing assets into public/**

```bash
cp me.jpg public/me.jpg
cp me-code-complete.jpg public/me-code-complete.jpg
cp favicon.ico public/favicon.ico
```

- [ ] **Step 3: Remove create-next-app boilerplate**

```bash
rm -f app/page.tsx app/globals.css app/layout.tsx
rm -rf app/fonts
rm -f public/next.svg public/vercel.svg
```

- [ ] **Step 4: Install Jest and React Testing Library**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 5: Create jest.config.ts**

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 6: Create jest.setup.ts**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Add test script to package.json**

In `package.json`, ensure `scripts` contains:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 8: Create stub layout and page so the dev server can start**

`app/globals.css`:
```css
@import "tailwindcss";
```

`app/layout.tsx`:
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`app/page.tsx`:
```tsx
export default function HomePage() {
  return <main>Hello</main>
}
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000. Expect to see "Hello". Stop with Ctrl+C.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with TypeScript, Tailwind v4, and Jest"
```

---

### Task 2: Root layout and global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces:
  - CSS custom properties globally: `--color-avatar-orange: #ffb175`, `--color-avatar-teal: #1dfbc7`
  - Tailwind breakpoints: `sm` (800px), `xl` (1180px)
  - Font variable `--font-atkinson` on `<html>` via next/font class
  - `RootLayout({ children: React.ReactNode })` exported from `app/layout.tsx`

- [ ] **Step 1: Write app/globals.css**

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-atkinson);
  --color-avatar-orange: #ffb175;
  --color-avatar-teal: #1dfbc7;
  --breakpoint-sm: 800px;
  --breakpoint-xl: 1180px;
}
```

- [ ] **Step 2: Write app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-atkinson',
})

export const metadata: Metadata = {
  title: 'Paolo Di Pasquale',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body className="bg-white font-sans text-[1.25rem] leading-[1.7] text-black min-h-[100dvh] flex justify-center xl:text-[2rem]">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify font and body styles**

```bash
npm run dev
```

Open http://localhost:3000 and inspect `<body>` in DevTools. Confirm:
- `font-family` resolves to `Atkinson Hyperlegible`
- `display: flex` and `justify-content: center` on body
- At viewport width > 1180px: `font-size: 2rem`

Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add root layout with Atkinson Hyperlegible font and Tailwind v4 theme"
```

---

### Task 3: LogoSvgs component

**Files:**
- Create: `components/LogoSvgs.tsx`
- Create: `components/__tests__/LogoSvgs.test.tsx`

**Interfaces:**
- Produces: `export default function LogoSvgs(): JSX.Element` — renders a hidden `<svg>` containing `<symbol id="logo-fin">` and `<symbol id="logo-intercom">`. Referenced elsewhere as `<use href="#logo-fin" />`.

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/LogoSvgs.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import LogoSvgs from '../LogoSvgs'

test('renders #logo-fin and #logo-intercom symbols', () => {
  const { container } = render(<LogoSvgs />)
  expect(container.querySelector('#logo-fin')).toBeInTheDocument()
  expect(container.querySelector('#logo-intercom')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test — expect it to fail**

```bash
npm test -- --testPathPattern="LogoSvgs"
```

Expected: FAIL — `Cannot find module '../LogoSvgs'`

- [ ] **Step 3: Create components/LogoSvgs.tsx**

```tsx
export default function LogoSvgs() {
  return (
    <svg style={{ display: 'none' }}>
      <symbol id="logo-fin" viewBox="0 0 32 32">
        <path d="M27.5384 20.4311C30.0167 20.4311 32.0206 18.4015 31.9789 15.9142C31.938 13.4786 29.9004 11.5483 27.4647 11.5483H25.761C24.4874 11.5483 23.3193 11.1006 22.4025 10.3554C22.3137 10.2834 22.3137 10.1484 22.4025 10.0764C23.3193 9.33117 24.4874 8.88347 25.761 8.88347H27.4594C29.9376 8.88347 31.9966 6.88839 31.9789 4.41007C31.9611 1.93176 29.9972 0.0175177 27.5696 0.000640424C25.0914 -0.0171252 23.0963 2.04281 23.0963 4.52023V6.21862C23.0963 7.49242 22.6486 8.66052 21.9034 9.57723C21.8314 9.66606 21.6963 9.66606 21.6245 9.57723C20.8792 8.66052 20.4316 7.49242 20.4316 6.21862V4.44205C20.4316 1.96374 18.4018 -0.0411089 15.9147 0.000640424C13.4791 0.0415015 11.5489 2.07923 11.5489 4.5149V6.21862C11.5489 7.49242 11.1012 8.66052 10.356 9.57723C10.284 9.66606 10.149 9.66606 10.0771 9.57723C9.33184 8.66052 8.88414 7.49242 8.88414 6.21862V4.44205C8.88414 1.93178 6.80117 -0.0926286 4.26964 0.00419432C1.96817 0.0912461 0.092161 1.9673 0.00422332 4.26885C-0.0917087 6.80045 1.93174 8.88347 4.44195 8.88347H6.21847C7.49224 8.88347 8.66031 9.33117 9.577 10.0764C9.66581 10.1484 9.66581 10.2834 9.577 10.3554C8.66031 11.1006 7.49224 11.5483 6.21847 11.5483H4.5148C2.0792 11.5483 0.0415268 13.4786 0.000666816 15.9142C-0.040193 18.3499 1.96284 20.4311 4.44108 20.4311H6.21758C7.49135 20.4311 8.65942 20.8789 9.57609 21.6241C9.66492 21.696 9.66492 21.831 9.57609 21.9031C8.65942 22.6483 7.49135 23.096 6.21758 23.096H4.44108C1.93086 23.096 -0.0934859 25.179 0.0033342 27.7107C0.0903836 30.0121 1.96639 31.8883 4.26875 31.9752C6.80028 32.0712 8.88325 30.0477 8.88325 27.5374V25.7608C8.88325 24.487 9.33095 23.319 10.0762 22.4022C10.1481 22.3134 10.2832 22.3134 10.3551 22.4022C11.103 23.319 11.5507 24.487 11.5507 25.7608V27.4645C11.5507 29.9002 13.4782 31.938 15.9138 31.9789C18.4018 32.0206 20.4306 30.0167 20.4306 27.5383V25.7617C20.4306 24.4879 20.8782 23.3198 21.6236 22.4032C21.6955 22.3144 21.8305 22.3144 21.9024 22.4032C22.6478 23.3198 23.0955 24.4879 23.0955 25.7617V27.5383C23.0955 30.0487 25.1783 32.073 27.7098 31.9762C30.0113 31.8891 31.8874 30.013 31.9744 27.7107C32.0704 25.179 30.0468 23.096 27.5368 23.096H25.7602C24.4864 23.096 23.3183 22.6483 22.4017 21.9031C22.3129 21.831 22.3129 21.696 22.4017 21.6241C23.3183 20.8789 24.4864 20.4311 25.7602 20.4311H27.5368H27.5384ZM14.2155 8.88347H17.7685C19.0423 8.88347 20.2103 9.33117 21.127 10.0764C21.2158 10.1484 21.2158 10.2834 21.127 10.3554C20.2103 11.1006 19.0423 11.5483 17.7685 11.5483H14.2155C12.9417 11.5483 11.7736 11.1006 10.857 10.3554C10.7681 10.2834 10.7681 10.1484 10.857 10.0764C11.7736 9.33117 12.9417 8.88347 14.2155 8.88347ZM8.88591 15.9897V14.2132C8.88591 12.9394 9.33361 11.7713 10.0789 10.8546C10.1508 10.7658 10.2858 10.7658 10.3578 10.8546C11.103 11.7713 11.5507 12.9394 11.5507 14.2132V15.9889V17.7654C11.5507 19.0392 11.103 20.2072 10.3578 21.124C10.2858 21.2128 10.1508 21.2128 10.0789 21.124C9.33361 20.2072 8.88591 19.0392 8.88591 17.7654V15.9897ZM17.7685 23.096H14.2155C12.9417 23.096 11.7736 22.6483 10.857 21.9031C10.7681 21.831 10.7681 21.696 10.857 21.6241C11.7736 20.8789 12.9417 20.4311 14.2155 20.4311H17.7685C19.0423 20.4311 20.2103 20.8789 21.127 21.6241C21.2158 21.696 21.2158 21.831 21.127 21.9031C20.2103 22.6483 19.0423 23.096 17.7685 23.096ZM23.0981 15.9897V17.7664C23.0981 19.0402 22.6503 20.2083 21.9051 21.1249C21.8332 21.2137 21.6982 21.2137 21.6261 21.1249C20.8809 20.2083 20.4333 19.0402 20.4333 17.7664V15.9897V14.2132C20.4333 12.9394 20.8809 11.7713 21.6261 10.8546C21.6982 10.7658 21.8332 10.7658 21.9051 10.8546C22.6503 11.7713 23.0981 12.9394 23.0981 14.2132V15.9897Z" fill="currentColor" />
      </symbol>
      <symbol id="logo-intercom" viewBox="0 0 36 36">
        <path d="M31.171 19.8101C31.171 20.1311 31.045 20.4391 30.821 20.6661C30.7103 20.7783 30.5784 20.8674 30.433 20.9282C30.2876 20.989 30.1316 21.0203 29.974 21.0203C29.8164 21.0203 29.6604 20.989 29.515 20.9282C29.3696 20.8674 29.2377 20.7783 29.127 20.6661C28.9025 20.4378 28.7768 20.1303 28.777 19.8101V9.00013C28.777 8.68013 28.902 8.37113 29.127 8.14413C29.2377 8.03211 29.3695 7.94317 29.5148 7.88247C29.6601 7.82177 29.816 7.79052 29.9735 7.79052C30.131 7.79052 30.2869 7.82177 30.4322 7.88247C30.5775 7.94317 30.7093 8.03211 30.82 8.14413C31.045 8.37113 31.171 8.67913 31.171 9.00013V19.8101ZM30.755 27.3001C30.597 27.4601 26.145 31.2101 17.98 31.2101C9.815 31.2101 5.393 27.4801 5.205 27.3201C4.96581 27.1147 4.81709 26.8234 4.791 26.5091C4.76482 26.1941 4.864 25.8815 5.067 25.6391C5.16868 25.5198 5.29294 25.4218 5.43263 25.3506C5.57232 25.2795 5.72469 25.2367 5.88098 25.2246C6.03728 25.2125 6.19442 25.2314 6.34338 25.2802C6.49234 25.3291 6.63019 25.4069 6.749 25.5091C6.818 25.5601 10.796 28.8191 17.97 28.8191C25.144 28.8191 29.152 25.5401 29.192 25.5101C29.4347 25.3055 29.7481 25.2045 30.0646 25.2288C30.3811 25.2531 30.6754 25.4008 30.884 25.6401C31.0857 25.8791 31.1861 26.1874 31.1639 26.4993C31.1416 26.8112 30.9985 27.1022 30.765 27.3101L30.755 27.3001ZM4.78 9.00013C4.797 8.67813 4.94 8.37613 5.178 8.16113C5.29511 8.0548 5.43209 7.97267 5.58105 7.91947C5.73001 7.86627 5.88803 7.84305 6.046 7.85113C6.342 7.86713 6.62 7.99413 6.829 8.20613C7.037 8.41913 7.16 8.70113 7.174 9.00013V19.7901C7.174 20.1101 7.048 20.4191 6.824 20.6461C6.7133 20.7583 6.58142 20.8474 6.43602 20.9082C6.29062 20.9689 6.1346 21.0003 5.977 21.0003C5.8194 21.0003 5.66338 20.9689 5.51798 20.9082C5.37258 20.8474 5.2407 20.7583 5.13 20.6461C4.90552 20.4178 4.77981 20.1103 4.78 19.7901V9.00013ZM10.786 6.60013C10.804 6.27813 10.947 5.97613 11.185 5.76113C11.3021 5.6548 11.4391 5.57267 11.588 5.51947C11.737 5.46627 11.895 5.44305 12.053 5.45113C12.348 5.46713 12.627 5.59413 12.835 5.80613C13.044 6.01913 13.167 6.30113 13.181 6.60013V22.6001C13.181 22.9211 13.055 23.2291 12.831 23.4561C12.7203 23.5683 12.5884 23.6574 12.443 23.7182C12.2976 23.779 12.1416 23.8103 11.984 23.8103C11.8264 23.8103 11.6704 23.779 11.525 23.7182C11.3796 23.6574 11.2477 23.5683 11.137 23.4561C10.9125 23.2278 10.7868 22.9203 10.787 22.6001L10.786 6.60013ZM16.823 6.00013C16.823 5.68013 16.949 5.37113 17.173 5.14413C17.2837 5.03196 17.4156 4.94289 17.561 4.8821C17.7064 4.82131 17.8624 4.79001 18.02 4.79001C18.1776 4.79001 18.3336 4.82131 18.479 4.8821C18.6244 4.94289 18.7563 5.03196 18.867 5.14413C19.091 5.37113 19.217 5.67913 19.217 6.00013V23.4001C19.217 23.7201 19.091 24.0291 18.867 24.2561C18.7563 24.3683 18.6244 24.4574 18.479 24.5182C18.3336 24.579 18.1776 24.6103 18.02 24.6103C17.8624 24.6103 17.7064 24.579 17.561 24.5182C17.4156 24.4574 17.2837 24.3683 17.173 24.2561C16.9485 24.0278 16.8228 23.7203 16.823 23.4001V6.00013ZM22.76 6.60013C22.76 6.28013 22.886 5.97113 23.11 5.74413C23.2207 5.63196 23.3526 5.54289 23.498 5.4821C23.6434 5.42131 23.7994 5.39001 23.957 5.39001C24.1146 5.39001 24.2706 5.42131 24.416 5.4821C24.5614 5.54289 24.6933 5.63196 24.804 5.74413C25.028 5.97113 25.154 6.27913 25.154 6.60013V22.6001C25.154 22.9211 25.028 23.2291 24.804 23.4561C24.6933 23.5683 24.5614 23.6574 24.416 23.7182C24.2706 23.779 24.1146 23.8103 23.957 23.8103C23.7994 23.8103 23.6434 23.779 23.498 23.7182C23.3526 23.6574 23.2207 23.5683 23.11 23.4561C22.8855 23.2278 22.7598 22.9203 22.76 22.6001V6.60013ZM31.497 0.000132307H4.502C3.91342 -0.00443204 3.3299 0.109143 2.786 0.334132C2.241 0.559464 1.74561 0.889724 1.328 1.30613C0.483121 2.15513 0.00611045 3.30239 0 4.50013L0 31.5001C0.003 32.0941 0.121 32.6821 0.349 33.2301C0.577 33.7791 0.909 34.2761 1.328 34.6941C1.747 35.1121 2.241 35.4421 2.786 35.6661C3.3299 35.8911 3.91342 36.0047 4.502 36.0001H31.497C32.0852 36.0049 32.6683 35.8916 33.212 35.6671C33.7565 35.4423 34.2515 35.1127 34.669 34.6971C35.5136 33.8506 35.9917 32.706 36 31.5101V4.50013C35.994 3.30433 35.5185 2.15873 34.676 1.31013C34.2594 0.893332 33.7651 0.562403 33.221 0.336132C32.6782 0.110851 32.0957 -0.00339682 31.508 0.000132307" fill="currentColor" />
      </symbol>
    </svg>
  )
}
```

- [ ] **Step 4: Run the test — expect it to pass**

```bash
npm test -- --testPathPattern="LogoSvgs"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/LogoSvgs.tsx components/__tests__/LogoSvgs.test.tsx
git commit -m "feat: add LogoSvgs component with Fin and Intercom SVG symbols"
```

---

### Task 4: Nav component

**Files:**
- Create: `components/Nav.tsx`
- Create: `components/__tests__/Nav.test.tsx`

**Interfaces:**
- Produces:
  ```ts
  interface NavLink { label: string; href: string }
  export default function Nav({ links }: { links: NavLink[] }): JSX.Element
  ```

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/Nav.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Nav from '../Nav'

test('renders each link with correct label and href', () => {
  render(
    <Nav
      links={[
        { label: 'Home', href: '/' },
        { label: 'Posts', href: '/posts' },
        { label: 'About', href: '/about' },
      ]}
    />
  )
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute('href', '/posts')
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
})
```

- [ ] **Step 2: Run the test — expect it to fail**

```bash
npm test -- --testPathPattern="Nav.test"
```

Expected: FAIL — `Cannot find module '../Nav'`

- [ ] **Step 3: Create components/Nav.tsx**

```tsx
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
}

export default function Nav({ links }: { links: NavLink[] }) {
  return (
    <nav className="flex gap-8 justify-center">
      {links.map(({ label, href }) => (
        <Link key={href} href={href} className="text-[#0000ee] underline whitespace-nowrap">
          {label}
        </Link>
      ))}
    </nav>
  )
}
```

- [ ] **Step 4: Run the test — expect it to pass**

```bash
npm test -- --testPathPattern="Nav.test"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/__tests__/Nav.test.tsx
git commit -m "feat: add Nav component"
```

---

### Task 5: Avatar component

**Files:**
- Create: `components/Avatar.tsx`
- Create: `components/Avatar.module.css`
- Create: `components/__tests__/Avatar.test.tsx`

**Interfaces:**
- Produces:
  ```ts
  export default function Avatar({ src, alt, float }: {
    src: string
    alt: string
    float?: boolean
  }): JSX.Element
  ```
  CSS module exports: `.avatar`, `.avatarFloat`, `.photo`

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/Avatar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Avatar from '../Avatar'

test('renders photo with correct alt text', () => {
  render(<Avatar src="/me.jpg" alt="Paolo Di Pasquale" />)
  expect(screen.getByRole('img', { name: 'Paolo Di Pasquale' })).toBeInTheDocument()
})

test('applies avatarFloat class when float prop is true', () => {
  const { container } = render(<Avatar src="/me.jpg" alt="test" float />)
  expect(container.firstChild).toHaveClass('avatarFloat')
})
```

- [ ] **Step 2: Run the test — expect it to fail**

```bash
npm test -- --testPathPattern="Avatar.test"
```

Expected: FAIL — `Cannot find module '../Avatar'`

- [ ] **Step 3: Create components/Avatar.module.css**

These pixel values are taken directly from `styles.css` — do not alter them.

```css
.avatar {
  position: relative;
  flex-shrink: 0;
  width: 236px;
  height: 303px;
}

.avatar::before,
.avatar::after {
  content: '';
  position: absolute;
}

.avatar::before {
  top: 0;
  left: 0;
  width: 199px;
  height: 243px;
  background: var(--color-avatar-orange);
}

.avatar::after {
  top: 77px;
  left: 28px;
  width: 208px;
  height: 226px;
  background: var(--color-avatar-teal);
}

.photo {
  position: absolute;
  top: 12px;
  left: 13px;
  width: 209px !important;
  height: 272px !important;
  object-fit: cover;
  z-index: 1;
}

@media (max-width: 1180px) {
  .avatar         { width: 142px; height: 182px; }
  .avatar::before { width: 120px; height: 146px; }
  .avatar::after  { top: 46px; left: 17px; width: 125px; height: 136px; }
  .photo          { top: 7px !important; left: 8px !important; width: 126px !important; height: 163px !important; }
}

.avatarFloat {
  float: right;
  margin: 0 0 1.5rem 2rem;
}

@media (max-width: 600px) {
  .avatarFloat {
    float: none;
    margin: 2.5rem auto 1.5rem;
    display: block;
  }
}
```

- [ ] **Step 4: Create components/Avatar.tsx**

```tsx
import Image from 'next/image'
import styles from './Avatar.module.css'

export default function Avatar({
  src,
  alt,
  float = false,
}: {
  src: string
  alt: string
  float?: boolean
}) {
  return (
    <div className={`${styles.avatar}${float ? ` ${styles.avatarFloat}` : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={209}
        height={272}
        className={styles.photo}
      />
    </div>
  )
}
```

- [ ] **Step 5: Run the tests — expect them to pass**

```bash
npm test -- --testPathPattern="Avatar.test"
```

Expected: PASS (both tests)

- [ ] **Step 6: Commit**

```bash
git add components/Avatar.tsx components/Avatar.module.css components/__tests__/Avatar.test.tsx
git commit -m "feat: add Avatar component with CSS module for pseudo-element layering"
```

---

### Task 6: Home page

**Files:**
- Modify: `app/layout.tsx` (add LogoSvgs)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes:
  - `LogoSvgs()` from `@/components/LogoSvgs`
  - `Nav({ links })` from `@/components/Nav` where `links: { label: string; href: string }[]`
  - `Avatar({ src, alt })` from `@/components/Avatar`
- Produces: `/` route — two-column layout (bio left, avatar right), stacks below 800px

- [ ] **Step 1: Add LogoSvgs to app/layout.tsx**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import LogoSvgs from '@/components/LogoSvgs'
import './globals.css'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-atkinson',
})

export const metadata: Metadata = {
  title: 'Paolo Di Pasquale',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body className="bg-white font-sans text-[1.25rem] leading-[1.7] text-black min-h-[100dvh] flex justify-center xl:text-[2rem]">
        <LogoSvgs />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Write app/page.tsx**

```tsx
import Nav from '@/components/Nav'
import Avatar from '@/components/Avatar'

const NAV_LINKS = [
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function HomePage() {
  return (
    <main className="flex gap-8 items-start pt-[8rem] px-[6%] pb-12 max-sm:flex-col max-sm:items-center max-sm:pt-8 max-sm:pb-8">
      <div className="flex flex-col gap-8">
        <div>
          <p>Ciao&nbsp;👋</p>
          <p className="pl-6 max-sm:pl-0">I&apos;m Paolo, an AI-powered web engineer&nbsp;🤖&nbsp;💪</p>
          <p>Living in Blighty 🇬🇧, hailing from the shores of Sicily&nbsp;🇮🇹</p>
          <p className="pl-6 max-sm:pl-0">
            Part of Team Web @ Fin&nbsp;
            <svg className="inline-block align-middle w-[0.9em] h-[0.9em] relative top-[-0.08em]">
              <use href="#logo-fin" />
            </svg>
            {' '}
            <span className="whitespace-nowrap">
              (fka Intercom&nbsp;
              <svg className="inline-block align-middle w-[0.9em] h-[0.9em] relative top-[-0.08em]">
                <use href="#logo-intercom" />
              </svg>
              )
            </span>
          </p>
        </div>
        <Nav links={NAV_LINKS} />
      </div>
      <div className="flex-1 flex justify-center items-start">
        <Avatar src="/me.jpg" alt="Paolo Di Pasquale" />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Visual check via dev server**

```bash
npm run dev
```

Open http://localhost:3000. Verify against the original `index.html`:
- Two-column layout: bio text left, avatar photo right
- Orange (`#ffb175`) and teal (`#1dfbc7`) blocks visible behind the photo
- Fin and Intercom SVG logos render inline in the bio text
- "Posts" and "About" nav links appear below the bio
- Narrow to < 800px: layout stacks vertically, the two indented lines (`pl-6`) lose their indent

Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: add home page with two-column bio and avatar layout"
```

---

### Task 7: About page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes:
  - `Nav({ links })` from `@/components/Nav`
  - `Avatar({ src, alt, float })` from `@/components/Avatar`
- Produces: `/about` route — single-column editorial layout, avatar floats right

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Avatar from '@/components/Avatar'

export const metadata: Metadata = {
  title: 'About — Paolo Di Pasquale',
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function AboutPage() {
  return (
    <main className="flow-root max-w-[60ch] pt-[8rem] px-[6%] pb-12 max-sm:pt-8 max-sm:pb-8">
      <Nav links={NAV_LINKS} />
      <h1 className="text-[1.953125rem] leading-[1.2]">About</h1>
      <Avatar src="/me-code-complete.jpg" alt="Paolo Di Pasquale" float />
      <div className="text-[1.25rem] leading-[1.7]">
        <p>
          My name is Paolo Di Pasquale and this is my personal website. It&apos;s for writing and
          capturing lots of different stuff including, but not limited to my work as a web engineer.
          My domain name is <code>itanglo.io</code>, it&apos;s a play on words that refers to my
          mixed heritage. My late father was Italian and my mother is English. I was born in Italy
          and moved over to England with my family when I was 8 years old. This makes me an Italian
          Anglo, or &quot;Itanglo&quot;. The top level domain of <code>.io</code> has the fortunate
          coincidence that &quot;io&quot; means &quot;me&quot; in Italian.
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Visual check via dev server**

```bash
npm run dev
```

Open http://localhost:3000/about. Verify against the original `about.html`:
- Single-column layout, max ~60ch wide, centred in the viewport
- Avatar floats right with bio text wrapping around it
- Nav at top: Home, Posts, About
- Narrow below 600px: avatar un-floats and centres above the bio text

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page with editorial float layout"
```

---

### Task 8: Posts page

**Files:**
- Create: `app/posts/page.tsx`

**Interfaces:**
- Consumes: `Nav({ links })` from `@/components/Nav`
- Produces: `/posts` route — placeholder page matching original `posts.html`

- [ ] **Step 1: Create app/posts/page.tsx**

```tsx
import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Posts — Paolo Di Pasquale',
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function PostsPage() {
  return (
    <main className="flow-root max-w-[60ch] pt-[8rem] px-[6%] pb-12 max-sm:pt-8 max-sm:pb-8">
      <Nav links={NAV_LINKS} />
      <div className="text-[1.25rem] leading-[1.7]">
        <p>Nothing to see yet.</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Visual check**

```bash
npm run dev
```

Open http://localhost:3000/posts. Confirm: nav (Home, Posts, About) + "Nothing to see yet." matching the original `posts.html`.

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/posts/page.tsx
git commit -m "feat: add posts placeholder page"
```

---

### Task 9: Remove legacy files and verify production build

**Files:**
- Delete: `index.html`
- Delete: `about.html`
- Delete: `posts.html`
- Delete: `styles.css`

**Interfaces:**
- Consumes: All prior tasks complete
- Produces: Clean repo, all tests passing, production build succeeds with 3 static routes

- [ ] **Step 1: Delete the legacy static files**

```bash
rm index.html about.html posts.html styles.css
```

- [ ] **Step 2: Run all tests**

```bash
npm test
```

Expected: all tests pass (LogoSvgs, Nav, Avatar).

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected output includes three static (`○`) routes:
```
Route (app)                Size
┌ ○ /                      ...
├ ○ /about                 ...
└ ○ /posts                 ...
```

If the build reports errors, fix them before continuing.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove legacy HTML/CSS files — Next.js migration complete"
```
