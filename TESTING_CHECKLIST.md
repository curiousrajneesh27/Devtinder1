# ✅ Feature Testing Checklist

## Pre-Testing Setup

- [ ] Backend is running on port 3000
- [ ] Frontend is running on port 5173
- [ ] MongoDB is connected
- [ ] At least 2 test users created
- [ ] Users have added skills to their profiles
- [ ] multer package installed
- [ ] `backend/public/uploads` directory exists

---

## 1. 🚧 Online/Offline Status

### Test Steps:

- [ ] Open app in Browser Tab 1, login as User A
- [ ] Open app in Browser Tab 2, login as User B
- [ ] User A sends connection request to User B
- [ ] User B accepts connection request
- [ ] User A opens chat with User B
- [ ] Verify **green dot appears** next to "Online" text in chat header
- [ ] Close Browser Tab 2 (User B disconnects)
- [ ] Verify **gray dot appears** and status changes to "Offline" in Tab 1
- [ ] Refresh Tab 1 and verify status persists

### Expected Results:

✅ Green dot when user is online  
✅ Gray dot when user is offline  
✅ Status updates in real-time  
✅ No console errors

---

## 2. 💬 Typing Indicator

### Test Steps:

- [ ] Open chat between two connected users (A and B) in separate tabs
- [ ] In Tab 1 (User A), start typing in message input
- [ ] In Tab 2 (User B), verify "typing..." appears below messages
- [ ] Stop typing in Tab 1
- [ ] Wait 1 second
- [ ] Verify "typing..." disappears in Tab 2
- [ ] Type and send a message in Tab 1
- [ ] Verify typing indicator disappears immediately after sending

### Expected Results:

✅ "typing..." appears when user types  
✅ Disappears after 1 second of no typing  
✅ Disappears immediately when message is sent  
✅ Real-time updates

---

## 3. 📎 File Attachments in Chat

### Test Image Upload:

- [ ] Click attachment icon (📎) in chat
- [ ] Select an image file (JPG, PNG, GIF, or WebP)
- [ ] Verify file name appears below input
- [ ] Click send button
- [ ] Verify image displays inline in chat
- [ ] Verify image can be clicked/viewed
- [ ] Verify other user receives image in real-time

### Test PDF Upload:

- [ ] Click attachment icon
- [ ] Select a PDF file
- [ ] Verify PDF icon appears in message
- [ ] Verify file name and size are shown
- [ ] Click download button
- [ ] Verify PDF downloads correctly

### Test Code File Upload:

- [ ] Click attachment icon
- [ ] Select a code file (.js, .jsx, .py, .java, etc.)
- [ ] Verify code file icon appears
- [ ] Verify file details are displayed
- [ ] Test download functionality

### Test File Size Limit:

- [ ] Try uploading a file larger than 10MB
- [ ] Verify error message appears
- [ ] Verify file is not uploaded

### Test Unsupported File:

- [ ] Try uploading an .exe or .zip file
- [ ] Verify error message appears

### Expected Results:

✅ Images display inline  
✅ PDFs/files show icon and name  
✅ Download button works  
✅ File size displayed correctly  
✅ 10MB limit enforced  
✅ Unsupported files rejected

---

## 4. 🎨 UI/UX Improvements

### Test Animations:

- [ ] Navigate between pages and observe fade-in effects
- [ ] Observe smooth transitions on all elements
- [ ] Check card hover effects on feed/suggestions
- [ ] Test button hover glow effects

### Test Mobile Responsiveness:

- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test on iPhone SE (375px)
- [ ] Test on iPad (768px)
- [ ] Test on Desktop (1920px)
- [ ] Verify all elements are properly sized
- [ ] Verify navigation works on mobile
- [ ] Test chat on mobile view

### Test Scrollbar:

- [ ] Scroll on any page with long content
- [ ] Verify custom scrollbar styling
- [ ] Check scrollbar hover effects

### Expected Results:

✅ Smooth animations on page transitions  
✅ Card hover effects work  
✅ Mobile responsive on all screen sizes  
✅ Custom scrollbar visible and styled

---

