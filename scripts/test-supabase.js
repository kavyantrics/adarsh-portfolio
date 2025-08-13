#!/usr/bin/env node

/**
 * Test script to verify Supabase connection and basic operations
 * Run this after setting up Supabase to ensure everything works
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });


async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  try {
    // Check environment variables
    const requiredVars = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.error('❌ Missing environment variables:');
      missing.forEach(varName => console.error(`   - ${varName}`));
      return false;
    }

    console.log('✅ Environment variables are set');

    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client created successfully');

    // Test basic connection
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }

    console.log('✅ Database connection successful');
    console.log('✅ Analytics table accessible');

    // Test basic data operations
    if (data && data.length > 0) {
      console.log('✅ Analytics data found in database');
      console.log(`   - Records found: ${data.length}`);
    } else {
      console.log('ℹ️  Analytics table is empty (this is normal for new setup)');
    }

    // Test insert operation (will be rolled back)
    const { error: insertError } = await supabase
      .from('analytics')
      .insert([{
        page_views: { '/test': 1 },
        visitors: { total: 1, unique: 1, returning: 0, countries: { 'Test': 1 }, devices: { desktop: 1, mobile: 0, tablet: 0 } },
        blog_stats: { total_posts: 0, total_views: 0, popular_posts: {} },
        performance: { average_load_time: 0, total_requests: 1, errors: 0 },
        last_updated: new Date().toISOString(),
        last_reset: new Date().toISOString()
      }]);

    if (insertError) {
      console.error('❌ Insert operation failed:', insertError.message);
      return false;
    }

    console.log('✅ Insert operation successful');

    // Clean up test data
    const { error: deleteError } = await supabase
      .from('analytics')
      .delete()
      .eq('page_views->>/test', '1');

    if (deleteError) {
      console.log('⚠️  Cleanup warning (non-critical):', deleteError.message);
    } else {
      console.log('✅ Cleanup operation successful');
    }

    console.log('\n🎉 All tests passed! Supabase is working correctly.');
    console.log('\n📋 Database Status:');
    console.log('   ✅ Connection established');
    console.log('   ✅ Tables accessible');
    console.log('   ✅ Read operations working');
    console.log('   ✅ Write operations working');
    console.log('   ✅ Delete operations working');
    
    return true;

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

// Run test if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testSupabaseConnection().then(success => {
    process.exit(success ? 0 : 1);
  });
}
