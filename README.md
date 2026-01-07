# Submersible Pump Yojana Portal

A professional government-style portal for the PM Kusum Solar Pump Scheme, built with React, Express.js, Prisma, and Tailwind CSS.

## 🚀 Features

- **Bilingual Support**: English and Hindi toggle
- **Government Design**: Indian flag inspired color scheme
- **Application Form**: Mobile & Aadhar validation
- **Admin Dashboard**: Application management with status tracking
- **Secure Auth**: JWT-based admin authentication

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Express.js |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |

## 📦 Local Development

```bash
# Install dependencies
npm install

# Push database schema
npx prisma db push

# Seed database (creates admin user)
npm run db:seed

# Start development server
npm run dev
```

## 🔐 Default Admin Credentials

| Field | Value |
|-------|-------|
| Email | admin@spyojana.com |
| Password | admin123 |

## 🌐 Vercel Deployment

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import this GitHub repository

### Step 2: Configure Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `JWT_SECRET` | A secure random string |

### Step 3: Build Settings
Vercel will auto-detect settings from `vercel.json`:
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Deploy
Click "Deploy" and wait for build to complete.

### Step 5: Seed Production Database
After deployment, run:
```bash
npx prisma db push
node prisma/seed.js
```

## 📁 Project Structure

```
├── api/index.js        # Express.js API
├── prisma/
│   ├── schema.prisma   # Database models
│   └── seed.js         # Admin & sample data
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── context/        # Language context
│   └── locales/        # EN/HI translations
├── vercel.json         # Vercel config
└── package.json
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/applications` | List applications (auth) |
| POST | `/api/applications` | Submit application |
| PATCH | `/api/applications/:id/status` | Update status (auth) |

## 📄 License

MIT
