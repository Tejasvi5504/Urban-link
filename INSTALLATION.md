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

## Test Login
- **Officer:** email `officer@test.com`, password `test123`
- **Civilian:** userId `citizen123`, password `test123`

## Need Help?
Check the main [README.md](README.md) for detailed setup instructions.