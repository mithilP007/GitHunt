
  </svg>
</p>

<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=FF00CC&center=true&vCenter=true&width=600&lines=Turn+Your+Code+Into+Cash+%F0%9F%92%B0;AI-Powered+Bounty+Hunting+%F0%9F%A4%96;One+Dashboard.+All+Platforms.+%F0%9F%94%A5" alt="Typing Animation" />
</h1>

<p align="center">
  <a href="https://github.com/mithilP007/GitHunt/stargazers">
    <img src="https://img.shields.io/github/stars/mithilP007/GitHunt?style=for-the-badge&logo=github&color=ff00cc&labelColor=1a1a2e" alt="Stars"/>
  </a>
  <a href="https://github.com/mithilP007/GitHunt/network/members">
    <img src="https://img.shields.io/github/forks/mithilP007/GitHunt?style=for-the-badge&logo=github&color=3333ff&labelColor=1a1a2e" alt="Forks"/>
  </a>
  <a href="https://github.com/mithilP007/GitHunt/issues">
    <img src="https://img.shields.io/github/issues/mithilP007/GitHunt?style=for-the-badge&logo=github&color=ff4757&labelColor=1a1a2e" alt="Issues"/>
  </a>
  <a href="https://github.com/mithilP007/GitHunt/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mithilP007/GitHunt?style=for-the-badge&logo=github&color=2ed573&labelColor=1a1a2e" alt="License"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/NextAuth-4.24-green?style=flat-square&logo=auth0&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white"/>
</p>

---

## 🎯 What is GitHunt?

**GitHunt** is the ultimate bounty hunting platform for developers. We aggregate **5,000+ open-source bounties** from **Algora, Gitcoin, IssueHunt, Opire, and Polar** into one sleek, AI-powered dashboard. Stop jumping between tabs — find bounties that match *your* skills and start earning today.

> 🚀 **"Turn Your Code Into Cash"** — AI-powered matching. Find opportunities that fit your skills, learn new technologies, and earn money solving real-world problems.

---

## ✨ Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🤖 **AI-Powered Matching** | Analyzes your GitHub profile, skills, and success rate to recommend bounties you're most likely to complete | ✅ Live |
| 🔍 **Unified Bounty Feed** | Browse 5,000+ bounties from multiple platforms in one dashboard | ✅ Live |
| ❤️ **Wishlist** | Save bounties to your personal wishlist with localStorage persistence | ✅ Live |
| 🏆 **Leaderboard** | Compete with other hunters on the "Top Open Source Hunters" board | ✅ Live |
| 🔐 **GitHub OAuth** | Secure sign-in via NextAuth.js with GitHub integration | ✅ Live |
| 📚 **Learn & Earn** | Access tutorials, video courses, and mentorship programs | 🚧 In Progress |
| 🤖 **AI Assistant** | Smart assistant to help you pick and solve bounties | 🚧 Coming Soon |

---

## 🎬 Live Demo

<p align="center">
  <a href="https://githunt.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Try_Live_Demo-FF00CC?style=for-the-badge&logo=vercel&logoColor=white&labelColor=1a1a2e" alt="Live Demo"/>
  </a>
  <a href="https://stackblitz.com/github/mithilP007/GitHunt" target="_blank">
    <img src="https://img.shields.io/badge/⚡_Open_in_StackBlitz-3333FF?style=for-the-badge&logo=stackblitz&logoColor=white&labelColor=1a1a2e" alt="StackBlitz"/>
  </a>
</p>

---

graph LR
    A[✅ MVP Launch] --> B[🚧 AI Assistant]
    A --> C[🚧 Real Bounty API Integration]
    B --> D[🔮 Mobile App]
    C --> D
    D --> E[🔮 Bounty Notifications]

