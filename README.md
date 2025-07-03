# Urban Li## Features

<div style="font-size: 14px; line-height: 1.5;">

- 🏛️ **Dual User System**: Separate authentication for Government Officers and Civilians
- 👥 **Officer Roles**: Four-tier role system (Admin, Department Head, Engineer, Officer)
- 🛡️ **Role-Based Access Control**: Complete RBAC system with admin dashboard for user management
- ✅ **Approval Workflow**: New officer registrations require admin/dept head approval before login access
- 🔐 **Secure JWT Authentication**: Token-based authentication with bcrypt password hashing
- 🏢 **Department Isolation**: Admins only manage officers within their own department
- ⚡ **User Management**: Approve, activate, deactivate, and delete user accounts
- 🗃️ **MongoDB Integration**: Robust data storage with comprehensive user management
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
- 👥 **Officer Roles**: Four-tier role system (Admin, Department Head, Engineer, Officer)
- 🛡️ **Role-Based Access Control**: Complete RBAC system with admin dashboard for user management
- ✅ **Approval Workflow**: New officer registrations require admin/dept head approval before login access
- 🔐 **Secure JWT Authentication**: Token-based authentication with bcrypt password hashing
- 🏢 **Department Isolation**: Admins only manage officers within their own department
- ⚡ **User Management**: Approve, activate, deactivate, and delete user accounts
- 🗃️ **MongoDB Integration**: Robust data storage with comprehensive user management
- 📱 **Responsive Design**: Mobile-friendly interface with modern UI
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

### Role-Based Access Control (RBAC)

The Urban Link platform features a comprehensive role-based access control system:

#### **Officer Roles & Permissions**

1. **👑 Administrator** (Highest Authority)
   - Full department management access
   - Can approve, activate, deactivate, and delete officers
   - Access to Role-Based Access Control dashboard
   - Department-scoped management

2. **🏢 Department Head**
   - Can approve, activate, and deactivate officers
   - Access to Role-Based Access Control dashboard
   - Cannot delete officers (admin privilege)
   - Department-scoped management

3. **⚙️ Engineer**
   - Standard dashboard access
   - No user management privileges

4. **👮 Officer** (Basic Level)
   - Standard dashboard access
   - No user management privileges

#### **Officer Registration & Approval Workflow**

1. **New Officer Registration**:
   - Officers register with email, password, department, and role
   - Account is created but marked as `isApproved: false` and `isActive: false`
   - **Cannot login until approved by admin/dept head**

2. **Admin/Dept Head Approval Process**:
   - Access "Access Control" page from dashboard sidebar (visible only to admin/dept head)
   - View pending officer registrations in their department
   - Approve, activate, deactivate, or delete officer accounts
   - System tracks who approved and when

3. **Login Enforcement**:
   - Unapproved officers receive "Account pending approval" error
   - Inactive officers receive "Account deactivated" error
   - Only approved and active officers can access the dashboard

### For Government Officers

1. Click "Login" on the homepage
2. Select "Officer" user type
3. Choose your department from the dropdown
4. Enter your email and password
5. Register or login to access the officer dashboard
6. **Note**: New registrations require admin/dept head approval before dashboard access

### For Civilians

1. Click "Login" on the homepage
2. Select "Civilian" user type
3. Enter your User ID and password
4. Register or login to access the civilian dashboard

### Test Credentials (Development)

You can use these test credentials for quick testing or seed the database with sample data:

**Pre-Approved Officers (Ready to Login):**
- **Admin**: `admin@waterworks.gov` / `test123` (Water Supply - Admin)
  - *Can access Access Control dashboard and manage Water Supply officers*
- **Admin**: `admin@electricity.gov` / `test123` (Electricity - Admin)
  - *Can access Access Control dashboard and manage Electricity officers*
- **Dept Head**: `head@planning.gov` / `test123` (Public Works - Department Head)
  - *Can access Access Control dashboard and manage Public Works officers*

**Pending Approval Officers (Cannot Login Until Approved):**
- **Engineer**: `engineer@transport.gov` / `test123` (Transport - Engineer)
  - *Requires approval from Transport admin/dept head*
- **Officer**: `officer@health.gov` / `test123` (Health - Officer)
  - *Requires approval from Health admin/dept head*
