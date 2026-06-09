import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

// Read client variables from Vite environment
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID,
};

// Check if a valid API Key is provided
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId
);

let app;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Firebase failed to initialize. Falling back to local authentication mode.", error);
  }
}

export { auth, db, googleProvider };

// Unified Fallback Local Simulation Database for Demo Users
const LOCAL_USERS_KEY = "sayed-world-mock-users-auth";
const SESSION_USER_KEY = "sayed-world-mock-session";

const getLocalUsers = (): Array<any> => {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalUsers = (users: Array<any>) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

// Default seed admin and customers in fallback mode
const seedFallbackDatabase = () => {
  const users = getLocalUsers();
  if (users.length === 0) {
    const defaultUsers = [
      {
        id: "user-sayed-77",
        name: "Sayed Rahman",
        email: "saidulislam0400@gmail.com",
        password: "password123",
        role: "Customer",
        walletBalance: 45000,
        loyaltyPoints: 120
      },
      {
        id: "user-admin-99",
        name: "SayedAdmin73",
        email: "admin@sayed.world",
        password: "adminpassword",
        role: "Super Admin",
        walletBalance: 100000,
        loyaltyPoints: 500
      }
    ];
    saveLocalUsers(defaultUsers);
  }
};
seedFallbackDatabase();

// ----------------------------------------------------
// Unified Authenticators wrapper supporting dual-mode
// ----------------------------------------------------

export interface UnifiedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  walletBalance: number;
  loyaltyPoints: number;
}

export const registerWithEmail = async (email: string, pass: string, name: string, role: string = "Customer"): Promise<UnifiedUser> => {
  if (isFirebaseConfigured && auth && db) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    // Save to Firestore users collection
    const userProfile = {
      id: firebaseUser.uid,
      name: name,
      email: email,
      role: role,
      walletBalance: 10000, // starting gift balance for real sign up
      loyaltyPoints: 10
    };
    
    await setDoc(doc(db, "users", firebaseUser.uid), userProfile);
    return userProfile;
  } else {
    // Fallback Mock System
    const users = getLocalUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("This email is already registered!");
    }
    const newUser = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      name: name,
      email: email.toLowerCase(),
      password: pass,
      role: role,
      walletBalance: 10000,
      loyaltyPoints: 10
    };
    users.push(newUser);
    saveLocalUsers(users);
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(newUser));
    return newUser;
  }
};

export const loginWithEmail = async (email: string, pass: string): Promise<UnifiedUser> => {
  if (isFirebaseConfigured && auth && db) {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    // Fetch profile
    const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    if (profileDoc.exists()) {
      return profileDoc.data() as UnifiedUser;
    } else {
      // Create lazy profile
      const defaultProfile = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || email.split("@")[0],
        email: email,
        role: "Customer",
        walletBalance: 10000,
        loyaltyPoints: 10
      };
      await setDoc(doc(db, "users", firebaseUser.uid), defaultProfile);
      return defaultProfile;
    }
  } else {
    // Fallback Mock System
    const users = getLocalUsers();
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (!matched) {
      throw new Error("Invalid email or password combination!");
    }
    const { password, ...userProfile } = matched;
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(userProfile));
    return userProfile as UnifiedUser;
  }
};

export const loginWithGoogle = async (): Promise<UnifiedUser> => {
  if (isFirebaseConfigured && auth && googleProvider) {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = userCredential.user;
    
    // Fetch profile or create if not present
    const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    if (profileDoc.exists()) {
      return profileDoc.data() as UnifiedUser;
    } else {
      const defaultProfile = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "Google User",
        email: firebaseUser.email || "",
        role: "Customer",
        walletBalance: 15000, // starting Google signUp gift!
        loyaltyPoints: 50
      };
      await setDoc(doc(db, "users", firebaseUser.uid), defaultProfile);
      return defaultProfile;
    }
  } else {
    // Fallback Mock Google Login
    const mockEmail = `google.${Math.random().toString(36).substring(2, 7)}@gmail.com`;
    const mockName = "Google Guest User";
    const users = getLocalUsers();
    
    const newUser = {
      id: `user-g-${Math.random().toString(36).substring(2, 9)}`,
      name: mockName,
      email: mockEmail,
      role: "Customer",
      walletBalance: 15000,
      loyaltyPoints: 50
    };
    users.push(newUser);
    saveLocalUsers(users);
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(newUser));
    return newUser as UnifiedUser;
  }
};

export const logoutUnifiedUser = async () => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(SESSION_USER_KEY);
};

export const getSavedSession = (): UnifiedUser | null => {
  try {
    const raw = localStorage.getItem(SESSION_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