## 5. 🎯 Daily Match Suggestions

### Test Steps:

- [ ] Ensure logged-in user has skills in profile
- [ ] Navigate to "Match Suggestions" from header menu
- [ ] Verify page loads without errors
- [ ] Verify users with matching skills are shown
- [ ] Verify match score is displayed (e.g., "3 matching skills")
- [ ] Verify users are sorted by match score (highest first)
- [ ] Verify max 10 suggestions shown
- [ ] Verify already connected users are NOT shown
- [ ] Verify blocked users are NOT shown
- [ ] Test "Send Connection Request" button

### Expected Results:

✅ Suggestions load correctly  
✅ Match scores are accurate  
✅ Sorted by best matches  
✅ Excludes connections and blocked users  
✅ Limit of 10 suggestions

---

## 6. 📊 Activity Stats Dashboard

### Test Steps:

- [ ] Navigate to Profile page
- [ ] Click on "Activity Stats" tab
- [ ] Verify all stat cards display:
  - Profile Views
  - Swipes Given
  - Swipes Received
  - Total Connections
- [ ] Verify "Recent Profile Views" section appears (if any views exist)
- [ ] Verify viewer avatars and names display
- [ ] Verify "Last Active" timestamp shows
- [ ] Interact with feed (view profiles, swipe) and refresh stats
- [ ] Verify counts update correctly

### Expected Results:

✅ All stat cards display  
✅ Numbers are accurate  
✅ Recent viewers list works  
✅ Last active timestamp correct  
✅ Responsive grid layout

---

## 7. 🛡️ Reporting & Blocking System

### Test Report Functionality:

- [ ] Add Report/Block button to a user profile or chat (you may need to integrate the ReportBlockModal component)
- [ ] Click Report/Block button
- [ ] Verify modal opens
- [ ] Click "Report User"
- [ ] Select a reason from dropdown
- [ ] Add optional description
- [ ] Click "Submit Report"
- [ ] Verify success toast appears
- [ ] Verify modal closes
- [ ] Check backend database for report entry

### Test Block Functionality:

- [ ] Open Report/Block modal
- [ ] Click "Block User"
- [ ] Verify confirmation message appears
- [ ] Click "Block User" again to confirm
- [ ] Verify success toast appears
- [ ] Verify user no longer appears in feed
- [ ] Verify cannot send messages to blocked user
- [ ] Verify blocked user cannot see your profile

### Expected Results:

✅ Modal opens/closes correctly  
✅ Report form validates  
✅ Report submission succeeds  
✅ Block functionality works  
✅ Blocked users hidden from feed  
✅ Cannot interact with blocked users

---

## 8. 🔔 Push Notifications

### Test Browser Notifications:

- [ ] Clear browser data (to reset notification permission)
- [ ] Open the app
- [ ] Verify notification permission prompt appears
- [ ] Click "Allow"
- [ ] Open app in two tabs (different users)
- [ ] Send a message from Tab 2 to Tab 1
- [ ] Minimize or switch away from Tab 1
- [ ] Verify browser notification appears
- [ ] Click notification
- [ ] Verify app opens/focuses

### Test Notification Content:

- [ ] Verify notification shows sender name
- [ ] Verify notification shows message preview
- [ ] Verify notification shows sender avatar

### Test When Notification Permission Denied:

- [ ] Deny notification permission
- [ ] Verify app still works normally
- [ ] Verify no console errors

### Expected Results:

✅ Permission prompt appears on first visit  
✅ Notifications appear when messages received  
✅ Notification content is accurate  
✅ Clicking notification opens app  
✅ App works even if permission denied

---

## 9. 📱 Mobile Responsiveness & PWA

### Test Mobile Responsiveness:

- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test on various devices:
  - iPhone SE (375px)
  - iPhone 12 Pro (390px)
  - iPad (768px)
  - iPad Pro (1024px)
- [ ] Test all pages:
  - Home
  - Login/Signup
  - Feed
  - Profile
  - Chat
  - Connections
  - Match Suggestions
- [ ] Verify no horizontal scrolling
- [ ] Verify all buttons are tappable
- [ ] Verify text is readable
- [ ] Verify images scale properly

