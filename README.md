# Ai24 - Enabling Intelligence

**Ai24** is a premium, futuristic web application designed for an AI-Driven Growth Engineering firm. It replaces standard web design with a deterministic, cinematic UI to reflect its high-end, hyper-scalable architecture solutions.

## ✨ Features

- **Premium Sci-Fi Aesthetics:** Custom glassmorphism, floating holographic interfaces, and deep dark "Data-Driven Reality" UI layouts.
- **Cinematic Animations:** Deep integration of smooth scrolling, scroll-triggered visualizers, and heavy use of `framer-motion` and `gsap`.
- **Custom Interactive Cursor:** A unique, responsive "targeting crosshair" and "AI core" cursor that dynamically reacts to user hovers.
- **Global Ecosystem Visualizer:** Highly interactive and dynamic hubs showcasing the company's "Growth Infrastructure."

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** React Router v7
- **Styling:** Custom Vanilla CSS (with heavy use of dynamic variables and complex gradients)
- **Animation & Interactions:** 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://gsap.com/)
  - [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate into the directory:**
   ```bash
   cd ai24Redesingn/ai24React
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```
   *(Or `yarn install` / `pnpm install` depending on your package manager)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   You can preview the built site using `npm run preview`.

## 📂 Project Structure

- `src/assets/` - Images, logos, and static media files.
- `src/components/` - Reusable UI components (Navbar, Custom Cursor, Cards).
- `src/data/` - Contains `mockData.js` feeding the content for the site.
- `src/pages/` - Core routing pages (`Home.jsx`, `About.jsx`, `Features.jsx`, `Services.jsx`, etc.) along with their respective `.css` style modules.
- `index.html` - The main entry point.

## 🎨 Design Philosophy

The aesthetic skips "boring agency cards" entirely in favor of an **"Architecture Deck"** feel. Heavy emphasis is placed on:
- **Color Palette:** Pure darkness (`#05070B`), illuminated by highly specific highlights: **Gold** (`var(--gold)`) and **Ice Blue** (`var(--ice)`).
- **Glows over Shadows:** Leveraging `mix-blend-mode: screen` and layered, softly colored `box-shadow`s instead of hard drop-shadows.
- **Micro-interactions:** Interactive borders, scanning laser lines, pulsing dots, and background grids.
