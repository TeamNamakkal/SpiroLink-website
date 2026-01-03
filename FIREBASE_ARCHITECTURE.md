# 🏗️ Firebase Architecture & Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your React Application                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  src/main.tsx                                                │
│  ├── AuthProvider (wraps entire app)                         │
│  └── App                                                     │
│      ├── BrowserRouter                                       │
│      └── Routes                                              │
│          ├── / → Home                                        │
│          ├── /signup → SignUp Component                      │
│          ├── /signin → SignIn Component                      │
│          └── /dashboard → Dashboard (Protected)              │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer (lib/)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  firebase.ts ──┐                                             │
│                ├→ initializeApp()                            │
│                ├→ getAnalytics()                             │
│                └→ exports { app, analytics }                 │
│                                                               │
│  auth.ts ──────→ Functions:                                  │
│                ├→ signUp(email, password)                    │
│                ├→ signIn(email, password)                    │
│                ├→ logout()                                   │
│                ├→ getCurrentUser()                           │
│                ├→ getUserProfile(uid)                        │
│                └→ updateUserProfile(uid, data)               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
        │
        │ HTTPS
        ↓
┌─────────────────────────────────────────────────────────────┐
│              Firebase Cloud Services                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firebase Authentication                             │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  - Email/Password Auth                               │   │
│  │  - Session Management                                │   │
│  │  - UID Generation                                    │   │
│  │  - Security Rules                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firestore Database                                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  users/                                              │   │
│  │  ├── [userId]/                                       │   │
│  │  │   ├── email                                       │   │
│  │  │   ├── uid                                         │   │
│  │  │   ├── createdAt                                   │   │
│  │  │   ├── name                                        │   │
│  │  │   ├── phone                                       │   │
│  │  │   └── role                                        │   │
│  │  └── [userId]/...                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Sign-Up Flow

```
User Action         Component              Backend              Database
    │                   │                     │                    │
    ├─ Click "Sign Up"──>│                     │                    │
    │                   │ ─ validate email ─>│                    │
    │                   │ ─ validate password│                    │
    │                   │ ─ confirm password │                    │
    │                   │                     │                    │
    │                   │ ─ signUp(email, pass)─>│                    │
    │                   │                     │                    │
    │                   │                     ├─ Check if email exists
    │                   │                     │                    │
    │                   │                     ├─ Hash password      │
    │                   │                     │                    │
    │                   │                     ├─ Create user ──────>│
    │                   │                     │   (Auth)            │
    │                   │                     │                    │
    │                   │                     ├─ Get user UID       │
    │                   │                     │                    │
    │                   │                     ├─ Create profile ──>│
    │                   │                     │   (Firestore)      │
    │                   │                    <│                    │
    │                   │<─ success + user ──│                    │
    │                   │                     │                    │
    │<─ redirect /dashboard                  │                    │
    │                   │                     │                    │
    │ [Logged In] ◄─────┴─ AuthProvider detects user              │
    │                                         │                    │
```

---

## Sign-In Flow

```
User Action         Component              Backend              Database
    │                   │                     │                    │
    ├─ Click "Sign In" ─>│                     │                    │
    │                   │ ─ validate email ─>│                    │
    │                   │ ─ validate password│                    │
    │                   │                     │                    │
    │                   │ ─ signIn(email, pass)─>│                    │
    │                   │                     │                    │
    │                   │                     ├─ Find user by email │
    │                   │                     │                    │
    │                   │                     ├─ Verify password    │
    │                   │                     │                    │
    │                   │                     ├─ Create session     │
    │                   │                     │                    │
    │                   │                    <│ ─ return success    │
    │                   │<─ success + user ──│                    │
    │                   │                     │                    │
    │<─ redirect /dashboard                  │                    │
    │                   │                     │                    │
    │ [Logged In] ◄─────┴─ AuthProvider detects user              │
    │                                         │                    │
```

---

## Dashboard (Protected Route) Flow

```
User Visits /dashboard
        │
        ↓
ProtectedRoute Component
        │
        ├─ Check if user is authenticated?
        │
        ├─ YES? ──→ Render Dashboard
        │          └─ Fetch user profile from Firestore
        │          └─ Display email, name, phone, role
        │          └─ Show "Sign Out" button
        │
        └─ NO? ──→ Redirect to /signin
                  (useEffect with useNavigate)
```

---

## Authentication State Management

```
app.tsx (Top Level)
    │
    ├── AuthProvider
    │   │
    │   ├── Uses Firebase Auth
    │   ├── Sets up onAuthStateChanged listener
    │   │   └── Monitors login/logout
    │   │
    │   └── Provides: { user, loading }
    │
    └── Context Available to All Children
        │
        ├── useAuth() hook
        │   └── Access auth state in any component
        │
        ├── Navigate based on user:
        │   ├── If user → show dashboard
        │   └── If !user → show sign-in
```

