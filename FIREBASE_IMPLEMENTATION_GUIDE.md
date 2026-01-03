# Firebase Implementation Guide

## Setup Complete! ✅

You now have Firebase Authentication and Firestore Database integrated into your React project.

## Files Created

| File | Purpose |
|------|---------|
| `chatbot-frontend/src/lib/firebase.ts` | Firebase app initialization |
| `chatbot-frontend/src/lib/auth.ts` | Authentication functions (signup, signin, logout) |
| `chatbot-frontend/src/contexts/AuthContext.tsx` | React context for user state |
| `chatbot-frontend/src/components/SignUp.tsx` | Sign-up form component |
| `chatbot-frontend/src/components/SignIn.tsx` | Sign-in form component |

## How to Use in Your App

### 1. Wrap Your App with AuthProvider

Update `chatbot-frontend/src/main.tsx`:

```tsx
import { AuthProvider } from './contexts/AuthContext'
import App from './App'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)
```

### 2. Access User State in Components

```tsx
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  )
}
```

### 3. Use Authentication Functions

```tsx
import { signUp, signIn, logout } from '../lib/auth'

// Sign up
await signUp("user@example.com", "password123")

// Sign in
await signIn("user@example.com", "password123")

// Sign out
await logout()

// Get current user
const user = getCurrentUser()
```

### 4. Manage User Profiles

```tsx
import { getUserProfile, updateUserProfile } from '../lib/auth'

// Get user profile
const profile = await getUserProfile(user.uid)
console.log(profile.name, profile.email)

// Update profile
await updateUserProfile(user.uid, {
  name: "John Doe",
  phone: "9876543210",
  role: "admin"
})
```

## User Data Structure

When a user signs up, their data is stored in Firestore:

```
users/[userId]
├── email: "user@example.com"
├── uid: "firebase-uid-123"
├── createdAt: 2025-01-02
├── name: ""
├── phone: ""
└── role: "user"
```

## Security Rules

Before deploying, **apply the security rules** from `FIREBASE_SECURITY_RULES.md` to your Firestore:

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Go to Firestore → Rules
3. Paste the rules from the guide
4. Click Publish

## Routes to Add

Create these routes in your React Router setup:

```tsx
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './pages/Dashboard' // Create this

<Routes>
  <Route path="/signup" element={<SignUp />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

## Create a Dashboard Page

Create `chatbot-frontend/src/pages/Dashboard.tsx`:

```tsx
import { useAuth } from '../contexts/AuthContext'
import { logout } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/signin')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  )
}
```

## Testing Your Setup

### Test Sign-Up Flow
1. Go to `/signup`
2. Enter email and password
3. Should redirect to dashboard
4. Check Firebase Console → Firestore to see user data

### Test Sign-In Flow
1. Go to `/signin`
2. Enter credentials
3. Should redirect to dashboard

### Test User Persistence
1. Refresh the page
2. User should still be logged in (Firebase maintains session)

## Error Handling

All functions throw errors that you can catch:

```tsx
try {
  await signUp(email, password)
} catch (error) {
  console.error(error.message)
  // Display error to user
}
```

Common errors:
- `"auth/email-already-in-use"` - User already exists
- `"auth/weak-password"` - Password too short
- `"auth/user-not-found"` - Invalid email
- `"auth/wrong-password"` - Invalid password

## Optional Features to Add

1. **Password Reset**
   ```tsx
   import { sendPasswordResetEmail } from "firebase/auth"
   await sendPasswordResetEmail(auth, email)
   ```

2. **Email Verification**
   ```tsx
   import { sendEmailVerification } from "firebase/auth"
   await sendEmailVerification(user)
   ```

3. **Google Sign-In**
   ```tsx
   npm install @react-oauth/google
   ```

4. **Profile Picture Upload**
   - Use Firebase Storage
   - Save URL in Firestore

5. **Admin Dashboard**
   - Query all users with role check
   - Delete users, reset passwords

## Deployment Notes

- Your Firebase config is safe to commit (API keys are public)
- Security rules in Firestore protect sensitive data
- Always use HTTPS in production
- Monitor Firebase usage in console

## Troubleshooting

**Users can't sign in:**
- Check email/password credentials
- Verify user exists in Firebase Console Auth
- Check Firestore Rules are published

**Data not saving:**
- Check Firestore Rules allow write access
- Verify user is authenticated
- Check browser console for errors

**Session lost after refresh:**
- Make sure AuthProvider wraps entire app
- Check firebase.ts is initialized correctly
- Verify auth.onAuthStateChanged is running

## Next Steps

1. ✅ Firebase installed
2. ✅ Auth utilities created
3. ✅ SignUp/SignIn components ready
4. TODO: Apply Firestore security rules
5. TODO: Add routes to your app
6. TODO: Test signup/signin flow
7. TODO: Deploy to production
