# EventEase AI – Your Smart Event Planning Assistant ✨

> **Plan Smarter. Celebrate Better.**  
> A production-ready, full-spectrum event management web application powered by Generative AI (Google Gemini), designed for **Weddings**, **Birthday Parties**, and **Community Gatherings**.

---

## 🌟 Overview & Key Highlights

EventEase AI re-imagines event planning by transforming fragmented notes, spreadsheets, and vendor negotiations into a centralized, intelligent, and interactive experience.

- 👑 **Weddings & Receptions**: Multiday ritual scheduling (Mehendi, Sangeet, Pheras), mandap & floral styling, authentic regional catering menus, and bridal vendor directories.
- 🎈 **Milestone Birthdays**: Thematic decor concepts (Boho Chic, Neon Retro), custom artisan cake orders, age-appropriate guest activities, and live acoustic music curation.
- 🏛️ **Community & Cultural Carnivals**: Large-scale logistics, stage line-array sound, municipal & fire safety NOC checklists, waste management, and volunteer coordination.
- 💰 **Strict Indian Rupee (INR ₹) Budget Calibration**: Automatically calculates allocations matching the host's budget ceiling without overruns.
- 💬 **EventEase AI Assistant**: Floating contextual AI chat assistant with pre-built prompt accelerators for instant planning advice.

---

## 🚀 Architecture & Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 with Vite 6 & TypeScript |
| **Styling & Design** | Tailwind CSS with custom palette (warm ivory, soft lavender, muted rose, deep navy) |
| **Icons & Typography** | Lucide React & Google Fonts (Playfair Display + Plus Jakarta Sans) |
| **Data Visualization** | Recharts (Interactive Donut & Bar Charts) |
| **Generative AI** | Google Gemini API (`gemini-1.5-flash`, `gemini-2.0-flash`) |
| **Persistence & Auth** | Firebase Authentication & Cloud Firestore (with automatic LocalStorage offline fallback) |
| **Celebrations** | Canvas Confetti for milestone completions |

---

## 📱 Pages & Feature Modules

1. **Home (`/`)**:
   - Hero banner with "Plan Smarter. Celebrate Better."
   - 3 Event Category Cards with direct planning triggers
   - "How It Works" 3-step breakdown
   - "Why Choose EventEase AI" comparison & trust indicators
   - Comprehensive footer with quick navigation links
2. **Plan an Event (`/plan`)**:
   - Interactive category selection (Wedding, Birthday, Community Event)
   - Dynamic conditional form inputs (Bride/Groom names, Ceremonies, Age milestones, Venue types, NOC permits)
   - Input validation and professional multi-step loading animation
3. **AI Event Planner (`/ai-planner`)**:
   - Section A: Event Overview (Concept, Recommended Theme, Hex Color Palette, Decor Ideas)
   - Section B: Estimated Budget Breakdown in INR ₹
   - Section C: Chronological Preparation Timeline
   - Section D: Vendor Checklist with deliverables
   - Section E: Personalized Ideas (Food Menu, Guest Activities, Cost-Saving Alternatives)
   - Print to PDF and Share capabilities
4. **Budget Planner (`/budget`)**:
   - Live financial summary (Total Budget, Estimated, Actual Spent, Remaining Balance)
   - Recharts visual pie & comparative bar charts
   - Dynamic over-budget and over-allocation warning banners
   - Inline editing and custom expense category creation
5. **Smart Event Timeline (`/timeline`)**:
   - Chronological task list with priority tags (High, Medium, Low)
   - Overdue deadline alerts relative to the current date
   - Interactive checkbox milestone completion with confetti animations
   - Overall planning progress meter
6. **Vendor Checklist (`/vendors`)**:
   - Directory with status badges (Pending, Contacted, Shortlisted, Booked, Declined)
   - Direct phone and email links
   - Estimated vs. agreed actual contract costs
   - Custom vendor addition and status filters
7. **My Events Dashboard (`/my-events`)**:
   - Switch active event across the platform
   - Edit event core parameters (name, date, budget, guest count)
   - Delete confirmation modal
   - Visual progress and budget utilization metrics
8. **About Us (`/about`)**:
   - Platform mission, Gemini AI architectural overview, and cultural event planning philosophy

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
- Node.js version 18 or higher (Node 20+ recommended)
- npm or pnpm

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd EventEase-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your configuration:
```env
# Google Gemini API Key (Required for live Generative AI generation)
# Obtain a free key at: https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (Optional - falls back to robust LocalStorage persistence)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note on Demo Mode:**  
> If no Gemini API key or Firebase configuration is provided, EventEase AI operates in a **clearly labeled Demo Simulation Mode** with domain-authentic sample data for Weddings, Birthdays, and Community events.

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 🔒 Security & Privacy

- Secret API keys are never hardcoded and are loaded strictly via `import.meta.env`.
- Firebase Authentication supports Email/Password as well as 1-Click Guest access.
- All user event records are segregated by user UID in Firestore or scoped to local browser storage.

---

© 2026 EventEase AI. Crafted with ❤️ for memorable celebrations.

