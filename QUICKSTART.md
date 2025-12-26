# 🚀 DevTinder - Complete Setup & Deployment Guide

## 📦 What You Have Built

✅ **Full Stack Dating App** with:

- Real-time chat with Socket.io
- Online/offline status tracking
- Typing indicators
- Activity tracking & analytics
- User blocking & reporting system
- Premium subscriptions with Razorpay
- Email notifications with AWS SES
- Smart matching algorithm
- Mobile responsive UI

---

## 🏃 Quick Start - Run Locally (5 Minutes)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (open new terminal)
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env file is already created):**

```
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb+srv://new_user_1234:Rajneesh_database@namastenodejs.dcct8.mongodb.net/devtinder
JWT_SECRET=BhaiTeraSecretKey@1234
FRONTEND_URL=http://localhost:5173

# Optional - For Payment Testing
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret

# Optional - For Email Service
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_SES_EMAIL=noreply@yourdomain.com
```

**Frontend (.env file is already created):**

```
VITE_BACKEND_URL=http://localhost:5000
```

### Step 3: Start Both Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

✅ Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

✅ Frontend will run on: http://localhost:5173

### Step 4: Open Browser

Visit: **http://localhost:5173**

---

## 🔑 Required Credentials

### ✅ Already Working (No Action Needed):

- ✅ **MongoDB** - Already configured and working
- ✅ **JWT Secret** - Already set
- ✅ **Basic Features** - Chat, matching, connections all work!

### 📋 Optional Credentials (For Advanced Features):

#### 1️⃣ **Razorpay** (For Payment/Subscriptions)

**Where to get:**

