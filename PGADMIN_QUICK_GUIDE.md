# How to View Your Users in pgAdmin

## Option 1: Using Render's Built-in PostgreSQL Dashboard (EASIEST)

### Step 1: Go to Render Dashboard
1. Open https://dashboard.render.com
2. Log in with your account
3. Click on your **spirolink** project (or the PostgreSQL database service)

### Step 2: Find the Database Connection
1. In the left sidebar, find **spiro_postgres** (PostgreSQL database)
2. Click on it
3. Go to the **Connections** tab
4. You'll see the connection string

---

## Option 2: Using pgAdmin (Recommended for Detailed View)

### Prerequisites
You need pgAdmin installed on your Mac. If not, download it from: https://www.pgadmin.org/download/

### Step 1: Download & Install pgAdmin
```bash
# Using Homebrew (easiest)
brew install pgadmin4

# Or download from https://www.pgadmin.org/download/
```

### Step 2: Start pgAdmin
```bash
# If installed via Homebrew
pgadmin4

# Or search for "pgAdmin 4" in Applications folder and click it
```

### Step 3: Open pgAdmin in Browser
- pgAdmin automatically opens at: **http://localhost:5050**
- Create a master password (remember it!)
- Login with your email

### Step 4: Add Your Render PostgreSQL Database Connection

1. In the left panel, right-click **Servers** → **Register** → **Server**

2. In the **General** tab:
   - **Name**: Give it a name (e.g., "SpiroLink DB")

3. In the **Connection** tab, fill in:
   - **Hostname**: `dpg-d63ddma4d50c73dk98kg-a.postgres.render.com`
   - **Port**: `5432`
   - **Database**: `spiro_postgres`
   - **Username**: `spiro_postgres_user`
   - **Password**: `wzKR5jnH7o8kc8oF91qnrH7duL4DbwN9`
   - **Save password**: ✅ Check this

4. Click **Save**

### Step 5: View Your Users Table

1. In the left panel, expand **Servers** → **SpiroLink DB** (or your name)
2. Expand **Databases** → **spiro_postgres**
3. Expand **Schemas** → **public**
4. Expand **Tables**
5. Right-click **users** → **View/Edit Data** → **All Rows**

### Step 6: See Your Users!
You'll see all your registered users with:
- ✅ email
- ✅ username
- ✅ first_name
- ✅ last_name
- ✅ password_hash (encrypted)
- ✅ created_at (registration date)
- ✅ is_active, is_verified, last_login, etc.

---

## Option 3: Using Terminal Command (Quickest)

### View All Users in Terminal:
```bash
cd /Users/theepan/Documents/vs\ code/project/chatbot-backend

# Query the database
node -e "
import('dotenv').then(d => d.default.config());
import('pg').then(pkg => {
  const { Pool } = pkg.default;
  const pool = new Pool({
    connectionString: 'postgresql://spiro_postgres_user:wzKR5jnH7o8kc8oF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.postgres.render.com:5432/spiro_postgres'
  });
  pool.query('SELECT email, username, first_name, last_name, is_active, created_at FROM users ORDER BY created_at DESC', (err, res) => {
    if (err) {
      console.error('❌ Error:', err.message);
    } else {
      console.log('✅ Total users:', res.rows.length);
      console.log('\n📋 Users:');
      res.rows.forEach(u => console.log('  • ' + u.email + ' (' + u.username + ') - ' + u.first_name + ' ' + u.last_name));
    }
    process.exit(0);
  });
});
"
```

---

## Troubleshooting

### "Connection refused" or "Cannot connect to database"
- Make sure Render PostgreSQL is active in your Render dashboard
- Check that the credentials are correct
- Try using the internal Render URL: `dpg-d63ddma4d50c73dk98kg-a.c.render-internal.com`

### "No tables found"
- Create an account on your website first
- Wait 2-3 seconds for the database to process
- Refresh pgAdmin (press F5)

### "pgAdmin won't start"
- Make sure port 5050 is not in use
- Try: `lsof -ti:5050 | xargs kill -9` then restart pgAdmin

---

## Quick Summary

**Easiest way:**
1. Install pgAdmin: `brew install pgadmin4`
2. Start it: `pgadmin4`
3. Add server with credentials above
4. Navigate: Servers → SpiroLink DB → Databases → spiro_postgres → Schemas → public → Tables → users
5. Right-click users → View/Edit Data → All Rows

That's it! You'll see all your users with their details! 🎉
