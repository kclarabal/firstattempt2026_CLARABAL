# ADDU Nation — Alumni Network Web Application

**Title:** ADDU Nation Alumni Network
**Framework:** SvelteKit (Svelte JS)
**Module:** Web Application Development

---

## AI Tools Used

| Tool | Role in Development |
|------|-------------------|
| **Claude AI** (Anthropic) | Primary code generation, UI architecture, CSS design system, component logic |
| **ChatGPT** (OpenAI) | Alternative prompt exploration, layout suggestions |
| **Gemini** (Google) | Color palette and accessibility review |
| **DeepSeek** | Navigation flow and state management ideas |

---

## About the Project

A web-based Alumni Network platform for **Ateneo de Davao University (ADDU)**, built using **Svelte JS**. This application is based on the mobile UI/UX design submitted in Activity #10 and adapted for web.

### Features Covered (23 Screens)

**Alumni User View**
- Login / Biometric Authentication
- Home Dashboard (Daily Snapshot, Activity Feed)
- Account Overview (Quick Actions, Impact, Transactions)
- Alumni Network (Search, Featured Alumni, Connect)
- Donation Hub (Browse, Donate, Campaigns)
- Student Project Discovery & Detail View
- Student Project Thank You / Donation Complete
- Emergency Discovery & Detail View
- Emergency Thank You
- Pledge & Automate (Recurring Donations)
- Create Campaign (4-step form)
- Career Dashboard (Job Board, Mentorship)
- Document Dashboard (Academic Passport, Request Services)
- Alumni Profile (Academic Passport, Credentials)

**Admin / Staff View**
- Admin Home (Daily Overview, Activity)
- Moderation Queue (All / Donations / Network filter)
- Donation Queue Board
- Review Queue (Charity Review Detail)
- Donation Insights (Trends Chart, Category Breakdown)
- Alumni Coordinator Profile (Gold Academic Passport)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- Git

### Steps to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/firstattempt2026_<lastname>.git

# 2. Navigate into the project folder
cd firstattempt2026_<lastname>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open your browser and visit:
#    http://localhost:5173
```

### To Build for Production

```bash
npm run build
npm run preview
```

> **Note:** The `index.html` in the root is a fully standalone version that works by simply opening in any browser — no build step required for quick preview.

---

## Prompts Used

### Primary Prompt (Full Project Generation)
> *Attached: 23 design screenshots of the ADDU Nation Alumni mobile app*
>
> "Using Svelte JS framework, build a complete web application based on these 23 mobile UI screens. The app is called 'ADDU Nation Alumni Network' for Ateneo de Davao University. Include all pages: Login, Home (Alumni), Account Overview, Network Dashboard, Donation Hub, Student Project Discovery, Student Project Detail, Student Project Thank You, Emergency Discovery, Emergency Detail, Emergency Thank You, Pledge & Automate, Create Campaign, Career Dashboard, Document Dashboard, Alumni Profile, Admin Home, Moderation Queue, Donation Queue Board, Review Queue, Donation Insights, and Alumni Coordinator Profile. Use a dark navy (#0D1B4B) and gold (#B8922A) color scheme matching the original design. Include sidebar navigation, responsive layout, working tab filters, and interactive elements."

### First Prompt
> "I have 17 images of a mobile app design for an alumni network. Can you help me identify all the unique screens?"

### Follow-up Prompts
- "Make the sidebar responsive with a hamburger menu for mobile"
- "Add an interactive donut chart for the donation insights"
- "Style the academic passport card with a gradient matching the gold variant"
- "Add queue filter tabs that hide/show items by type"

---

## Screenshots

> *(Replace these with actual browser screenshots after running the app)*
## 01 — Login Page
![Login](Screenshots/Login.png)

## 02 — Alumni Home Dashboard
![Home](Screenshots/Alumni%20Home%20Dashboard.png)

## 03 — Network Dashboard
![Network](Screenshots/Network%20Dashboard.png)

## 04 — Donation Hub
![Donate](Screenshots/Donation%20Hub.png)

## 05 — Emergency Aid
![Emergency](Screenshots/Emergency%20Aid.png)

## 06 — Career Opportunities
![Career](Screenshots/Career%20Opportunities.png)

## 07 — Academic Records / Documents
![Documents](Screenshots/Academic%20Records.png)

## 08 — My Profile (Academic Passport)
![Profile](Screenshots/My%20Profile.png)

## 09 — Admin Home
![Admin](Screenshots/Admin%20Home.png)

## 10 — Moderation Queue
![Queue](Screenshots/Moderation%20Queue.png)

## 11 — Review Queue Detail
![Review](Screenshots/Review%20Queue.png)

## 12 — Donation Insights
![Insights](Screenshots/Donation%20Insights.png)

## 13 — Pledge & Automate
![Pledge](Screenshots/Create%20Campaign.png)
---

## Tech Stack

- **Framework:** Svelte / SvelteKit
- **Styling:** Pure CSS with CSS Custom Properties (no external CSS framework)
- **Fonts:** Playfair Display (headings) + DM Sans (body) + DM Mono (data)
- **Charts:** Inline SVG (no library dependency)
- **Icons:** Unicode emoji (no icon library needed)

---

## Project Structure

```
firstattempt2026_lastname/
├── index.html          ← Standalone web app (open in browser)
├── README.md           ← This file
├── src/
│   ├── App.svelte      ← Root Svelte component
│   ├── routes/         ← SvelteKit page routes
│   └── lib/
│       └── components/ ← Reusable Svelte components
├── public/             ← Static assets
└── package.json
```

---

## Author

**[Your Last Name], [Your First Name]**
Course: 4-112 MW 7:30AM / 4-111 MW 9:00AM
Academic Year: 2025–2026
