# Firebase Security Rules

## Overview
These rules prevent users from accessing other users' data. Only authenticated users can read/write their own data.

## Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data - only accessible by the owner
    match /users/{userId} {
      allow read, write: if request.auth != null 
      && request.auth.uid == userId;
    }

    // Optional: Public profiles that anyone can read
    match /profiles/{userId} {
      allow read: if true;
      allow write: if request.auth != null 
      && request.auth.uid == userId;
    }

    // Optional: Chat messages between users
    match /chats/{chatId} {
      allow read, write: if request.auth != null 
      && (request.auth.uid in resource.data.participants);
    }
  }
}
```

## How to Apply These Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`spirolinkweb`)
3. Go to **Firestore Database** → **Rules** tab
4. Replace the existing rules with the code above
5. Click **Publish**

## Rule Explanations

| Rule | Meaning |
|------|---------|
| `request.auth != null` | Only logged-in users allowed |
| `request.auth.uid == userId` | User can only access their own data |
| `match /users/{userId}` | Path for user documents |
| `allow read, write` | Both read and write permissions |

## Firestore Data Structure

```
users (collection)
 └── [userId] (document)
      ├── email (string)
      ├── uid (string)
      ├── createdAt (timestamp)
      ├── name (string)
      ├── phone (string)
      └── role (string - "user" or "admin")
```

## Authentication Rules

- **Sign Up**: Email + Password (Firebase Auth)
- **Sign In**: Email + Password verification
- **Session**: Automatic via Firebase Auth tokens
- **Sign Out**: Clears session

## Development vs Production

### Development Rules (for testing)
```
allow read, write: if request.auth != null;
```

### Production Rules (secure)
```
allow read, write: if request.auth != null 
&& request.auth.uid == userId;
```

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Permission denied` | User not authenticated | Make sure user is logged in |
| `Document not found` | Wrong path or access denied | Check userId matches auth.uid |
| `Invalid document` | Missing required fields | Ensure all fields are set during signup |

## Testing Rules

Use Firebase Emulator Suite:

```bash
firebase emulators:start
```

This allows you to test rules locally before deploying to production.
