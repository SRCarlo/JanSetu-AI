# JanSetu AI 🇮🇳

### AI-Powered Multilingual Citizen Development Intelligence Platform

JanSetu AI is a multilingual AI platform designed to transform citizen voices, text, and development requests into structured intelligence for policymakers.

It helps identify community problems, understand their context, classify development needs, assess urgency, and generate AI-assisted recommendations for better infrastructure and public-service planning.

> **AI recommends. Policymakers make the final decision.**

---

## 🚀 Key Features

- 🌐 **Multilingual Citizen Input** — Marathi, Hindi, and English
- 🎤 **Voice-Based Requests** — browser speech recognition for citizen voices
- 🤖 **AI-Powered Analysis** — converts natural-language requests into structured data
- 📊 **Development Intelligence** — identifies category, urgency, affected groups, and problem details
- 🎯 **Priority Scoring** — combines citizen demand, urgency, infrastructure gap, population impact, and vulnerability
- 🏛️ **Policy Recommendations** — AI-assisted recommendations for development planning
- 📍 **Location-Aware Requests** — captures district and state information
- 📱 **Fully Responsive UI** — designed for desktop, tablet, and mobile
- 🔐 **Privacy-Aware Design** — follows data minimisation and responsible AI principles

---

## 🧠 How JanSetu AI Works

```text
Citizen
   │
   ├── Text
   ├── Voice
   └── Regional Language
          │
          ▼
   Citizen Portal
          │
          ▼
   AI Request Analysis
          │
          ├── Problem Identification
          ├── Category Classification
          ├── Urgency Detection
          └── Affected Groups
          │
          ▼
   Development Intelligence
          │
          ├── Citizen Demand
          ├── Infrastructure Gap
          ├── Population Impact
          └── Vulnerability
          │
          ▼
   Priority Scoring
          │
          ▼
   AI Policy Recommendation
          │
          ▼
   Policymaker Decision
```

---

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│        Citizen Portal         │
│       React + TypeScript      │
│                               │
│  Marathi • Hindi • English    │
│       Text + Voice Input      │
└───────────────┬───────────────┘
                │
                │ REST API
                ▼
┌───────────────────────────────┐
│          Backend API          │
│      Node.js + TypeScript     │
│                               │
│  Request Processing           │
│  AI Analysis                  │
│  Priority Intelligence        │
│  Policy Recommendation        │
└───────────────┬───────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │   Groq AI    │
│   + Prisma   │  │     LLM      │
└──────────────┘  └──────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Icons
- Browser Web Speech API

### Backend

- Node.js
- TypeScript
- REST API
- Prisma ORM
- PostgreSQL

### AI

- Groq API
- AI-powered request analysis
- AI-assisted policy recommendations
- Multilingual citizen understanding

### Development

- Git
- GitHub
- ESLint
- TypeScript

---

## 📁 Project Structure

```text
JanSetu-AI/
│
├── frontend/
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useSpeechRecognition.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── speech.d.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── types/
│   │   └── utils/
│   ├── prisma/
│   ├── package.json
│   └── .env.example
│
├── docs/
├── .gitignore
├── README.md
└── LICENSE
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/SRCarlo/JanSetu-AI.git
cd JanSetu-AI
```

---

## 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

Backend API:

```text
http://localhost:5000
```

---

## 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

---

# 🎤 Voice Input

JanSetu AI uses the browser's Speech Recognition API.

Supported languages:

| Language | Recognition Code |
|---|---|
| Marathi | `mr-IN` |
| Hindi | `hi-IN` |
| English | `en-IN` |

For the best experience, use a browser with Web Speech API support such as Google Chrome.

Microphone permission is required for voice input.

---

# 📊 Priority Intelligence

JanSetu AI calculates development priority using multiple signals:

```text
Citizen Demand
      +
Urgency
      +
Infrastructure Gap
      +
Population Impact
      +
Vulnerability
      ↓
Priority Score
```

Priority levels:

```text
80–100  → CRITICAL
60–79   → HIGH
40–59   → MEDIUM
0–39    → LOW
```

The scoring system is designed to help policymakers identify requests that may require greater attention.

---

# 🤖 AI Analysis

A citizen request can be transformed into structured information such as:

```json
{
  "category": "WATER",
  "urgency": "HIGH",
  "problem": "Lack of reliable drinking water",
  "affectedGroups": [
    "Residents",
    "Children",
    "Elderly"
  ],
  "summary": "The community lacks reliable access to drinking water.",
  "confidence": 0.91
}
```

The structured output can then be used by the intelligence layer for priority assessment and recommendations.

---

# 🌍 Designed for India

JanSetu AI is designed around India's linguistic and geographic diversity.

The platform can support expansion toward:

- Regional Indian languages
- Voice-first citizen interaction
- WhatsApp-based reporting
- District-level dashboards
- Infrastructure intelligence
- Government scheme mapping
- Public grievance intelligence
- Development priority heatmaps

---

# 🔐 Responsible AI

JanSetu AI follows a human-led approach.

### AI does

- Understand citizen requests
- Structure unstructured information
- Identify development categories
- Estimate urgency
- Generate recommendations
- Assist prioritisation

### Policymakers do

- Verify information
- Evaluate feasibility
- Allocate resources
- Make final decisions

> **JanSetu AI assists decision-making; it does not replace human governance.**

---

# 🎯 Hackathon Vision

JanSetu AI aims to bridge the gap between:

```text
Citizen Voice
      ↓
AI Understanding
      ↓
Development Intelligence
      ↓
Policy Priorities
      ↓
Better Public Infrastructure
```

The long-term vision is to build a scalable Digital Public Good that enables governments and communities to turn citizen feedback into actionable development intelligence.

---

# 🔮 Future Roadmap

- [ ] 22+ Indian language support
- [ ] WhatsApp citizen integration
- [ ] Government/policymaker dashboard
- [ ] District-level analytics
- [ ] Interactive infrastructure maps
- [ ] Priority heatmaps
- [ ] Government scheme recommendation
- [ ] Offline/low-connectivity support
- [ ] Advanced demographic and vulnerability analysis
- [ ] Cloud deployment and scalable infrastructure

---

# 👨‍💻 Author

**SRCarlo**

GitHub:  
https://github.com/SRCarlo

---

# 📄 License

This project is intended for educational, research, and hackathon purposes.

Add an appropriate open-source license before production/public deployment.

---

## 🇮🇳 JanSetu AI

**Giving every citizen a voice in development.**

> *Listen to citizens. Understand their needs. Prioritize development.*
