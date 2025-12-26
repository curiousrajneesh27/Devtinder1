# 🚀 Quick Installation Guide

## Backend Setup

### 1. Install Multer for File Uploads

```bash
cd backend
npm install multer
```

### 2. Create Uploads Directory

```bash
mkdir -p public/uploads
```

### 3. Install Testing Dependencies (Optional)

```bash
npm install --save-dev jest supertest @jest/globals
```

### 4. Update package.json Scripts

Add the following to your `backend/package.json`:

```json
{
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch"
  }
}
```

---

## Frontend Setup

### 1. Install Testing Dependencies (Optional)

```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. Update package.json Scripts

Add to `frontend/package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

### 3. Create vitest.config.js (if not exists)

```javascript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
  },
});
```

### 4. Create Icon Assets

You need to create app icons for PWA. Use any online tool or design software to create the following sizes:

**Required Icons:**

- 72x72 pixels
- 96x96 pixels
- 128x128 pixels
- 144x144 pixels
- 152x152 pixels
- 192x192 pixels
- 384x384 pixels
- 512x512 pixels

Save them as:

```
frontend/public/assets/icon-72x72.png
frontend/public/assets/icon-96x96.png
frontend/public/assets/icon-128x128.png
frontend/public/assets/icon-144x144.png
frontend/public/assets/icon-152x152.png
frontend/public/assets/icon-192x192.png
frontend/public/assets/icon-384x384.png
frontend/public/assets/icon-512x512.png
```

**Quick Icon Generation:**
You can use online tools like:

- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- https://favicon.io/

---

## Database Setup

No additional database changes needed! The schemas have been updated in the code.

However, if you want to ensure clean state, you can:

1. **Clear existing messages** (optional - only if you want fresh start):

```javascript
// In MongoDB shell or Compass
db.messages.deleteMany({});
```

2. **Update existing users** (optional - to add blockedUsers field):

```javascript
db.users.updateMany(
  { blockedUsers: { $exists: false } },
  { $set: { blockedUsers: [] } }
);
```

---

## Environment Variables

No new environment variables are needed! The existing setup works with all new features.

Ensure you have:

```
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
```

---

## Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## Testing the Features

### 1. Online Status

- Open the app in two different browser windows/tabs
- Log in as different users
- Start a chat
- You should see green dot when user is online

### 2. Typing Indicator

- In a chat, start typing
- The other user should see "typing..." appear
- It should disappear after 1 second of no typing

### 3. File Attachments

- Click the attachment icon (📎) in chat
- Select an image, PDF, or code file
- Send the file
- Verify it displays correctly and can be downloaded

### 4. Match Suggestions

- Navigate to `/match-suggestions` or add navigation link
- View suggested matches based on your skills

### 5. Activity Stats

- Add the ActivityStats component to your profile page
- View your statistics

### 6. Report/Block

- Use the ReportBlockModal component on any user profile
- Test reporting and blocking functionality

### 7. Push Notifications

- Allow notifications when prompted
- Have another user send you a message
- Verify notification appears

### 8. PWA

- On mobile: Look for "Add to Home Screen" option
- On desktop: Look for install icon in address bar
- Install and test offline functionality

---

## Troubleshooting

### File Upload Not Working

1. Check if `public/uploads` directory exists
2. Verify multer is installed
3. Check file size (max 10MB)
4. Check file type is allowed

### Socket Connection Issues

1. Verify backend and frontend URLs in environment
2. Check CORS settings
3. Ensure socket.io versions match on both ends

### PWA Not Installing

1. Verify manifest.json is accessible
2. Check service-worker.js is registered
3. Ensure HTTPS (or localhost)
4. Create all required icon sizes

### Notifications Not Showing

1. Check browser notification permissions
2. Verify service worker is registered
3. Test with simple notification first
4. Check browser console for errors

### Tests Failing

1. Install all dev dependencies
2. Check test file imports
3. Verify test configuration files
4. Run tests individually to isolate issues

---

## Next Steps

1. **Add Navigation Links** for new pages:

   - Match Suggestions
   - Activity Stats

2. **Integrate Components** into existing pages:

   - Add ReportBlockModal to user profiles
   - Add ActivityStats to profile page

3. **Generate Real Icons** for PWA using your app logo

4. **Configure Cloud Storage** for production file uploads:

   - AWS S3
   - Cloudinary
   - Google Cloud Storage

5. **Expand Test Coverage** for production readiness

6. **Deploy** with proper environment configuration

---

## Production Checklist

Before deploying to production:

- [ ] Generate proper app icons
- [ ] Set up cloud storage for file uploads
- [ ] Configure proper CORS origins
- [ ] Set up HTTPS
- [ ] Enable proper error logging
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Configure rate limiting
- [ ] Add file upload size limits
- [ ] Implement proper file validation
- [ ] Set up automated backups
- [ ] Configure CDN for static assets
- [ ] Run full test suite
- [ ] Test on multiple devices/browsers
- [ ] Enable compression
- [ ] Optimize images and assets

---

## Support

If you encounter any issues:

1. Check the FEATURES.md documentation
2. Review console errors in browser DevTools
3. Check backend logs
4. Verify all dependencies are installed
5. Ensure environment variables are set correctly

---

## Congratulations! 🎉

You've successfully set up all the new features! Your DevTinder app now includes:

✅ Online/Offline Status
✅ Typing Indicators
✅ File Attachments
✅ Enhanced UI/UX
✅ Match Suggestions
✅ Activity Stats
✅ Report/Block System
✅ Push Notifications
✅ PWA Support
✅ Test Coverage

Happy coding! 🚀
