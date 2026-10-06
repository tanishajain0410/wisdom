# Wisdom International School — Official Website & Admin Portal

> Official website and administrative management portal for **Wisdom International School, Mauranipur, Jhansi** (Play Group to Class 8).

---

## 🌟 Features

- **Responsive Modern Design**: Built with Next.js 16 (App Router), React 19, and Tailwind CSS.
- **Buttery-Smooth Scrolling**: Powered by Lenis momentum scrolling engine with GPU layer acceleration.
- **7 Public Pages**:
  - `Home (/)`: Interactive hero, school highlights, campus features, gallery preview, BSA recognition, admission enquiry.
  - `About (/about)`: School philosophy, core values, history, mentor ratios, and leadership.
  - `Learning (/learning)`: Structured NCERT academic stages (Foundation, Preparatory, Middle School), age milestones.
  - `Facilities (/facilities)`: Smart classrooms, computer labs, open-air yoga, security, transport.
  - `Gallery (/gallery)`: Live photo gallery with real-time category filtering, lightbox view, and keyboard navigation.
  - `Certificates (/certificates)`: Official Government recognition certificates issued by BSA Jhansi (Play Group to Class 8).
  - `Contact (/contact)`: Campus visiting hours, Google Maps directions, contact cards, and admission inquiry form.
- **Administrative Portal (`/admin`)**:
  - Secure JWT authentication with bcrypt password hashing.
  - Real-time Admission Enquiry tracking and management.
  - Dynamic Photo Gallery manager with upload and cropping tools.
  - School settings and credentials management.
- **Full-Stack Architecture**: Express.js REST API with PostgreSQL database and connection pooling.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, Lenis, TypeScript.
- **Backend**: Node.js, Express.js, PostgreSQL (`pg` pool), bcryptjs, jsonwebtoken, multer, cors.
- **Database**: PostgreSQL with indexed tables for queries, enquiries, and media.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18+ or v20+)
- PostgreSQL (v14+)

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/tanishajain0410/wisdom.git
cd wisdom
```

Install root, backend, and frontend dependencies:
```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 3. Environment Setup

Copy `.env.example` to `.env` in both folders:

**Backend (`backend/.env`):**
```env
PORT=5000
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/wisdom_school
JWT_SECRET=your-secure-jwt-secret-here
FRONTEND_URL=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**
```env
BACKEND_URL=http://127.0.0.1:5000
```

### 4. Database Setup & Seeding

Initialize database tables and default admin credentials:
```bash
node backend/src/db/initSchema.js
```

### 5. Running the Application

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run separately:
```bash
# Backend (Port 5000)
cd backend && npm run dev

# Frontend (Port 3000)
cd frontend && npm run dev
```

Visit:
- **Public Website**: `http://localhost:3000`
- **Admin Login**: `http://localhost:3000/admin/login`

---

## 📄 License
All rights reserved © 2026 Wisdom International School. Run by Janhit Seva Sansthan Trust.