|  #  | Category              | Feature                                           | Status |
| :-: | :-------------------- | :------------------------------------------------ | :----: |
|  1  | **Frontend & UI**     | Landing Page (Hero, Features, Stats, CTA, Footer) |    ✅   |
|  2  | **Frontend & UI**     | Responsive Navbar with GitHub Auth toggle         |    ✅   |
|  3  | **Frontend & UI**     | Bounties Listing Page (`/bounties`)               |    ✅   |
|  4  | **Frontend & UI**     | Wishlist System (`localStorage` persistence)      |    ✅   |
|  5  | **Frontend & UI**     | AI Recommendations UI (dummy data)                |    ✅   |
|  6  | **Frontend & UI**     | Leaderboard UI                                    |    ✅   |
|  7  | **Frontend & UI**     | Conditional Rendering (post-sign-in sections)     |    ✅   |
|  8  | **Frontend & UI**     | Global Styles & Cyberpunk Theme                   |    ✅   |
|  9  | **Frontend & UI**     | Favicon & Metadata                                |    ✅   |
|  10 | **Frontend & UI**     | Mobile Responsiveness                             |    ✅   |
|  11 | **Frontend & UI**     | Skeleton Loading States                           |    ✅   |
|  12 | **Frontend & UI**     | Dark Mode Toggle                                  |   🚧   |
|  13 | **Frontend & UI**     | Bounty Detail Page                                |   🚧   |
|  14 | **Frontend & UI**     | User Profile Page                                 |   🚧   |
|  15 | **Frontend & UI**     | Search & Filter Bar                               |   🚧   |
|  16 | **Frontend & UI**     | Empty States                                      |   🚧   |
|  17 | **Frontend & UI**     | Toast Notifications                               |   🚧   |
|  18 | **Frontend & UI**     | Pagination / Infinite Scroll                      |   🚧   |
|  19 | **Backend & API**     | NextAuth GitHub OAuth                             |    ✅   |
|  20 | **Backend & API**     | Bounties API Route (mock data)                    |    ✅   |
|  21 | **Backend & API**     | AI Analyze API (`route.ts` empty)                 |   🚧   |
|  22 | **Backend & API**     | AI Assistant API (`route.ts` empty)               |   🚧   |
|  23 | **Backend & API**     | Real Bounty Aggregation (Algora, Gitcoin, etc.)   |   🚧   |
|  24 | **Backend & API**     | Database Schema (Prisma)                          |   🚧   |
|  25 | **Backend & API**     | API Documentation (`API_DOCUMENTATION.md` empty)  |   🚧   |
|  26 | **Backend & API**     | Rate Limiting                                     |   🚧   |
|  27 | **Backend & API**     | Input Validation (Zod)                            |   🚧   |
|  28 | **Backend & API**     | Error Handling                                    |   🚧   |
|  29 | **Backend & API**     | CORS Configuration                                |   🚧   |
|  30 | **Backend & API**     | Webhook Handlers                                  |   🚧   |
|  31 | **Auth & Security**   | GitHub OAuth Sign-In                              |    ✅   |
|  32 | **Auth & Security**   | Session Management                                |    ✅   |
|  33 | **Auth & Security**   | Protected Routes                                  |   🚧   |
|  34 | **Auth & Security**   | Role-Based Access                                 |   🚧   |
|  35 | **Auth & Security**   | API Key Management                                |   🚧   |
|  36 | **AI & Smart**        | AI Recommendation UI                              |    ✅   |
|  37 | **AI & Smart**        | Real AI Profile Analysis                          |   🚧   |
|  38 | **AI & Smart**        | AI Bounty Assistant                               |   🚧   |
|  39 | **AI & Smart**        | Smart Matching Algorithm                          |   🚧   |
|  40 | **AI & Smart**        | Auto-Tagging                                      |   🚧   |
|  41 | **Payments**          | Earnings Dashboard                                |   🚧   |
|  42 | **Payments**          | Payment Status Tracking                           |   🚧   |
|  43 | **Payments**          | Wallet Integration                                |   🚧   |
|  44 | **Payments**          | Withdrawal Flow                                   |   🚧   |
|  45 | **DevOps & Tooling**  | ESLint Config                                     |    ✅   |
|  46 | **DevOps & Tooling**  | TypeScript Config                                 |    ✅   |
|  47 | **DevOps & Tooling**  | Environment Template (`.env.example`)             |    ✅   |
|  48 | **DevOps & Tooling**  | Vercel Deployment                                 |    ✅   |
|  49 | **DevOps & Tooling**  | Prettier Config                                   |   🚧   |
|  50 | **DevOps & Tooling**  | Jest / Vitest Setup                               |   🚧   |
|  51 | **DevOps & Tooling**  | Husky Pre-commit Hooks                            |   🚧   |
|  52 | **DevOps & Tooling**  | GitHub Actions CI                                 |   🚧   |
|  53 | **DevOps & Tooling**  | Docker Compose                                    |   🚧   |
|  54 | **DevOps & Tooling**  | Sitemap & Robots.txt                              |   🚧   |
|  55 | **DevOps & Tooling**  | Open Graph Images                                 |   🚧   |
|  56 | **PWA & Performance** | Code Splitting                                    |    ✅   |
|  57 | **PWA & Performance** | Service Worker                                    |   🚧   |
|  58 | **PWA & Performance** | Manifest.json                                     |   🚧   |
|  59 | **PWA & Performance** | Push Notifications                                |   🚧   |
|  60 | **PWA & Performance** | Image Optimization (`next/image`)                 |   🚧   |
|  61 | **PWA & Performance** | Core Web Vitals                                   |   🚧   |