1. Go to: https://dashboard.razorpay.com
2. Click **Sign Up** (it's FREE)
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Key**
5. Copy **Key ID** and **Key Secret**

**Add to backend/.env:**

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

**Test Cards (for testing payments):**

- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

#### 2️⃣ **AWS SES** (For Email Notifications)

**Where to get:**

1. Go to: https://aws.amazon.com
2. Create free account (12 months free tier)
3. Go to **IAM** → **Users** → **Create User**
4. Attach policy: **AmazonSESFullAccess**
5. Create **Access Keys**

**Add to backend/.env:**

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxx
AWS_SES_EMAIL=your-verified-email@gmail.com
```

**Note:** Without these, app works fine but premium features (payments/emails) won't work.

---

## 🌍 FREE Deployment Options

### Option 1: **Render.com** (RECOMMENDED - 100% Free)

#### **Deploy Backend on Render:**

1. Go to: https://render.com
2. Click **Sign Up** → Connect GitHub
3. Click **New** → **Web Service**
4. Select your repository: `Devtinder1`
5. Configure:

   - **Name:** devtinder-backend
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

6. Add Environment Variables (click **Add Environment Variable**):

   ```
   NODE_ENV=production
   MONGODB_URL=mongodb+srv://new_user_1234:Rajneesh_database@namastenodejs.dcct8.mongodb.net/devtinder
   JWT_SECRET=BhaiTeraSecretKey@1234
   FRONTEND_URL=https://your-frontend-url.vercel.app
   PORT=5000
   ```

7. Click **Create Web Service**
8. **Copy your backend URL:** `https://devtinder-backend.onrender.com`

#### **Deploy Frontend on Vercel:**

1. Go to: https://vercel.com
2. Click **Sign Up** → Connect GitHub
3. Click **New Project** → Import `Devtinder1`
4. Configure:

   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Add Environment Variable:

   ```
   VITE_BACKEND_URL=https://devtinder-backend.onrender.com
   ```

6. Click **Deploy**
7. **Your app is live!** 🎉

---

### Option 2: **Railway.app** (Backend + Frontend Together)

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select `Devtinder1`
5. Railway auto-detects both backend and frontend
6. Add environment variables in settings
7. Deploy with one click!

**Free Tier:** $5 credit/month (enough for small apps)

---

### Option 3: **Netlify** (Frontend) + **Render** (Backend)

**Same as Option 1, but use Netlify instead of Vercel for frontend**

1. Go to: https://netlify.com
2. Drag & drop `frontend/dist` folder after building locally
3. Or connect GitHub for auto-deploy

---

## 🎯 Deployment Comparison

| Platform    | Type     | Free Tier         | Best For            |
| ----------- | -------- | ----------------- | ------------------- |
| **Render**  | Backend  | 750 hrs/month     | Node.js apps        |
| **Vercel**  | Frontend | Unlimited         | React/Vite apps     |
| **Railway** | Both     | $5 credit/month   | Full stack together |
| **Netlify** | Frontend | 100GB bandwidth   | Static sites        |
| **Heroku**  | Both     | ❌ No longer free | -                   |

---

## 📱 After Deployment

### Update CORS Settings:

**backend/src/app.js** - Update allowed origins:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app", // Add your Vercel URL
  ],
  credentials: true,
};
```

### Test Your Live App:

1. Visit your Vercel URL
2. Sign up with new account
3. Test features:
   - ✅ Login/Signup
   - ✅ View feed
   - ✅ Send connection requests
   - ✅ Real-time chat
   - ✅ Online/offline status
   - ✅ Premium subscription (if Razorpay configured)

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend not connecting

**Solution:** Check `MONGODB_URL` in Render environment variables

### Issue 2: CORS errors

**Solution:** Add your Vercel URL to `corsOptions.origin` in backend/src/app.js

### Issue 3: Render free tier sleeps

**Solution:** First request takes 30 seconds (normal on free tier)

### Issue 4: Environment variables not working

**Solution:** Restart service after adding env variables

### Issue 5: Payment not working

**Solution:** Add Razorpay keys or disable payment features

---

## 📊 Features Status

| Feature             | Status      | Requires      |
| ------------------- | ----------- | ------------- |
| Authentication      | ✅ Working  | MongoDB       |
| User Profiles       | ✅ Working  | -             |
| Matching/Swiping    | ✅ Working  | -             |
| Connections         | ✅ Working  | -             |
| Real-time Chat      | ✅ Working  | -             |
| Online Status       | ✅ Working  | -             |
| Typing Indicators   | ✅ Working  | -             |
| Activity Tracking   | ✅ Working  | -             |
| Smart Matching      | ✅ Working  | -             |
| Premium Plans       | ⚠️ Optional | Razorpay Keys |
| Email Notifications | ⚠️ Optional | AWS SES       |
| Blocking/Reporting  | ✅ Working  | -             |

---

## 🎓 Tutorial Videos (Recommended)

### For Deployment:

- **Render Deployment:** https://www.youtube.com/results?search_query=deploy+nodejs+render
- **Vercel Deployment:** https://www.youtube.com/results?search_query=deploy+react+vercel
- **Railway Deployment:** https://www.youtube.com/results?search_query=deploy+fullstack+railway

### For API Keys:

- **Razorpay Setup:** https://www.youtube.com/results?search_query=razorpay+integration+nodejs
- **AWS SES Setup:** https://www.youtube.com/results?search_query=aws+ses+setup

---

## 🎉 Next Steps

1. ✅ Run locally first (test everything works)
2. ✅ Deploy backend to Render (copy backend URL)
3. ✅ Deploy frontend to Vercel (use backend URL)
4. ✅ Test live app
5. ✅ Get Razorpay keys (optional - for payments)
6. ✅ Share your app with friends!

---

## 💡 Pro Tips

### For Free Hosting:

- Use **Render** for backend (750 free hours/month)
- Use **Vercel** for frontend (unlimited)
- Use **MongoDB Atlas** (already setup) - 512MB free forever
- This combination = **100% FREE** hosting! 🎉

### To Keep Render Awake:

Use **cron-job.org** to ping your backend every 10 minutes:

```
https://devtinder-backend.onrender.com/api/v1/health
```

### Performance:

- Render free tier sleeps after 15 min inactivity
- First request takes ~30 seconds to wake up
- Subsequent requests are fast
- Upgrade to paid ($7/month) for always-on

---

## 📞 Support

**Repository:** https://github.com/curiousrajneesh27/Devtinder1

**Need Help?**

1. Check [SETUP.md](./SETUP.md) for detailed API setup
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for AWS EC2 setup
3. Create GitHub issue for bugs

---

## ✅ Checklist

- [ ] Installed Node.js 18+
- [ ] Ran `npm install` in both backend & frontend
- [ ] Created `.env` files
- [ ] Started backend server (port 5000)
- [ ] Started frontend server (port 5173)
- [ ] Tested locally at http://localhost:5173
- [ ] Created Render account for backend
- [ ] Created Vercel account for frontend
- [ ] Deployed backend to Render
- [ ] Deployed frontend to Vercel
- [ ] Updated CORS origins
- [ ] Tested live app
- [ ] (Optional) Added Razorpay keys
- [ ] (Optional) Added AWS SES credentials

---

## 🎊 Congratulations!

You now have a **production-ready dating app** with:

- 🚀 Real-time features
- 💳 Payment integration
- 📧 Email notifications
- 📊 Analytics tracking
- 🔒 User safety features
- 📱 Mobile responsive design

**Your app is ready to go viral! Share it! 🎉**
