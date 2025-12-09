# 🛠️ Project Toolkit – React Startup To‑Do App

This document lists the essential tools, libraries, and resources required for developing, testing, and deploying the React Startup To‑Do App.

---

## 🚀 Development Environment
- **Node.js**: v18.x (required for some dependencies like `postcss-load-config`)
- **npm**: v9.x or higher
- **Git**: Version control
- **VS Code**: Recommended IDE with ESLint + Prettier extensions

---

## 📦 Core Libraries
- **React** (v18) – UI framework
- **React DOM** – Rendering React components
- **React Scripts** (v5.0.1) – Build and development tooling
- **Web Vitals** – Performance metrics (used in `reportWebVitals.js`)

---

## 🧪 Testing Tools
- **Jest** – Unit testing framework
- **React Testing Library** – Component testing

---

## 📤 Deployment Tools
- **Localhost** – Default development server (`npm start`)
- **Optional Hosting** – Vercel / Netlify (recommended for React apps, smoother than GitHub Pages)

---

## 🔧 Useful Commands
- `npm install` – Install dependencies
- `npm start` – Run the app locally at `http://localhost:3000`
- `npm test` – Run test suites
- `npm run build` – Create production build

---

## ⚠️ Notes & Common Issues
- **Node version**: Use Node 18, not Node 16, to avoid `EBADENGINE` errors.
- **Web Vitals**: If you see `can't resolve 'web-vitals'`, run:
  ```cmd
  npm install web-vitals

Deprecation warnings: Safe to ignore for now; they come from indirect dependencies in react-scripts.

GitHub Pages: If deploying, add "homepage" to package.json. For local dev, remove it.

## 📚 Resources
- [React Docs](https://react.dev/)
- [Create React App Docs](https://create-react-app.dev/)
- [Jest Docs](https://jestjs.io/)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)


---


