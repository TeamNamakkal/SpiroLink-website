#!/bin/bash

# ============================================================================
# RENDER TO RAILWAY DATABASE MIGRATION SCRIPT
# ============================================================================
# This script exports your database from Render and prepares it for Railway
# ============================================================================

set -e

echo "🚀 Starting database migration from Render to Railway..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Render PostgreSQL credentials (from your .env)
RENDER_DB_URL="postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres"

# Create backups directory
mkdir -p ./backups
BACKUP_FILE="./backups/database_backup_$(date +%Y%m%d_%H%M%S).sql"

echo -e "${YELLOW}Step 1: Exporting database from Render...${NC}"
echo "Backup file: $BACKUP_FILE"
echo ""

# Export the complete database
pg_dump "$RENDER_DB_URL" > "$BACKUP_FILE"

if [ -f "$BACKUP_FILE" ]; then
    echo -e "${GREEN}✅ Database exported successfully!${NC}"
    echo "File size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo -e "${RED}❌ Failed to export database${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Creating schema-only file (for reference)...${NC}"

SCHEMA_FILE="./backups/schema_only_$(date +%Y%m%d_%H%M%S).sql"
pg_dump "$RENDER_DB_URL" --schema-only > "$SCHEMA_FILE"

echo -e "${GREEN}✅ Schema file created: $SCHEMA_FILE${NC}"

echo ""
echo -e "${YELLOW}Step 3: What to do next...${NC}"
echo ""
echo "📋 MANUAL STEPS REQUIRED:"
echo ""
echo "1. Create a PostgreSQL database on Railway:"
echo "   - Go to https://railway.app"
echo "   - Create a new PostgreSQL plugin"
echo "   - Note the connection credentials"
echo ""
echo "2. Update your .env file with Railway credentials:"
echo "   DATABASE_URL=postgresql://username:password@host:port/database"
echo ""
echo "3. Import the backup into Railway (choose one option):"
echo ""
echo "   Option A - Using psql directly:"
echo "   psql \$RAILWAY_DATABASE_URL < $BACKUP_FILE"
echo ""
echo "   Option B - Using Railway CLI (from Railway dashboard):"
echo "   - Download the backup file from this script"
echo "   - Use Railway dashboard to restore"
echo ""
echo "4. Test the connection:"
echo "   npm run test-db"
echo ""
echo "5. Deploy to Render for frontend"
echo ""
echo -e "${GREEN}📁 Backup files saved to ./backups/${NC}"
echo ""
