# Urban-Link Admin Setup Guide

## 🎯 **Overview**
This guide explains how to set up the first admin user for the Urban-Link system when deploying for the first time.

## 🔧 **Initial Setup Steps**

### 1. **Environment Configuration**
Before setting up the admin user, ensure your environment variables are configured:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/urbanlink
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urbanlink

# JWT Secret for authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Admin Setup Secret (customize this)
ADMIN_SETUP_SECRET=urban-link-admin-2025
```

### 2. **Admin Setup Process**

#### **Option A: Using the Web Interface**
1. Navigate to: `http://localhost:3001/admin/setup`
2. Fill in the required information:
   - **Admin ID**: Unique identifier (e.g., `admin001`, `cityAdmin`)
   - **Email**: Admin email address
   - **Department**: Select the primary department
   - **Password**: Strong password (minimum 8 characters)
   - **Setup Secret Key**: Use the value from `ADMIN_SETUP_SECRET`

#### **Option B: Direct API Call**
```bash
curl -X POST http://localhost:3001/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "adminId": "admin001",
    "email": "admin@urbanlink.gov",
    "department": "IT Department",
    "password": "SecurePassword123!",
    "secretKey": "urban-link-admin-2025"
  }'
```

### 3. **Default Admin Credentials**
If you need to set up a quick test admin, use these values:

- **Admin ID**: `admin001`
- **Email**: `admin@urbanlink.gov`
- **Department**: `IT Department`
- **Password**: `Admin123!`
- **Secret Key**: `urban-link-admin-2025`

## 🔐 **Security Considerations**

### **Setup Secret Key**
- Change the default `ADMIN_SETUP_SECRET` in production
- Keep this secret secure and only share with authorized personnel
- The setup endpoint is disabled after the first admin is created

### **Admin Password Requirements**
- Minimum 8 characters
- Recommended: Mix of uppercase, lowercase, numbers, and symbols
- Change default password immediately after first login

### **Database Security**
- Ensure MongoDB is properly secured
- Use strong connection strings in production
- Enable authentication on your MongoDB instance

## 👥 **Admin Privileges**
The admin user has the following permissions:

- ✅ **CREATE_USERS** - Create new users
- ✅ **DELETE_USERS** - Remove users from system  
- ✅ **MANAGE_DEPARTMENTS** - Add/edit departments
- ✅ **MANAGE_PROJECTS** - Full project management
- ✅ **MANAGE_SYSTEM_SETTINGS** - System configuration
- ✅ **VIEW_ALL_DATA** - Access to all system data
- ✅ **APPROVE_USERS** - Approve new user registrations

## 🚀 **After Setup**

### **1. Login as Admin**
1. Go to the main page: `http://localhost:3001`
2. Click "Login"
3. Select "Officer" user type
4. Enter your admin credentials
5. You'll be redirected to the dashboard

### **2. Create Additional Users**
- Navigate to **Settings** → **Access Control** (visible to admins)
- Create department heads and other users
- Approve pending user registrations

### **3. System Configuration**
- Set up departments and roles
- Configure project categories
- Customize system settings

## ⚠️ **Troubleshooting**

### **"Admin already exists" Error**
- Only one admin can be created through the setup process
- If you need to reset, manually delete the admin record from MongoDB:
```javascript
db.users.deleteOne({ role: 'admin' })
```

### **"Invalid setup secret key" Error**
- Check your `ADMIN_SETUP_SECRET` environment variable
- Ensure it matches what you're entering in the form

### **Database Connection Issues**
- Verify `MONGODB_URI` is correct
- Ensure MongoDB service is running
- Check network connectivity

### **Setup Page Not Loading**
- Verify the Next.js application is running
- Check for any compilation errors in the terminal
- Ensure the route file exists at `/src/app/admin/setup/page.tsx`

## 📋 **API Endpoints**

### **Check Admin Status**
```http
GET /api/admin/setup
Response: { "adminExists": boolean, "setupRequired": boolean }
```

### **Create Admin**
```http
POST /api/admin/setup
Body: {
  "adminId": "string",
  "email": "string", 
  "department": "string",
  "password": "string",
  "secretKey": "string"
}
```

## 🔄 **Regular Maintenance**

### **Password Updates**
- Admins should update passwords regularly
- Use the profile settings in the dashboard

### **User Management**
- Review and approve new user registrations
- Deactivate unused accounts
- Update user roles as needed

### **System Monitoring**
- Monitor login logs
- Check for security issues
- Regular database backups

## 📞 **Support**

If you encounter issues during setup:

1. Check the terminal/console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Check the application logs for detailed error information

For additional support, refer to the main documentation or contact the development team.

---

**Note**: This setup process is only required once when initially deploying Urban-Link. After the first admin is created, all subsequent user management is done through the web interface.
