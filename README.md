# UrbanLink

**Interdepartmental Digital Platform for Smart Urban Governance in India**

> Streamlining collaboration between municipal agencies, utilities, and citizens to deliver faster, cheaper, and better city infrastructure.

---

## ✨ Key Features

| Module                          | Description                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| **Geo‑tagged Project Registry** | Central database of ongoing & upcoming projects with map visualisation.             |
| **Shared Resource Hub**         | Inventory of machinery, experts, and documents that departments can book or borrow. |
| **Task & Schedule Manager**     | Gantt‑style calendars, role‑based assignments, automated conflict detection.        |
| **Overlap Detector**            | Flags projects sharing the same site; suggests unified phasing to cut costs.        |
| **Meetings & Notes**            | One‑click calendar invites, agenda templates, action‑item tracker.                  |
| **Training & Workshops**        | Event calendar, registration, feedback, certificate generator.                      |
| **Discussion Forum**            | Intra‑, inter‑, and public sections with rich text, polls, and attachments.         |
| **Real‑time Notifications**     | WebSockets push updates for deadlines, clashes, and new posts.                      |

---

## 🏗️ Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Heroicons, Mapbox GL JS, FullCalendar, React Query
* **Backend**: Node.js 20, Express 5, MongoDB 6 (Atlas), Mongoose, Socket.io, Passport/JWT
* **Dev & Ops**: TypeScript, ESLint/Prettier, Vitest, Docker, GitHub Actions CI, AWS S3 (file storage), Render/Vercel (deploy)

---

## 🖼️ High‑Level Architecture

```
┌────────────┐        REST / WS        ┌──────────────┐
│  React UI  │  ⇄  api.urbanlink.gov ⇄ │  Express API │
└────────────┘                         │  & Socket.io │
     ▲                                  └──────┬──────┘
     │  Signed URLs                               │
     ▼                                           ▼
┌────────────┐       MongoDB Atlas        ┌────────────┐
│  AWS  S3   │  ⇄  geo, tasks, users  ⇄  │  Mapbox GL │
└────────────┘                            └────────────┘
```

---

## 🚀 Getting Started

### 1. Prerequisites

* **Node.js ≥ 20** & **npm ≥ 10**
* **MongoDB Atlas** account (or local Mongo)
* **Mapbox** access token
* **AWS S3** bucket (or Cloudinary) for uploads

### 2. Environment Variables

Create `.env` at root:

```env
# Server
PORT=5000
MONGO_URI="mongodb+srv://<user>:<pass>@cluster.mongo.net/urbanlink"
JWT_SECRET="super‑secret‑key"

# Uploads
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_BUCKET_NAME="urbanlink‑uploads"

# Map
MAPBOX_TOKEN="pk.ey..."
```

### 3. Installation

```bash
git clone https://github.com/Tejasvi5504/Urban-link.git
cd urbanlink

# Install root, then workspaces
npm install
npm run bootstrap            # uses workspaces or lerna
```

### 4. Running Locally

```bash
# In one terminal
npm run dev:server           # starts Express on :5000

# In another
npm run dev:client           # starts next server on :3000
```

Frontend proxies API calls to `/api`.

---

## 📂 Project Structure

```
urbanlink/
├─ apps/
│  ├─ client/            # React + Vite code
│  └─ server/            # Express API
├─ packages/
│  ├─ ui/                # Reusable React components
│  └─ config/            # ESLint, Prettier, ts‑config
├─ docs/                 # ADRs, diagrams, assets
└─ docker-compose.yml
```

---

## 🔌 API Overview (REST)

| Method | Route                   | Description                   |
| ------ | ----------------------- | ----------------------------- |
| `POST` | `/api/auth/login`       | JWT login                     |
| `GET`  | `/api/projects`         | List projects (query by bbox) |
| `POST` | `/api/projects`         | Create project                |
| `POST` | `/api/tasks/:id/assign` | Assign task                   |
| `GET`  | `/api/forums/:slug`     | Get forum threads             |
| …      | …                       | …                             |

Detailed Swagger docs available at `/api/docs` once the server is running.

---

## 🧑‍💻 Contributing

1. Fork → Create feature branch → Commit → PR
2. Follow **Conventional Commits** (`feat:`, `fix:` …)
3. Ensure `npm run lint && npm test` passes.
4. One feature / bug per PR.

See **CONTRIBUTING.md** for full guidelines.

---

## 🗺️ Roadmap

*

---

## 📜 License

Licensed under the **MIT License** — see `LICENSE` for details.

---

## 🤝 Contact

| Role       | Name          | LinkedIn                                                                                 |
| ---------- | ------------- | ---------------------------------------------------------------------------------------- |
| Maintainer | Tejasvi Saini | [https://www.linkedin.com/in/tejasvi‑saini/](https://www.linkedin.com/in/tejasvi‑saini/) |
| Mentor     | (Your Prof)   | …                                                                                        |

> Made with ❤️ in Indian cities to make them work smarter together.
