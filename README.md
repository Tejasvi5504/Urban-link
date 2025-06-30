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
src/
  app/
    projects/
      page.tsx         # Project dashboard page
  components/
    LoginModal.jsx     # Login/Register modal for officers and civilians
public/
  logo.png             # Project logo
```

## Customization

- **Departments:**  
  Edit the `departments` array in `LoginModal.jsx` to add or remove city departments.
- **Color Scheme:**  
  Update Tailwind CSS classes in components to match your branding.
- **Authentication:**  
  Integrate with your backend or Clerk for real authentication and user management.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Developed by [Your Name/Team]**