- **Engineer**: `pending@waterworks.gov` / `test123` (Water Supply - Engineer)
  - *Can be approved by admin@waterworks.gov*

**Civilians:**
- User ID: `citizen123` / `test123`
- User ID: `resident456` / `test123`

**Seed Database:**
Visit `http://localhost:3000/api/debug/seed` (POST request) to populate with sample users.

**Testing RBAC System:**
1. Login as `admin@waterworks.gov` to see Access Control menu
2. Approve `pending@waterworks.gov` engineer
3. Logout and login as the newly approved engineer
4. Test different role permissions

## Project Structure

```
urban-link/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── users/route.js       # RBAC user management API
│   │   │   ├── auth/
│   │   │   │   ├── register/route.js    # User registration (with role-based approval)
│   │   │   │   ├── login/route.js       # User login (approval-aware)
│   │   │   │   └── verify/route.js      # Token verification
│   │   │   └── debug/
│   │   │       ├── users/route.js       # User debugging (dev only)
│   │   │       └── seed/route.js        # Database seeding (dev only)
│   │   ├── dashboard/
│   │   │   ├── access-control/
│   │   │   │   └── page.tsx             # RBAC management dashboard
│   │   │   ├── layout.tsx               # Dashboard layout
│   │   │   └── page.tsx                 # Protected dashboard
│   │   ├── layout.js                    # Root layout
│   │   └── page.js                      # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── role-based-access.tsx    # RBAC management component
│   │   │   ├── dashboard-shell.tsx      # Dashboard layout
│   │   │   ├── sidebar.tsx              # Navigation sidebar (role-aware)
│   │   │   └── topbar.tsx              # Top navigation
│   │   ├── ui/                          # Reusable UI components (Shadcn/ui)
│   │   │   ├── alert-dialog.tsx         # Alert dialog for confirmations
│   │   │   ├── table.tsx               # Data table component
│   │   │   ├── badge.tsx               # Status badges
│   │   │   └── ...                     # Other UI components
│   │   ├── LoginModal.jsx               # Authentication modal
│   │   └── ProtectedRoute.js            # Route protection
│   ├── contexts/
│   │   └── authContext.js               # Authentication context (role-aware)
│   ├── lib/
│   │   ├── mongodb.js                   # Database connection
│   │   ├── jwt.js                       # JWT utilities
│   │   ├── auth.js                      # Password hashing
│   │   ├── roles.js                     # Role management utilities
│   │   └── utils.js                     # General utilities
├── public/
│   └── logo.png                         # Application logo
├── .env.local                           # Environment variables (create this)
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (with role and approval system for officers)
- `POST /api/auth/login` - User login (approval-aware for officers)
- `GET /api/auth/verify` - Verify JWT token (returns role and approval status)

### Role-Based Access Control (Admin/Dept Head Only)

- `GET /api/admin/users` - List officers in same department (with approval status)
- `POST /api/admin/users` - Manage officer accounts:
  - **approve**: Approve pending officer registration
  - **activate**: Reactivate deactivated officer
  - **deactivate**: Temporarily disable officer account
  - **delete**: Permanently remove officer (admin only)

### Development

- `GET /api/debug/users` - View all users (development only)
- `POST /api/debug/seed` - Seed database with sample users and roles (development only)

## Security Features

- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT token-based authentication with role-based verification
- ✅ Input validation and sanitization
- ✅ Protected routes with comprehensive role-based access control
- ✅ Department-scoped data access (admins only see their department)
- ✅ Approval workflow for new officer registrations
- ✅ Audit trail for user approvals (tracks who approved and when)
- ✅ Secure error handling with appropriate error messages
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
  isActive: Boolean,      // Account activation status
  isApproved: Boolean,    // Approval status (officers only)
  approvedBy: ObjectId,   // ID of admin/dept_head who approved
  approvedAt: Date,       // Timestamp of approval
  lastLoginAt: Date       // Updated on login
}
```

#### **RBAC-Specific Fields:**

- **`isApproved`**: Controls whether officer can login (default: false for new officers)
- **`isActive`**: Controls account activation status (can be toggled by admin/dept_head)
- **`approvedBy`**: Reference to the admin/dept_head who approved the account
- **`approvedAt`**: Timestamp when approval was granted
- **`role`**: Determines dashboard permissions and access levels

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
