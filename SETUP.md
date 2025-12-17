# 🚀 DevTinder - Quick Start Guide

## What's New! 🎉

### ✅ Real-time Chat

- **Already Implemented!** Chat with your connections in real-time using Socket.io
- Private chat rooms for each connection
- Message history persistence
- Real-time notifications

### 💳 Razorpay Payment Gateway (NEW!)

- **Premium Subscription** - ₹499/month
- **Gold Subscription** - ₹999/month
- Secure payment processing
- Automatic subscription management

### 📧 AWS SES Email Service (NEW!)

- Welcome emails on signup
- Subscription confirmation emails
- Connection request notifications
- Professional HTML email templates

### 🌐 Production Deployment Ready (NEW!)

- Complete AWS EC2 setup guide
- Nginx reverse proxy configuration
- SSL certificate setup with Let's Encrypt
- PM2 process management

---

## 🔧 Local Development Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (already configured)
- Razorpay account (for payment testing)
- AWS account (for email service - optional for local dev)

### 1. Clone Repository

```bash
git clone https://github.com/curiousrajneesh27/Devtinder1.git
cd Devtinder1
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with these variables:
PORT=5000
NODE_ENV=development
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_SES_EMAIL=noreply@yourdomain.com

# Start backend
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file:
VITE_BACKEND_URL=http://localhost:5000

# Start frontend
npm run dev
```

---

## 🔑 Getting API Keys

### Razorpay Setup (Required for Payments)

1. Go to https://dashboard.razorpay.com
2. Sign up / Login
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Key** (for development)
5. Copy **Key ID** and **Key Secret** to backend `.env`

**Test Mode:**

- Use test keys (starts with `rzp_test_`)
- Use test card: 4111 1111 1111 1111
- Any CVV and future date

### AWS SES Setup (Optional for Local Dev)

1. Go to AWS Console → IAM
2. Create user with **AmazonSESFullAccess** policy
3. Generate access keys
4. Verify email address in SES console
5. Add keys to backend `.env`

**Note:** Emails won't send in development without AWS credentials, but app will work fine!

---

## 📱 Features Overview

### Free Plan

- 5 connection requests per day
- Basic profile
- Limited chat
- View 10 profiles per day

### Premium Plan (₹499/month)

- Unlimited connection requests
- Priority in feed
- Unlimited chat
- See who viewed your profile
- Advanced search filters
- Ad-free experience

### Gold Plan (₹999/month)

- All Premium features
- Gold badge on profile
- Top priority in feed
- Direct messaging
- Profile boost (3x visibility)
- Exclusive networking events
- Priority support

---

## 🎯 Available Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout

### Profile

- `GET /api/v1/profile/view` - Get current user
- `PATCH /api/v1/profile/edit` - Update profile

### Feed & Connections

- `GET /api/v1/user/feed` - Get user feed
- `POST /api/v1/request/send/:status/:userId` - Send request
- `GET /api/v1/request/received` - Get requests
- `POST /api/v1/request/review/:status/:requestId` - Accept/Reject
- `GET /api/v1/user/connections` - Get connections

### Chat (Real-time)

- `GET /api/v1/message/:userId` - Get messages
- `POST /api/v1/message/send/:receiverId` - Send message
- Socket.io events: `joinChat`, `sendMessage`, `messageReceived`

### Payments (NEW!)

- `GET /api/v1/payment/key` - Get Razorpay key
- `POST /api/v1/payment/create-order` - Create order
- `POST /api/v1/payment/verify` - Verify payment
- `GET /api/v1/payment/subscription` - Get subscription

---

## 🚀 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete AWS EC2 deployment guide with:

- EC2 instance setup
- Nginx configuration
- SSL certificates
- PM2 process management
- Domain configuration
- Production best practices

---

## 🐛 Troubleshooting

### Backend Issues

```bash
# Check backend logs
cd backend
npm run dev
# Look for MongoDB connection or API key errors
```

### Frontend Issues

```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

### Payment Testing

- Always use Razorpay **Test Keys** in development
- Test card: 4111 1111 1111 1111
- Test UPI: success@razorpay
- Don't use real payment details in test mode

---

## 📞 Need Help?

### Get API Keys:

1. **MongoDB**: Already configured in repo
2. **Razorpay**: Sign up at razorpay.com (free test account)
3. **AWS SES**: Optional for local development
4. **Domain**: Purchase from GoDaddy/Namecheap for production

### What You Need Right Now:

✅ **MongoDB** - Already have it
✅ **JWT Secret** - Already configured
❓ **Razorpay Keys** - Sign up and get test keys
❓ **AWS Keys** - Optional (skip for local testing)

---

## 🎉 Ready to Go!

Your DevTinder application now has:

- ✅ Real-time chat with Socket.io
- ✅ Razorpay payment gateway
- ✅ AWS SES email service
- ✅ Production-ready deployment config
- ✅ Complete API documentation

**Start coding and building amazing features!** 🚀
