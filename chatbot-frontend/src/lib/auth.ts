import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  getAuth,
  User 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up Function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
      name: "",
      phone: "",
      role: "user"
    });

    console.log("User Registered Successfully!");
    return user;
  } catch (error: any) {
    console.error("Sign Up Error:", error.message);
    throw error;
  }
};

// Sign In Function
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login Successful!");
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign In Error:", error.message);
    throw error;
  }
};

// Sign Out Function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error: any) {
    console.error("Sign Out Error:", error.message);
    throw error;
  }
};

// Get Current User
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Get User Profile from Firestore
export const getUserProfile = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    throw error;
  }
};

// Update User Profile
export const updateUserProfile = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    console.log("Profile updated successfully");
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

// Export auth object for context/hooks
export { auth, db };
