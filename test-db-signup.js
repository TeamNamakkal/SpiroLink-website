#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

// Set DATABASE_URL if not present
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://spiro_postgres_user:wzKR5jnH7o8kc8oF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.c.render-internal.com:5432/spiro_postgres';
}

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testSignup() {
  try {
    console.log('🔄 Testing database connection...');
    console.log('Database URL:', process.env.DATABASE_URL);
    
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected:', result.rows[0]);
    
    // Check users table
    const usersResult = await pool.query('SELECT COUNT(*) as user_count FROM users');
    console.log('📊 Current user count:', usersResult.rows[0].user_count);
    
    // Show all users
    const allUsers = await pool.query('SELECT id, email, username, first_name, last_name, created_at FROM users ORDER BY created_at DESC');
    console.log('\n👥 All registered users:');
    if (allUsers.rows.length === 0) {
      console.log('   (No users yet)');
    } else {
      allUsers.rows.forEach(user => {
        console.log(`   • ${user.email} (${user.username}) - ${user.first_name} ${user.last_name} [${new Date(user.created_at).toLocaleString()}]`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testSignup();
