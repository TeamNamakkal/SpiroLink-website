# ✅ How to Check if Firebase Is Connected to Your Website

## 🔍 METHOD 1: Check in Browser Console (BEST & SIMPLE)

### 🔹 Step 1: Open Your Website
1. Open your React app in the browser (usually `http://localhost:5173`)
2. Right-click anywhere → **Inspect** (or press `F12`)
3. Click the **Console** tab at the top

### 🔹 Step 2: Add a Test Log in firebase.ts
Add this in [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts) after initialization:

```tsx
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("✅ Firebase connected successfully!", app);
```

### 🔹 Step 3: Refresh Your Website
- Press `Ctrl + R` (or `Cmd + R` on Mac)
- Look at the browser console

### ✅ If Connected:
You will see:
```
✅ Firebase connected successfully! 
{...FirebaseApp object...}
```

### ❌ If NOT Connected:
You will see errors in red, such as:
```
Firebase is not defined
Uncaught SyntaxError: Cannot use import
Failed to load resource
FirebaseError: Invalid API Key
```

---

## 🔍 METHOD 2: Check Firebase Console (Auth Users)

### 🔹 Step 1: Test Sign Up on Website
1. Navigate to `/signup` route on your site
2. Enter email & password
3. Click "Sign Up"

### 🔹 Step 2: Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `spirolinkweb`
3. Click **Authentication** (left sidebar)
4. Click **Users** tab

### ✅ If Connected:
You will see the email address you just signed up with listed in the Users table:
```
user@example.com | (auto-generated UID)
```

### ❌ If NOT Connected:
- No user appears in the list
- Error message appears on website signup form
- Console shows "Permission denied" error

---

## 🔍 METHOD 3: Check Firestore Data

### 🔹 Step 1: Sign Up from Website
1. Go to `/signup`
2. Create a new account with email & password
3. Should redirect to `/dashboard`

### 🔹 Step 2: Check Firebase Console → Firestore Database → Data
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select `spirolinkweb` project
3. Click **Firestore Database** (left sidebar)
4. Click **Data** tab

### ✅ If Connected:
You will see the data structure:
```
users (collection)
 └── [userId] (document)
      ├── email: "user@example.com"
      ├── uid: "firebase-generated-uid"
      ├── createdAt: (timestamp)
      ├── name: ""
      ├── phone: ""
      └── role: "user"
```

### ❌ If NOT Connected:
- `users` collection not created
- No data appears after signup
- Firestore error in browser console

---

## 🔴 Common Reasons Firebase Is NOT Connected & FIX

### **Problem 1: Module import error**

❌ **Error:**
```
Uncaught SyntaxError: Cannot use import statement outside a module
```

✅ **FIX:**
Check that you're using ES6 modules in your React/TypeScript setup. Your `vite.config.ts` should handle this automatically. If building for browser, ensure:
```html
<script type="module" src="app.js"></script>
```

---

### **Problem 2: Firebase config is incorrect**

❌ **Error:**
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```

✅ **FIX:**
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Go to Project Settings (gear icon)
3. Copy the **exact** config for your web app
4. Paste it in [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts)
5. Ensure **no missing commas or quotes**

Correct format:
```tsx
const firebaseConfig = {
  apiKey: "AIzaSyCaYqi5aSIC4-NFfrLZQzosaJi77G8pp44",
  authDomain: "spirolinkweb.firebaseapp.com",
  projectId: "spirolinkweb",
  storageBucket: "spirolinkweb.firebasestorage.app",
  messagingSenderId: "1069212184136",
  appId: "1:1069212184136:web:4e2bbe8557c4d2580a327d",
  measurementId: "G-KBYFFZRRJ7"
};
```

---

### **Problem 3: Firebase SDK not imported**

❌ **Error:**
```
initializeApp is not defined
Firebase is not defined
```

✅ **FIX:**
Ensure imports are correct in [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts):
```tsx
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
```

Check that Firebase was installed:
```bash
cd chatbot-frontend
npm list firebase
```

If not installed:
```bash
npm install firebase
```

---

### **Problem 4: Firestore rules blocking access**

❌ **Error:**
```
FirebaseError: Missing or insufficient permissions
```

✅ **FIX (for testing):**
Temporarily use test mode rules in Firebase Console:
1. Go to **Firestore Database** → **Rules**
2. Replace with:
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
3. Click **Publish**

⚠️ **Note:** This is only for testing! Use secure rules from [FIREBASE_SECURITY_RULES.md](FIREBASE_SECURITY_RULES.md) for production.

---

### **Problem 5: AuthContext not provided**

❌ **Error:**
```
useAuth must be used within AuthProvider
```

✅ **FIX:**
Ensure your app is wrapped with AuthProvider in [chatbot-frontend/src/main.tsx](chatbot-frontend/src/main.tsx):
```tsx
import { AuthProvider } from './contexts/AuthContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

