# IXILIS | Interface Architecture

This is a high-fidelity frontend project built with **TypeScript** and **Vite**.

## 1. Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [Git](https://git-scm.com/)

### Installation
1. Open your terminal in this project folder.
2. Install the necessary build tools:
   ```bash
   npm install
   ```

### Asset Setup
The code references images in an `assets` folder.
1. Create a folder named `assets` in this root directory.
2. Add your project images (`.png` or `.jpg`).
3. Ensure filenames match the paths in `index.tsx` (e.g., `amana-hero-landing.png`).

### Running Development Server
To view the site locally with hot-reloading:
```bash
npm run dev
```
Click the link shown in the terminal (usually `http://localhost:5173`).

---

## 2. Pushing to GitHub

1. Log in to GitHub and [create a new repository](https://github.com/new).
2. Do **not** initialize it with a README, .gitignore, or license (we already have them).
3. Run these commands in your project terminal:

```bash
# 1. Initialize Git in your project
git init

# 2. Stage all files
git add .

# 3. Commit your files
git commit -m "Initial launch of IXILIS"

# 4. Rename branch to main
git branch -M main

# 5. Connect to your GitHub repo (Replace the URL below with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push code
git push -u origin main
```

---

## 3. Building for Production

To create a finalized version for hosting (Netlify, Vercel, etc.):
```bash
npm run build
```
This will create a `dist` folder containing the optimized HTML, CSS, and JS.