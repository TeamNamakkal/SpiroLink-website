# 🔧 Firebase Sign-In Troubleshooting Checklist

## ✅ Pre-Flight Checklist (Before Testing)

- [ ] Firebase package installed: `npm list firebase`
- [ ] React Router installed: `npm list react-router-dom`
- [ ] No red errors in terminal when running `npm run dev`
- [ ] Firebase config is in [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts)
- [ ] AuthProvider wraps app in [chatbot-frontend/src/main.tsx](chatbot-frontend/src/main.tsx)
- [ ] App.tsx has routing setup with BrowserRouter

---

## 🧪 Testing Steps

### Step 1: Verify Firebase Connection
```
1. npm run dev
2. Open http://localhost:5173
3. Press F12 (open developer console)
4. Look for: ✅ Firebase connected successfully!
5. No red errors should appear
```

**If you see the message → Firebase is connected ✅**

---

### Step 2: Test Sign-Up Flow
```
1. Click "Sign Up" button on home page
2. Enter email: test@example.com
3. Enter password: Test123456 (must be 6+ chars)
4. Confirm password: Test123456
5. Click "Sign Up" button
6. Should redirect to /dashboard automatically
```

**Expected Results:**
- ✅ No error messages
- ✅ Redirects to dashboard
- ✅ Can see user email on dashboard
- ✅ User appears in Firebase Console → Authentication → Users

---

### Step 3: Verify User in Firebase
```
1. Open https://console.firebase.google.com
2. Select project: spirolinkweb
3. Click Authentication (left sidebar)
4. Click Users tab
5. Look for: test@example.com
```

**If visible → Sign-up works ✅**

---

### Step 4: Verify Firestore Data
```
1. Open https://console.firebase.google.com
2. Select project: spirolinkweb
3. Click Firestore Database (left sidebar)
4. Click Data tab
5. Look for: users → [userId] → email: test@example.com
```

**If visible → Firestore works ✅**

---

### Step 5: Test Sign-Out
```
1. On dashboard, click "Sign Out" button
2. Should redirect to /signin
```

**If redirected → Sign-out works ✅**

---

### Step 6: Test Sign-In
```
1. On sign-in page, enter:
   - Email: test@example.com
   - Password: Test123456
2. Click "Sign In"
3. Should redirect to /dashboard
```

**If redirected → Sign-in works ✅**

---

## ❌ Common Issues & Solutions

### Issue 1: "Firebase connected successfully" not showing in console

**Cause:** Firebase is not initializing

**Solutions:**
1. Check [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts) exists
2. Verify config is copied correctly
3. Check for syntax errors (missing commas, quotes)
4. Restart dev server: `Ctrl+C` then `npm run dev`

---

### Issue 2: Sign-Up page is blank or showing error

**Cause:** Component or routing issue

**Solutions:**
1. Check browser console for errors (F12)
2. Verify [chatbot-frontend/src/components/SignUp.tsx](chatbot-frontend/src/components/SignUp.tsx) exists
3. Check that `react-router-dom` is installed: `npm list react-router-dom`
4. Verify main.tsx has AuthProvider
5. Verify App.tsx has Router setup

---

### Issue 3: "Cannot find module 'react-router-dom'"

**Cause:** react-router-dom not installed

**Solution:**
```bash
cd chatbot-frontend
npm install react-router-dom --save
npm run dev
```

---

### Issue 4: Sign-up fails with error message

**Common Error Messages:**

| Error | Cause | Solution |
|-------|-------|----------|
| `auth/email-already-in-use` | Email already signed up | Use a different email |
| `auth/weak-password` | Password less than 6 chars | Use longer password |
| `auth/invalid-email` | Invalid email format | Check email format |
| `auth/operation-not-allowed` | Email/password disabled in Firebase | Enable in Firebase Console → Auth → Sign-in method |

---

### Issue 5: Can't sign in (says user not found)

**Cause:** Email doesn't exist in Firebase

**Solutions:**
1. Did you sign up first? (Try sign-up first)
2. Check if user exists in Firebase Console → Auth → Users
3. Try exact email you signed up with (case-sensitive)

---

### Issue 6: Sign-in succeeds but dashboard is blank

**Cause:** Dashboard component issue

**Solutions:**
1. Check console for errors (F12)
2. Check [chatbot-frontend/src/pages/Dashboard.tsx](chatbot-frontend/src/pages/Dashboard.tsx) exists
3. Verify no TypeScript errors: `npm run build`

