# Markwise

> **Brand-safe content, explained.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

---

## The Problem

Modern enterprises publish thousands of words daily across decentralized marketing teams, agencies, and generative AI tools. This scale creates three critical operational vulnerabilities:

* **Unsupported Claims:** Marketing copy inadvertently promises product performance, latency benchmarks, or regulatory guarantees that have not been substantiated.
* **Outdated Facts:** Copywriters recycle superseded compliance statistics, expired partnership agreements, or retired security assertions.
* **Brand Drift:** Subtle shifts in voice, speculative superlatives, and non-defensible buzzwords erode enterprise credibility and expose organizations to regulatory exposure (e.g., FTC §5 compliance).

Traditional manual review processes create painful bottlenecks, while black-box AI checkers provide arbitrary risk scores without citing policies or actionable fixes.

---

## The Solution

**Markwise** is an enterprise brand governance and copy compliance platform that bridges the gap between static brand manuals and dynamic content creation. 

Markwise evaluates drafts before publication, flags exact policy violations, explains *why* each issue matters, links claims directly to verified legal and technical evidence, and turns every human approval decision into a versioned, reusable brand rule.

---

## The Markwise Loop

Markwise operates on a closed-loop governance cycle where every editorial intervention strengthens future enforcement:

```text
Create ➔ Check ➔ Explain ➔ Fix ➔ Verify ➔ Approve ➔ Publish ➔ Monitor ➔ Learn ➔ Improve
```

1. **Create:** Ingest campaign drafts from writers, agencies, or AI assistants.
2. **Check:** Scan copy in real time against active brand rules and verified evidence anchors.
3. **Explain:** Surface transparent explanations and regulatory citations for every flagged segment.
4. **Fix:** Apply recommended, one-click editorial revisions.
5. **Verify:** Check revised drafts against factual benchmarks stored in the Fact Vault.
6. **Approve:** Submit to role-based guardian workflows with full redline git-style diffs.
7. **Publish:** Release verified, audit-stamped content across marketing channels.
8. **Monitor:** Aggregate violation trends, issue severities, and resolution velocity.
9. **Learn:** Convert human overrides into structured rule proposals.
10. **Improve:** Incrementally update living guidelines to prevent future violations org-wide.

---

## Key Features

### 🛡️ Brand Rules (Living Policy Engine)
* **Versioned Rule Codex:** Maintain centralized, version-controlled guidelines for prohibited superlatives, mandatory legal disclosures, and tone constraints.
* **Deterministic Severity Tiers:** Categorize constraints into `HIGH`, `MEDIUM`, and `LOW` impact to separate statutory violations from stylistic adjustments.
* **Tenant Isolation:** Multi-tenant workspace partitioning guarantees that proprietary policies remain strictly isolated to authorized workspaces.

### 🗄️ Fact & Evidence Vault
* **Verified Evidence Anchoring:** Link corporate claims (e.g., "SOC 2 Type II Certified", "99.9% SLA") to certified third-party documents, SEC filings, and engineering benchmark reports.
* **Automated Expiry Tracking:** Flag expired or superseded evidence to ensure time-sensitive marketing claims do not persist past validation windows.

### ⚡ AI Review Engine (Powered by Google Gemini)
* **Nuanced Context Analysis:** Utilizes Google Gemini (`gemini-2.5-flash`) with structured output schemas to evaluate copy against both explicit rules and semantic tone guidelines.
* **Zero Model Training on Customer Data:** Server-side API integration ensures customer content drafts are never used for model training or retained outside active session memory.

### 📋 Explainable Issue Cards
* **Contextual Explanations:** Displays why a specific sentence was flagged, cites the governing rule, and provides the exact policy rationale.
* **1-Click Suggested Fixes:** Proposes context-aware editorial substitutions ready to be accepted or refined.
* **✨ AI-Assisted Transparency:** Clear visual distinctions between deterministic policy flags and semantic AI suggestions.

### 🔄 Multi-Tier Approval Queue
* **Role-Based Governance Matrix:** Route flagged assets to designated Brand Guardians and Legal Reviewers.
* **Redline Diff Inspector:** Inspect split-screen comparisons of original drafts versus proposed compliant copy.
* **Audit-Proof Decision Logging:** Record timestamps, user identities, and executive approval or rejection statuses.

### 🧠 Correction Memory
* **Self-Healing Guidelines:** When an editor modifies or overrides a suggested fix, Markwise allows them to codify that decision into a new Brand Rule with a single click.

### 📊 Governance Telemetry
* **Live Compliance Dashboards:** Real-time analytics built on Recharts visualizing issue severity distribution, 1-click resolution rates, and rule velocity.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 / React 19 (App Router Architecture & SPA Dual-Runtime) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS with brand aesthetic (Deep Forest Green `#123B2F` & Warm Ivory `#F7F2E8`) |
| **Database & ORM** | PostgreSQL hosted on Supabase, managed via Prisma ORM |
| **Authentication** | Supabase Auth (SSR Cookie Sessions with Row-Level Multi-Tenancy) |
| **AI Reasoning** | Google Gemini API (`@google/genai`) |
| **Data Visualization** | Recharts (Responsive bar and donut telemetry charts) |
| **Deployment** | Vercel (Edge network & automated CI/CD pipeline) |

---

## Getting Started (Local Setup)

### Prerequisites
* **Node.js:** v18.17.0 or higher
* **npm:** v9.0.0 or higher
* **Git** installed on your local machine

### 1. Clone the Repository
```bash
git clone https://github.com/Manish-kumbhar07/markwise.git
cd markwise
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:

```env
# PostgreSQL Connection Strings (Supabase)
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# Supabase Public API Keys
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Google Gemini API Key
GEMINI_API_KEY="AIzaSy..."
```

### 4. Database Setup (Prisma)
Generate the Prisma Client and synchronize schema tables with your PostgreSQL database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Production Deployment

Markwise is built for deployment on **Vercel** with **Supabase**:

1. **Frontend & Middleware:** Deploy the project directly to Vercel via GitHub integration. Vercel automatically detects the build configuration and routes traffic via [`vercel.json`](./vercel.json).
2. **Database & Storage:** Configure the Supabase connection pooler (`pgbouncer=true` on port `6543`) for serverless connection persistence.
3. **Security Headers:** Enforced via [`next.config.js`](./next.config.js) including `Strict-Transport-Security`, `X-Content-Type-Options`, and `X-Frame-Options`.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with Google Gemini & Enterprise Brand Governance Architecture for Hackathon 2026.</sub>
</div>