### Test PWA Installation (Desktop):

- [ ] Open app in Chrome/Edge
- [ ] Look for install icon in address bar
- [ ] Click install icon
- [ ] Click "Install"
- [ ] Verify app installs and opens in standalone window
- [ ] Verify app icon appears in Start menu/Applications
- [ ] Test app functionality in installed version
- [ ] Verify offline mode (disconnect internet, refresh page)

### Test PWA Installation (Mobile - Android):

- [ ] Open app in Chrome on Android
- [ ] Tap menu (⋮)
- [ ] Tap "Add to Home Screen"
- [ ] Verify app icon appears on home screen
- [ ] Tap icon to open
- [ ] Verify app opens in standalone mode (no browser UI)
- [ ] Test functionality

### Test PWA Installation (Mobile - iOS):

- [ ] Open app in Safari on iPhone
- [ ] Tap Share button
- [ ] Scroll and tap "Add to Home Screen"
- [ ] Tap "Add"
- [ ] Verify icon on home screen
- [ ] Test functionality

### Test Service Worker:

- [ ] Open DevTools
- [ ] Go to Application tab
- [ ] Click "Service Workers"
- [ ] Verify service worker is registered and activated
- [ ] Test offline mode:
  - Disconnect internet
  - Refresh page
  - Verify basic app shell loads

### Expected Results:

✅ Responsive on all screen sizes  
✅ No layout breaks on mobile  
✅ PWA installs successfully  
✅ Standalone mode works  
✅ Service worker registers  
✅ Basic offline functionality

---

## 10. 💥 Unit & Integration Tests

### Backend Tests:

- [ ] Navigate to backend directory
- [ ] Run `npm test` (if Jest is set up)
- [ ] Verify all tests pass
- [ ] Check test coverage report

### Frontend Tests:

- [ ] Navigate to frontend directory
- [ ] Run `npm test` (if Vitest is set up)
- [ ] Verify all tests pass
- [ ] Check test coverage

### Expected Results:

✅ Backend tests run without errors  
✅ Frontend tests run without errors  
✅ All tests pass  
✅ Reasonable code coverage

---

## Additional Tests

### Cross-Browser Testing:

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Test in Safari (if on Mac/iOS)

### Performance Testing:

- [ ] Open DevTools Performance tab
- [ ] Record page load
- [ ] Verify load time < 3 seconds
- [ ] Check for memory leaks

### Security Testing:

- [ ] Try accessing protected routes without login
- [ ] Try uploading malicious files
- [ ] Test XSS prevention
- [ ] Test CSRF protection

### Error Handling:

- [ ] Test with network disconnected
- [ ] Test with backend offline
- [ ] Test with invalid form inputs
- [ ] Verify user-friendly error messages

---

## Final Checklist

- [ ] All 10 features tested and working
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Responsive on mobile, tablet, and desktop
- [ ] PWA can be installed
- [ ] Notifications work
- [ ] File uploads work
- [ ] Real-time features work
- [ ] Tests pass
- [ ] Ready for production deployment

---

## Bug Report Template

If you find any issues, use this template:

```
**Bug Title:**

**Feature:** [Which feature]

**Steps to Reproduce:**
1.
2.
3.

**Expected Behavior:**

**Actual Behavior:**

**Screenshots:**

**Browser/Device:**

**Console Errors:**
```

---

## Notes

- Some features may require manual integration (e.g., ReportBlockModal in user profiles)
- PWA icons need to be generated and placed in correct location
- For production, configure cloud storage for file uploads
- Enable HTTPS for full PWA and notification support

---

## ✅ Sign-Off

Once all tests pass:

- [ ] All features working as expected
- [ ] No critical bugs found
- [ ] Performance is acceptable
- [ ] Ready for user acceptance testing
- [ ] Ready for production deployment

**Tested By:** ******\_\_\_******  
**Date:** ******\_\_\_******  
**Status:** ⬜ Pass / ⬜ Fail

---

## 🎉 Congratulations!

If all tests pass, your DevTinder app is **production-ready** with all 11 features fully implemented and tested!