---

### Issue 7: "useAuth must be used within AuthProvider"

**Cause:** AuthProvider not wrapping app

**Solution:**
1. Open [chatbot-frontend/src/main.tsx](chatbot-frontend/src/main.tsx)
2. Verify it has:
```tsx
import { AuthProvider } from './contexts/AuthContext'

<AuthProvider>
  <App />
</AuthProvider>
```

---

### Issue 8: Firestore showing "Permission denied" error

**Cause:** Firestore security rules blocking access

**Solution:**
1. Open Firebase Console → Firestore Database → Rules
2. Replace with test rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
3. Click Publish
4. Later, apply proper security rules from FIREBASE_SECURITY_RULES.md

---

### Issue 9: Dashboard loads but shows "Loading..." forever

**Cause:** AuthContext not updating properly

**Solutions:**
1. Check console for errors (F12)
2. Verify user is signed in: Check Firebase Console → Auth → Users
3. Check Firestore data exists
4. Restart dev server

---

### Issue 10: Firestore data not appearing after sign-up

**Cause:** Rules blocking write access OR Firestore disabled

**Solutions:**
1. Check Firestore is enabled in Firebase Console
2. Verify Firestore Rules allow write (use test mode)
3. Check browser console for exact error
4. Verify sign-up succeeded (check Firebase Console → Auth)

---

## 🔍 Debug Commands (Run in Browser Console)

```javascript
// Check if Firebase app exists
console.log("Firebase app:", typeof firebase !== 'undefined')

// Check current auth state
firebase.auth().onAuthStateChanged(user => {
  console.log("Current user:", user ? user.email : "Not signed in")
})

// Check Firestore connection
console.log("Firestore:", typeof firebase.firestore !== 'undefined')

// Get current user's UID
const user = firebase.auth().currentUser
console.log("User UID:", user ? user.uid : "No user")
```

---

## 📋 File Verification Checklist

Ensure these files exist:

- [ ] [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts)
- [ ] [chatbot-frontend/src/lib/auth.ts](chatbot-frontend/src/lib/auth.ts)
- [ ] [chatbot-frontend/src/contexts/AuthContext.tsx](chatbot-frontend/src/contexts/AuthContext.tsx)
- [ ] [chatbot-frontend/src/components/SignUp.tsx](chatbot-frontend/src/components/SignUp.tsx)
- [ ] [chatbot-frontend/src/components/SignIn.tsx](chatbot-frontend/src/components/SignIn.tsx)
- [ ] [chatbot-frontend/src/pages/Dashboard.tsx](chatbot-frontend/src/pages/Dashboard.tsx)

Run this to verify:
```bash
cd chatbot-frontend
ls -la src/lib/firebase.ts src/lib/auth.ts
ls -la src/contexts/AuthContext.tsx
ls -la src/components/SignUp.tsx src/components/SignIn.tsx
ls -la src/pages/Dashboard.tsx
```

All should show "✓" or file listed.

---

## 🚨 Critical Checks

**Before submitting to production:**

1. [ ] Firebase is connected (console shows ✅)
2. [ ] User can sign up
3. [ ] User can sign in
4. [ ] User can sign out
5. [ ] User data appears in Firestore
6. [ ] Dashboard loads correctly
7. [ ] No console errors
8. [ ] No TypeScript errors: `npm run build`
9. [ ] Firestore security rules are applied
10. [ ] Email verification configured (optional)

---

## 🆘 Still Having Issues?

If nothing above worked, collect this info and share:

1. **Screenshot of error message** (if any)
2. **Browser console error** (F12 → Console → Copy red errors)
3. **Output of this command:**
```bash
cd chatbot-frontend
npm list firebase react-router-dom
```
4. **Are there files in:**
   - `src/lib/firebase.ts`?
   - `src/components/SignUp.tsx`?
   - `src/pages/Dashboard.tsx`?

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ `npm run dev` starts without errors
2. ✅ Home page loads at http://localhost:5173
3. ✅ Console shows "Firebase connected successfully"
4. ✅ Can click to Sign Up page
5. ✅ Can enter email and password
6. ✅ Redirects to dashboard after sign up
7. ✅ User appears in Firebase Console Auth
8. ✅ User data in Firestore Database
9. ✅ Can sign out
10. ✅ Can sign in again
11. ✅ Dashboard shows email and user info

**If all 11 ✅ → You're done!**

---

**Last Updated:** 2 January 2026
