# DevTinder - Production Deployment Guide

## 🚀 Complete AWS EC2 Deployment with Nginx

This guide will help you deploy DevTinder on AWS EC2 with Nginx as a reverse proxy, SSL certificates, and production-ready configuration.

---

## 📋 Prerequisites

Before starting, you'll need:

1. **AWS Account** - [Sign up here](https://aws.amazon.com/)
2. **Domain Name** (Optional but recommended) - GoDaddy, Namecheap, etc.
3. **Razorpay Account** - [Sign up here](https://razorpay.com/)
4. **MongoDB Atlas** - Already configured
5. **Basic Linux/SSH knowledge**

---

## 🖥️ Part 1: Setting up AWS EC2 Instance

### Step 1: Launch EC2 Instance

1. **Login to AWS Console** → Navigate to EC2
2. **Click "Launch Instance"**
3. **Configure Instance:**

   - **Name**: devtinder-production
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: t2.medium (recommended) or t2.micro (for testing)
   - **Key Pair**: Create new key pair and download `.pem` file
   - **Storage**: 20 GB gp3 (minimum)

4. **Configure Security Group:**

   - Allow **SSH (22)** from your IP
   - Allow **HTTP (80)** from anywhere (0.0.0.0/0)
   - Allow **HTTPS (443)** from anywhere (0.0.0.0/0)
   - Allow **Custom TCP (5000)** from anywhere (for backend testing)

5. **Click "Launch Instance"**

### Step 2: Connect to Your EC2 Instance

```bash
# Change permissions of your key file
chmod 400 your-key.pem

# Connect to EC2
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

---

## 📦 Part 2: Server Setup

### Step 1: Update System and Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install Git
sudo apt install git -y

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### Step 2: Clone Your Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/curiousrajneesh27/Devtinder1.git

# Rename folder (optional)
mv Devtinder1 devtinder

cd devtinder
```

---

## 🔧 Part 3: Backend Configuration

### Step 1: Setup Backend Environment

```bash
cd ~/devtinder/backend

# Create .env file
nano .env
```

**Add the following content:**

```env
PORT=5000
NODE_ENV=production
MONGODB_URL=mongodb+srv://new_user_1234:Rajneesh_database@namastenodejs.dcct8.mongodb.net/devtinder?ssl=true&authSource=admin
JWT_SECRET=BhaiTeraSecretKey@1234
FRONTEND_URL=https://yourdomain.com

# Razorpay Configuration (Get from Razorpay Dashboard)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# AWS SES Configuration (Get from AWS IAM)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_SES_EMAIL=noreply@yourdomain.com
```

**Save:** Press `CTRL + X`, then `Y`, then `Enter`

### Step 2: Install Dependencies and Start Backend

```bash
# Install dependencies
npm install

# Start backend with PM2
pm2 start src/index.js --name devtinder-backend

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Copy and run the command that PM2 outputs

# Check status
pm2 status
pm2 logs devtinder-backend
```

---

## 🎨 Part 4: Frontend Configuration

### Step 1: Setup Frontend Environment

```bash
cd ~/devtinder/frontend

# Create .env file
nano .env
```

**Add the following:**

```env
VITE_BACKEND_URL=https://api.yourdomain.com
```

**Save:** Press `CTRL + X`, then `Y`, then `Enter`

### Step 2: Build Frontend

```bash
# Install dependencies
npm install

# Build for production
npm run build

# This creates a 'dist' folder with optimized static files
```

---

## 🌐 Part 5: Nginx Configuration

### Step 1: Configure Nginx for Both Frontend and Backend

```bash
# Remove default nginx config
sudo rm /etc/nginx/sites-enabled/default

# Create new config
sudo nano /etc/nginx/sites-available/devtinder
```

**Add this configuration:**

```nginx
# Backend API Server
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support for Socket.io
    location /socket.io/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend Server
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /home/ubuntu/devtinder/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

**Save:** Press `CTRL + X`, then `Y`, then `Enter`

### Step 2: Enable Configuration and Restart Nginx

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/devtinder /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# If test is successful, restart nginx
sudo systemctl restart nginx

# Enable nginx to start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

---

## 🔒 Part 6: SSL Certificate with Let's Encrypt (HTTPS)

### Step 1: Install Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Get SSL Certificates

```bash
# Make sure your domain DNS is pointing to your EC2 IP

# Get certificates for both frontend and backend
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)
```

### Step 3: Auto-Renewal Setup

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up auto-renewal via cron
```

---

## 📧 Part 7: AWS SES Setup (Email Service)

### Step 1: Create AWS SES Account

1. **Go to AWS Console** → Search for "SES" → Click "Amazon Simple Email Service"
2. **Verify Email Address:**

   - Click "Verified identities" → "Create identity"
   - Choose "Email address"
   - Enter: `noreply@yourdomain.com`
   - Check your email and click verification link

3. **Request Production Access:**
   - By default, SES is in "Sandbox mode"
   - Click "Account dashboard" → "Request production access"
   - Fill out the form explaining your use case

### Step 2: Create IAM User for SES

1. **Go to IAM** → Users → Create User
2. **User name**: `devtinder-ses-user`
3. **Attach policy**: `AmazonSESFullAccess`
4. **Create access key** → Save `Access Key ID` and `Secret Access Key`
5. **Add these to your backend `.env` file**

---

## 💳 Part 8: Razorpay Setup

### Step 1: Create Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up and complete KYC
3. Go to **Settings** → **API Keys**
4. Generate **Test Keys** (for testing) or **Live Keys** (for production)

### Step 2: Configure Webhooks (Optional)

1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://api.yourdomain.com/api/v1/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`

---

## 🔄 Part 9: Deployment Updates

### When you make code changes:

**Backend Updates:**

```bash
cd ~/devtinder/backend
git pull origin main
npm install
pm2 restart devtinder-backend
pm2 logs devtinder-backend
```

**Frontend Updates:**

```bash
cd ~/devtinder/frontend
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
```

---

## 📊 Part 10: Monitoring and Logs

### PM2 Commands

```bash
# View all processes
pm2 list

# View logs
pm2 logs devtinder-backend

# Monitor resources
pm2 monit

# Restart process
pm2 restart devtinder-backend

# Stop process
pm2 stop devtinder-backend

# Delete process
pm2 delete devtinder-backend
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🔧 Part 11: DNS Configuration

### If using a custom domain:

1. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
2. **Add DNS Records:**

| Type | Name | Value              | TTL  |
| ---- | ---- | ------------------ | ---- |
| A    | @    | your-ec2-public-ip | 3600 |
| A    | www  | your-ec2-public-ip | 3600 |
| A    | api  | your-ec2-public-ip | 3600 |

3. **Wait for DNS propagation** (can take up to 48 hours, usually 15-30 minutes)

---

## ✅ Part 12: Final Checklist

- [ ] EC2 instance running
- [ ] MongoDB Atlas connected
- [ ] Backend running on PM2
- [ ] Frontend built and served by Nginx
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Razorpay API keys configured
- [ ] AWS SES verified and configured
- [ ] Firewall rules configured

---

## 🎉 Your Application is Live!

**Access your application:**

- **Frontend**: https://yourdomain.com
- **Backend API**: https://api.yourdomain.com
- **Health Check**: https://api.yourdomain.com/api/v1/health

---

## 🐛 Troubleshooting

### Backend not starting:

```bash
pm2 logs devtinder-backend
# Check for errors in MongoDB connection or environment variables
```

### Frontend showing blank page:

```bash
# Check if build was successful
cd ~/devtinder/frontend
npm run build

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### SSL certificate not working:

```bash
# Verify domain DNS is pointing to EC2
nslookup yourdomain.com

# Re-run certbot
sudo certbot --nginx -d yourdomain.com
```

---

## 📞 Need Help?

If you need any of the following:

1. **Razorpay API Keys** - Create account at razorpay.com
2. **AWS Access Keys** - Create IAM user in AWS Console
3. **Domain Name** - Purchase from GoDaddy/Namecheap
4. **MongoDB URL** - Already have it: check backend/.env

---

## 🚀 What's Implemented:

✅ **Real-time Chat** - Socket.io with private rooms
✅ **Razorpay Payment Gateway** - Premium & Gold subscriptions
✅ **AWS SES Email Service** - Welcome & subscription emails
✅ **Production-Ready Deployment** - PM2, Nginx, SSL
✅ **Complete Backend API** - All features working
✅ **Responsive Frontend** - Mobile-friendly UI

---

**Your DevTinder application is now production-ready! 🎉**
