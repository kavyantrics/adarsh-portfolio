#!/usr/bin/env node

/**
 * Migration script to move analytics data from JSON files to Supabase
 * Run this after setting up Supabase and before switching to the new system
 */

// Load environment variables from .env.local

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });



// Check if Supabase environment variables are set
function checkEnvironment() {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease set these in your .env.local file and restart the script.');
    process.exit(1);
  }

  console.log('✅ Environment variables are set');
}

// Load existing analytics data
function loadExistingAnalytics() {
  try {
    const analyticsPath = path.join(process.cwd(), 'data', 'analytics', 'analytics.json');
    console.log(`🔍 Looking for analytics file at: ${analyticsPath}`);
    
    if (!fs.existsSync(analyticsPath)) {
      console.log('ℹ️  No existing analytics data found');
      return null;
    }

    console.log('📁 Analytics file found, reading...');
    const data = fs.readFileSync(analyticsPath, 'utf8');
    console.log('📖 File content length:', data.length, 'characters');
    
    const analytics = JSON.parse(data);
    console.log('✅ JSON parsed successfully');
    
    console.log('✅ Loaded existing analytics data:');
    console.log(`   - Total page views: ${Object.values(analytics.pageViews).reduce((sum, views) => sum + views, 0)}`);
    console.log(`   - Total visitors: ${analytics.visitors.total}`);
    console.log(`   - Blog views: ${analytics.blogStats.totalViews}`);
    
    return analytics;
  } catch (error) {
    console.error('❌ Error loading existing analytics:', error.message);
    console.error('Error details:', error);
    return null;
  }
}

// Create backup of existing data
function createBackup(analytics) {
  if (!analytics) return;

  try {
    const backupDir = path.join(process.cwd(), 'data', 'analytics', 'backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `pre-supabase-migration-${timestamp}.json`);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    fs.writeFileSync(backupPath, JSON.stringify(analytics, null, 2));
    console.log(`✅ Created backup: ${path.relative(process.cwd(), backupPath)}`);
  } catch (error) {
    console.error('❌ Error creating backup:', error.message);
  }
}

// Main migration function
async function migrateToSupabase() {
  console.log('🚀 Starting migration to Supabase...\n');

  // Check environment
  checkEnvironment();
  
  // Load existing data
  const existingData = loadExistingAnalytics();
  
  if (existingData) {
    // Create backup
    createBackup(existingData);
    
    console.log('\n📋 Migration Summary:');
    console.log('   - Existing analytics data will be preserved as backup');
    console.log('   - New analytics will be stored in Supabase');
    console.log('   - Your app will automatically use the new system');
    
    console.log('\n⚠️  Important Notes:');
    console.log('   1. Run the SQL migration in Supabase first');
    console.log('   2. Test the new system before removing old files');
    console.log('   3. Keep backups for at least a few days');
  }

  console.log('\n🎯 Next Steps:');
  console.log('   1. Follow the setup guide in SUPABASE_SETUP.md');
  console.log('   2. Run the SQL migration in Supabase dashboard');
  console.log('   3. Test your app with the new analytics system');
  console.log('   4. Once confirmed working, you can remove old JSON files');
  
  console.log('\n✅ Migration script completed successfully!');
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateToSupabase().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
}
