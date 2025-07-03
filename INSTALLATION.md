# Quick Installation Guide

## Prerequisites
- Node.js 18+
- MongoDB Community Edition
- Git

## One-Command Setup

```bash
# Clone and setup
git clone https://github.com/yourusername/urban-link.git
cd urban-link
npm install
```

## Configuration

1. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your settings:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/urbanlink
   JWT_SECRET=your-secure-32-character-jwt-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Start MongoDB:**
   ```bash
   # Windows
   mkdir C:\data\db
   mongod
   
   # macOS/Linux
   sudo mkdir -p /data/db
   mongod
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Open browser:** http://localhost:3000

## Seed Database (Recommended)
Run this command to populate with sample users:
```bash
curl -X POST http://localhost:3000/api/debug/seed
```
or visit: http://localhost:3000/api/debug/seed (POST)

## Test Login
After seeding, you can login with:

**Officers:**
- `admin@waterworks.gov` / `test123` (Admin - Water Supply)
- `head@planning.gov` / `test123` (Dept Head - Public Works)
- `engineer@transport.gov` / `test123` (Engineer - Transport)
- `officer@health.gov` / `test123` (Officer - Health)

**Civilians:**
- `citizen123` / `test123`
- `resident456` / `test123`

## Need Help?
Check the main [README.md](README.md) for detailed setup instructions.