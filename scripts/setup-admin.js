#!/usr/bin/env node

/**
 * Quick Admin Setup Script for Urban-Link
 * Run this script to quickly create an admin user for development
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createAdmin() {
  console.log('\n🏙️  Urban-Link Admin Setup');
  console.log('================================\n');

  try {
    // Get server URL
    const serverUrl = await askQuestion('Enter server URL (default: http://localhost:3001): ') || 'http://localhost:3001';
    
    // Get admin details
    const adminId = await askQuestion('Enter Admin ID (default: admin001): ') || 'admin001';
    const email = await askQuestion('Enter Admin Email (default: admin@urbanlink.gov): ') || 'admin@urbanlink.gov';
    const department = await askQuestion('Enter Department (default: IT Department): ') || 'IT Department';
    const password = await askQuestion('Enter Password (default: Admin123!): ') || 'Admin123!';
    const secretKey = await askQuestion('Enter Setup Secret (default: urban-link-admin-2025): ') || 'urban-link-admin-2025';

    console.log('\n⏳ Creating admin user...');

    // Make API call
    const response = await fetch(`${serverUrl}/api/admin/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        adminId,
        email,
        department,
        password,
        secretKey
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('\n✅ Admin user created successfully!');
      console.log('================================');
      console.log(`Admin ID: ${result.adminId}`);
      console.log(`Email: ${result.email}`);
      console.log(`Department: ${result.department}`);
      console.log('\n🚀 You can now login at:', `${serverUrl}`);
    } else {
      console.error('\n❌ Error creating admin user:');
      console.error(result.error);
    }

  } catch (error) {
    console.error('\n❌ Network error:', error.message);
    console.log('\n💡 Make sure your Urban-Link server is running!');
  } finally {
    rl.close();
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ for fetch support');
  console.log('💡 Please upgrade Node.js or use the web interface at /admin/setup');
  process.exit(1);
}

// Run the setup
createAdmin();
