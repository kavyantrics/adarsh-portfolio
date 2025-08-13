# Supabase Setup Guide for Portfolio Analytics

This guide will help you set up Supabase as your database for the portfolio analytics system.

## 🚀 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `adarsh-portfolio` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for setup to complete (2-3 minutes)

## 🔑 Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`)

## 📝 Step 3: Update Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```bash
# Supabase Configuration
SUPABASE_URL=your-project-url-here
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **Important**: Never commit `.env.local` to git!

## 🗄️ Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-migration.sql`
3. Paste it into the SQL editor
4. Click **Run** to execute the migration

This will create:
- `analytics` table for aggregated analytics data
- `page_views` table for individual page tracking
- `visitors` table for visitor information
- Proper indexes and security policies

## 🔧 Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your portfolio and navigate between pages
3. Check the browser console for any errors
4. Verify data is being stored in Supabase:
   - Go to **Table Editor** in Supabase
   - Check the `analytics` table for new records

## 📊 Step 6: View Analytics Data

1. In Supabase dashboard, go to **Table Editor**
2. Select the `analytics` table
3. You should see analytics data being updated in real-time
4. The data structure matches your existing analytics format

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Double-check your environment variables
   - Ensure `.env.local` is in the project root
   - Restart your dev server after adding env vars

2. **"Table doesn't exist" error**
   - Make sure you ran the SQL migration
   - Check that the migration completed successfully

3. **CORS errors**
   - Supabase handles CORS automatically
   - If you see CORS errors, check your API routes

4. **Permission denied errors**
   - Verify RLS policies are set up correctly
   - Check that the migration script ran completely

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded:
   ```javascript
   console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
   ```
3. Test Supabase connection in browser console:
   ```javascript
   import { supabase } from '@/lib/supabase';
   console.log('Supabase client:', supabase);
   ```

## 🔄 Migration from JSON Files

Your existing JSON-based analytics will continue to work during the transition. The new Supabase system:

- **Replaces** the file-based analytics functions
- **Maintains** the same data structure
- **Provides** real-time updates and better performance
- **Enables** future features like user authentication

## 🎯 Next Steps

Once Supabase is working:

1. **Add real-time subscriptions** for live analytics updates
2. **Implement user authentication** for admin dashboard
3. **Add more detailed tracking** (referrers, user agents, etc.)
4. **Create custom dashboards** using Supabase's built-in tools

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

## 💰 Cost Information

**Free Tier Includes:**
- 500MB database storage
- 50MB file storage
- 2GB bandwidth/month
- 50,000 monthly active users
- 2 projects

**Perfect for portfolio sites!** You'll likely never exceed the free tier limits.

---

🎉 **You're all set!** Your portfolio now has a production-ready database with real-time analytics capabilities.
