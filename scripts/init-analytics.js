const fs = require('fs');
const path = require('path');

// Analytics data structure
const defaultAnalytics = {
  pageViews: {
    '/': 0,
    '/blog': 0,
    '/projects': 0,
  },
  visitors: {
    total: 0,
    unique: 0,
    returning: 0,
    countries: {
      'Unknown': 0,
    },
    devices: {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    },
  },
  blogStats: {
    totalPosts: 0,
    totalViews: 0,
    popularPosts: {},
  },
  performance: {
    averageLoadTime: 0,
    totalRequests: 0,
    errors: 0,
  },
  lastUpdated: new Date().toISOString(),
  lastReset: new Date().toISOString(),
};

// File paths
const ANALYTICS_DIR = path.join(process.cwd(), 'data', 'analytics');
const ANALYTICS_FILE = path.join(ANALYTICS_DIR, 'analytics.json');
const BACKUP_DIR = path.join(ANALYTICS_DIR, 'backups');

// Ensure directories exist
function ensureDirectories() {
  if (!fs.existsSync(ANALYTICS_DIR)) {
    fs.mkdirSync(ANALYTICS_DIR, { recursive: true });
    console.log('✅ Created analytics directory:', ANALYTICS_DIR);
  }
  
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log('✅ Created backup directory:', BACKUP_DIR);
  }
}

// Initialize analytics file
function initAnalytics() {
  try {
    ensureDirectories();
    
    if (!fs.existsSync(ANALYTICS_FILE)) {
      fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(defaultAnalytics, null, 2));
      console.log('✅ Created analytics file:', ANALYTICS_FILE);
    } else {
      console.log('ℹ️  Analytics file already exists:', ANALYTICS_FILE);
    }
    
    console.log('🎉 Analytics system initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing analytics:', error);
    process.exit(1);
  }
}

// Run initialization
initAnalytics();