---

## Protected Route Flow

```
<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        │
        ├─ ProtectedRoute checks: loading? user?
        │
        ├─ If loading ──→ Show spinner
        │
        ├─ If !user ──→ <Navigate to="/signin" />
        │
        └─ If user ──→ Render <Dashboard />
```

---

## User Data Structure

```
Firebase Authentication Database:
┌────────────────────────────────────┐
│ User Account                       │
├────────────────────────────────────┤
│ email: test@example.com            │
│ password: [hashed & encrypted]     │
│ uid: "firebase-auto-generated"     │
│ emailVerified: false               │
│ metadata: {...creation dates...}   │
└────────────────────────────────────┘

Firestore Database:
┌────────────────────────────────────┐
│ users/[uid]/                       │
├────────────────────────────────────┤
│ email: "test@example.com"          │
│ uid: "firebase-auto-generated"     │
│ createdAt: 2026-01-02T10:00:00Z    │
│ name: "John Doe"                   │
│ phone: "+1-555-1234"               │
│ role: "user"                       │
│ [custom fields can be added]       │
└────────────────────────────────────┘
```

---

## Component Hierarchy

```
App (Router Setup)
│
├── Home
│   ├── Display login status
│   ├── Show Sign Up/Sign In links
│   └── Show Chatbot (if logged in)
│
├── SignUp (Route: /signup)
│   ├── Email input
│   ├── Password input
│   ├── Confirm password input
│   ├── Validation logic
│   └── Call signUp() from auth.ts
│
├── SignIn (Route: /signin)
│   ├── Email input
│   ├── Password input
│   ├── Validation logic
│   └── Call signIn() from auth.ts
│
└── ProtectedRoute → Dashboard (Route: /dashboard)
    └── Dashboard
        ├── User profile info
        ├── Account status
        ├── Quick links
        └── Sign Out button
```

---

## Function Call Chain

### Sign-Up
```
SignUp Component
    ├─ User submits form
    ├─ validate()
    └─ signUp(email, password) from auth.ts
        ├─ createUserWithEmailAndPassword()
        │   └─ Firebase Auth API
        │       └─ Creates user in Authentication
        │
        ├─ Get user.uid
        │
        └─ setDoc(doc(db, "users", uid), {...})
            └─ Firestore API
                └─ Creates user profile document
                    └─ Stores email, uid, createdAt, etc
```

### Sign-In
```
SignIn Component
    ├─ User submits form
    ├─ validate()
    └─ signIn(email, password) from auth.ts
        └─ signInWithEmailAndPassword()
            └─ Firebase Auth API
                ├─ Verifies credentials
                ├─ Creates session token
                └─ Returns user object
```

### AuthProvider (on page load)
```
Main.tsx
    ├─ Mount AuthProvider
    ├─ useEffect hook
    ├─ auth.onAuthStateChanged()
    │   └─ Firebase checks if user has valid session
    │
    ├─ If session exists:
    │   └─ setUser(currentUser)
    │   └─ setLoading(false)
    │
    └─ If no session:
        └─ setUser(null)
        └─ setLoading(false)
```

---

## Error Handling Flow

```
User Action
    │
    ├─ Try: execute auth function
    │
    └─ Catch: error.message
        │
        ├─ Display error message to user
        ├─ Log error to console
        └─ User can retry or try different credentials
```

---

## Session Persistence

```
User Signs In
    │
    ├─ Firebase creates token
    ├─ Token stored in browser localStorage
    │
Page Refresh
    │
    ├─ AuthProvider mounts
    ├─ onAuthStateChanged() fires
    ├─ Firebase checks localStorage token
    │
    ├─ Token valid? ──→ Restore user session
    │                 └─ User stays logged in
    │
    └─ Token invalid? ──→ Clear session
                        └─ User logged out
```

---

## Security Flow

```
1. TRANSMISSION
   ├─ All requests use HTTPS
   └─ Data encrypted in transit

2. STORAGE
   ├─ Passwords hashed & salted (Firebase Auth)
   ├─ Data encrypted at rest (Firestore)
   └─ API keys protected (not in code)

3. ACCESS CONTROL
   ├─ Firestore Security Rules
   │   └─ Only users can access own data
   │
   └─ Protected Routes
       └─ Unauthenticated users redirected
```

---

**This architecture ensures secure, scalable user authentication!**

**Last Updated:** 2 January 2026