---

### **Problem 6: Timeout connecting to Firebase**

❌ **Error:**
```
Firebase service is not responding
Network timeout
```

✅ **FIX:**
- Check your internet connection
- Firebase might be temporarily down (check [status.firebase.google.com](https://status.firebase.google.com))
- Check if your IP is blocked by firewall
- Try from a different network

---

## 🧪 Quick Test Script (BEST CHECK)

Add this to [chatbot-frontend/src/lib/firebase.ts](chatbot-frontend/src/lib/firebase.ts) temporarily:

```tsx
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { /* ... */ };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Test all services
console.log("✅ Firebase App:", app);
console.log("✅ Firebase Auth:", auth);
console.log("✅ Firestore DB:", db);
console.log("✅ Analytics:", analytics);
```

### ✅ If Connected:
Console will show all four objects without errors:
```
✅ Firebase App: {name: "...", config: {...}}
✅ Firebase Auth: FirebaseAuthImpl {...}
✅ Firestore DB: Firestore {...}
✅ Analytics: Analytics {...}
```

---

## ✅ Final Checklist (Very Important)

Before assuming Firebase isn't working, verify:

- ✔ Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- ✔ Web app registered in Firebase (click `</>` icon)
- ✔ Correct config copied from Firebase Console
- ✔ Config pasted in `chatbot-frontend/src/lib/firebase.ts`
- ✔ Firebase installed: `npm install firebase` in `chatbot-frontend/`
- ✔ No red errors in browser console (press `F12`)
- ✔ User appears in Firebase Console → Authentication → Users
- ✔ User data appears in Firestore → Database → Data
- ✔ AuthProvider wraps your app in `main.tsx`
- ✔ Firestore security rules published

---

## 🆘 Troubleshooting Steps (IN ORDER)

### Step 1: Check Console for Errors
1. Open browser console (`F12`)
2. Look for **red error messages**
3. Copy the exact error message

### Step 2: Verify Firebase Config
1. Check [Firebase Console](https://console.firebase.google.com) → Project Settings
2. Compare config in `firebase.ts` character-by-character
3. Ensure all API keys are correct

### Step 3: Check Firebase Installation
```bash
cd chatbot-frontend
npm list firebase
```

Should show `firebase@latest` or similar

### Step 4: Test Sign Up
1. Go to `/signup` page
2. Enter test email: `test@example.com`
3. Enter test password: `Test123!`
4. Click "Sign Up"
5. Check console for errors

### Step 5: Check Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com)
2. Click **Authentication** → **Users**
3. Do you see `test@example.com`?

### Step 6: Check Firestore
1. Open [Firebase Console](https://console.firebase.google.com)
2. Click **Firestore Database** → **Data**
3. Do you see a `users` collection with your test user data?

---

## 📝 Logs to Check

### Browser Console Logs
```bash
# Open: F12 → Console tab
# Should see these (no red errors):
✅ Firebase connected successfully!
✅ Firebase App: {...}
✅ Firebase Auth: {...}
✅ Firestore DB: {...}
```

### Network Logs
```bash
# Open: F12 → Network tab
# Check for these requests (should show 200 OK):
https://www.gstatic.com/firebasejs/...
https://firebaseapp.com/...
```

---

## 🎯 Quick Diagnostics

Copy and run this in browser console to test:

```javascript
// Check Firebase app
console.log(firebase.app());

// Check Auth
console.log(firebase.auth().currentUser);

// Check if user signed in
if (firebase.auth().currentUser) {
  console.log("✅ User signed in:", firebase.auth().currentUser.email);
} else {
  console.log("❌ No user signed in");
}
```

---

## 📞 Need Help?

If you've checked everything and Firebase still isn't connected:

1. **Copy the exact error message** from console
2. **Note your browser type** (Chrome, Firefox, Safari, etc.)
3. **Share your firebase.ts file** (without API keys)
4. **Check Firebase status page**: [status.firebase.google.com](https://status.firebase.google.com)

---

## 📚 Related Docs

- [FIREBASE_IMPLEMENTATION_GUIDE.md](FIREBASE_IMPLEMENTATION_GUIDE.md) - Setup instructions
- [FIREBASE_SECURITY_RULES.md](FIREBASE_SECURITY_RULES.md) - Firestore security rules

---

**Last Updated:** 2 January 2026
