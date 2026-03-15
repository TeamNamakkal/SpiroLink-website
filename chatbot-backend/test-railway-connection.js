import pool from './config/db.js';

/**
 * Test Database Connection
 * Usage: npm run test-railway-connection
 */

const testRailwayConnection = async () => {
  try {
    console.log('🧪 Testing Railway Database Connection...\n');

    // Test 1: Basic connection
    console.log('📋 Test 1: Basic Connection');
    const versionResult = await pool.query('SELECT version();');
    console.log('✅ Connected to:', versionResult.rows[0].version.split(',')[0]);
    console.log('');

    // Test 2: Check tables
    console.log('📋 Test 2: Verify Tables Exist');
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log('✅ Found tables:');
    tablesResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    console.log('');

    // Test 3: Count records
    console.log('📋 Test 3: Data Summary');
    const countQueries = [
      { table: 'users', query: 'SELECT COUNT(*) as count FROM users;' },
      { table: 'payments', query: 'SELECT COUNT(*) as count FROM payments;' },
      { table: 'invoices', query: 'SELECT COUNT(*) as count FROM invoices;' },
      { table: 'payment_logs', query: 'SELECT COUNT(*) as count FROM payment_logs;' },
    ];

    for (const { table, query } of countQueries) {
      const result = await pool.query(query);
      console.log(`✅ ${table}: ${result.rows[0].count} records`);
    }
    console.log('');

    // Test 4: Sample data
    console.log('📋 Test 4: Sample User Data');
    const userResult = await pool.query('SELECT id, email, username, created_at FROM users LIMIT 1;');
    if (userResult.rows.length > 0) {
      console.log('✅ Sample user:');
      console.log(JSON.stringify(userResult.rows[0], null, 2));
    } else {
      console.log('⚠️  No users found (database may be empty)');
    }
    console.log('');

    // Test 5: Check indexes
    console.log('📋 Test 5: Database Indexes');
    const indexResult = await pool.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public'
      ORDER BY indexname;
    `);
    console.log(`✅ Found ${indexResult.rows.length} indexes`);
    console.log('');

    console.log('🎉 All tests passed! Railway database is ready.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Connection test failed:');
    console.error('Error:', error.message);
    console.error('\nDetails:', error);
    process.exit(1);
  }
};

testRailwayConnection();
