#!/bin/bash

# Server Setup Script for Next.js Portfolio
# Run this on your EC2 instance after launching

echo "🚀 Setting up server for Next.js Portfolio..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt install certbot python3-certbot-nginx -y

# Create app directory
echo "📁 Creating application directory..."
mkdir -p /home/ubuntu/adarsh-portfolio
cd /home/ubuntu/adarsh-portfolio

# Clone repository (you'll need to set up SSH keys)
echo "📥 Cloning repository..."
# git clone https://github.com/yourusername/adarsh-portfolio.git .

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build application
echo "🔨 Building application..."
npm run build

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Enable services to start on boot
sudo systemctl enable nginx
sudo systemctl enable pm2-ubuntu

echo "✅ Server setup complete!"
echo "🌐 Your app should be running on port 3000"
echo "🔧 Next steps:"
echo "   1. Set up domain DNS to point to this server"
echo "   2. Run: sudo certbot --nginx -d your-domain.com"
echo "   3. Configure GitHub Actions secrets"
echo "   4. Test deployment pipeline"
