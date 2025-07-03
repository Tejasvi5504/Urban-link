# Urban Li## Features

<div style="font-size: 14px; line-height: 1.5;">

- 🏛️ **Dual User System**: Separate authentication for Government Officers and Civilians
- 👥 **Officer Roles**: Four-tier role system (Admin, Department Head, Engineer, Officer)
- 🛡️ **Role-Based Access Control**: Admin dashboard for user management and approval workflow
- 🔐 **Secure JWT Authentication**: Token-based authentication with bcrypt password hashing
- ✅ **Approval Workflow**: New officer registrations require admin/dept head approval
- 🗃️ **MongoDB Integration**: Robust data storage with user management
- 📱 **Responsive Design**: Mobile-friendly interface with modern UI
- 🎨 **Modern UI**: Clean design with Tailwind CSS and Lucide React icons

</div>ty Collaboration Platform

<div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
  <img src="public/logo.png" alt="Urban Link Logo" width="120" height="120" style="float: left; margin-right: 15px; margin-bottom: 10px;" />
  <div style="font-size: 14px; line-height: 1.6; text-align: justify;">
    <p>A Next.js application that streamlines interdepartmental cooperation for efficient urban governance with JWT-based authentication. This innovative platform bridges the gap between government departments and citizens, creating a seamless digital ecosystem for modern urban management.</p>
    <p>Urban Link revolutionizes how cities operate by providing secure, role-based access to various stakeholders while maintaining the highest standards of data protection and user experience. Built with cutting-edge technologies, it ensures scalability and reliability for growing urban environments.</p>
  </div>
</div>

## Features

<div style="font-size: 14px; line-height: 1.5;">

- 🏛️ **Dual User System**: Separate authentication for Government Officers and Civilians
- � **Officer Roles**: Four-tier role system (Admin, Department Head, Engineer, Officer)
- �🔐 **Secure JWT Authentication**: Token-based authentication with bcrypt password hashing
- 🗃️ **MongoDB Integration**: Robust data storage with user management
- 📱 **Responsive Design**: Mobile-friendly interface with modern UI
- 🛡️ **Role-based Access**: Different dashboard views for officers and civilians
- 🎨 **Modern UI**: Clean design with Tailwind CSS and Lucide React icons

</div>

## Tech Stack

<div style="font-size: 14px; line-height: 1.5;">

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

</div>

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- MongoDB (Community Edition)
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/urban-link.git
cd urban-link
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition from https://www.mongodb.com/try/download/community

# Create data directory
mkdir C:\data\db  # Windows
# or
sudo mkdir -p /data/db  # macOS/Linux

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Get your connection string
4. Replace the MONGODB_URI in step 4

### 4. Environment Configuration

Create `.env.local` file in the project root:

```env
# Database Connection
MONGODB_URI=mongodb://localhost:27017/urbanlink

# JWT Secret (MUST be at least 32 characters)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-for-security

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
```

**Important**: 
- Never commit `.env.local` to version control
- Generate a strong JWT_SECRET for production
- For MongoDB Atlas, use your cluster connection string

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Government Officers

1. Click "Login" on the homepage
2. Select "Officer" user type
3. Choose your department from the dropdown
4. Enter your email and password
5. Register or login to access the officer dashboard

### For Civilians

1. Click "Login" on the homepage
2. Select "Civilian" user type
3. Enter your User ID and password
4. Register or login to access the civilian dashboard

### Test Credentials (Development)

You can use these test credentials for quick testing or seed the database with sample data:

**Officers (after seeding):**
- Admin: `admin@waterworks.gov` / `test123` (Water Supply - Admin)
- Dept Head: `head@planning.gov` / `test123` (Public Works - Department Head)  
- Engineer: `engineer@transport.gov` / `test123` (Transport - Engineer)
- Officer: `officer@health.gov` / `test123` (Health - Officer)

**Civilians:**
- User ID: `citizen123` / `test123`
- User ID: `resident456` / `test123`

**Seed Database:**
Visit `http://localhost:3000/api/debug/seed` (POST request) to populate with sample users.

## Project Structure

```
urban-link/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.js    # User registration
│   │   │   │   ├── login/route.js       # User login
│   │   │   │   └── verify/route.js      # Token verification
│   │   │   └── debug/
│   │   │       └── users/route.js       # User debugging (dev only)
│   │   ├── dashboard/
│   │   │   └── page.js                  # Protected dashboard
│   │   ├── admin/
│   │   │   └── page.js                  # Admin panel (dev only)
│   │   ├── layout.js                    # Root layout
│   │   └── page.js                      # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── dashboard-shell.tsx      # Dashboard layout
│   │   │   ├── sidebar.tsx              # Navigation sidebar
│   │   │   └── topbar.tsx              # Top navigation
│   │   ├── ui/                          # Reusable UI components
│   │   ├── LoginModal.jsx               # Authentication modal
│   │   └── ProtectedRoute.js            # Route protection
│   ├── contexts/
│   │   └── AuthContext.js               # Authentication context
│   └── lib/
│       ├── mongodb.js                   # Database connection
│       ├── jwt.js                       # JWT utilities
│       └── auth.js                      # Password hashing
├── public/
│   └── logo.png                         # Application logo
├── .env.local                           # Environment variables (create this)
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (with role for officers)
- `POST /api/auth/login` - User login (role-aware for officers)
- `GET /api/auth/verify` - Verify JWT token (returns role information)

### Development

- `GET /api/debug/users` - View all users (development only)
- `POST /api/debug/seed` - Seed database with sample users and roles (development only)

## Security Features

- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT token-based authentication
- ✅ Input validation and sanitization
- ✅ Protected routes with role-based access
- ✅ Secure error handling
- ✅ Environment variable protection

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  userType: "officer" | "civilian",
  email: String,          // For officers
  userId: String,         // For civilians
  password: String,       // Hashed with bcrypt
  department: String,     // For officers only
  role: String,           // For officers: "admin" | "dept_head" | "engineer" | "officer"
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean,
  lastLoginAt: Date       // Updated on login
}
```

## Development Tools

### View Database Data

**Method 1: MongoDB Compass (GUI)**
- Install [MongoDB Compass](https://www.mongodb.com/products/compass)
- Connect to `mongodb://localhost:27017`
- Navigate to `urbanlink` database

**Method 2: MongoDB Shell**
```bash
mongosh
use urbanlink
db.users.find().pretty()
```

**Method 3: Admin Panel**
- Visit `http://localhost:3000/admin` (development only)
- View all users and statistics

### Debug API
- Visit `http://localhost:3000/api/debug/users` to see user data as JSON

## Deployment

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-very-secure-jwt-secret-for-production
NEXTAUTH_URL=https://yourdomain.com
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Common Issues & Solutions

### MongoDB Connection Issues

**Error**: `MongoNetworkError: failed to connect to server`
**Solution**: 
- Ensure MongoDB is running (`mongod`)
- Check connection string in `.env.local`
- For Windows: Create `C:\data\db` directory

### JWT Secret Error

**Error**: `JWT_SECRET environment variable is not set`
**Solution**: Add `JWT_SECRET` to your `.env.local` file (minimum 32 characters)

### Module Not Found Errors

**Error**: `Can't resolve '@/contexts/AuthContext'`
**Solution**: 
- Ensure all files are created as per project structure
- Restart development server (`npm run dev`)

### Port Already in Use

**Error**: `Port 3000 is already in use`
**Solution**: 
```bash
# Kill process using port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Common Issues](#common-issues--solutions) section
2. Search existing GitHub issues
3. Create a new issue with detailed description

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for robust database solutions
- Tailwind CSS for utility-first styling
- Lucide React for beautiful icons

---

**Built with ❤️ for Smart Cities**