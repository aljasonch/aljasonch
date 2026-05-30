import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Check if firebase is configured
const isFirebaseConfigured = firebaseConfig.projectId && firebaseConfig.apiKey;

const STORAGE_KEY = 'aljasonch_blog_posts';

let db = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase failed to initialize: ", error);
  }
} else {
  console.log("Firebase credentials not configured. Using LocalStorage fallback.");
}

export const isAuthEnabled = () => !!auth;

// Sign in an admin with email + password
export const signInAdmin = (email, password) => {
  if (!auth) {
    return Promise.reject(new Error('auth/not-configured'));
  }
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign the current admin out
export const signOutAdmin = () => {
  if (!auth) return Promise.resolve();
  return fbSignOut(auth);
};

// Subscribe to auth state changes. Returns an unsubscribe function.
export const subscribeToAuth = (callback) => {
  if (!auth) {
    // No Firebase auth available — report signed-out and no-op unsubscribe.
    callback(null);
    return () => {};
  }
  return fbOnAuthStateChanged(auth, callback);
};

// Read posts from local storage (no template seeding — starts empty)
const readLocalPosts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Fetch all posts
export const fetchPosts = async () => {
  if (db) {
    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsList = [];
      querySnapshot.forEach((docSnap) => {
        postsList.push({ id: docSnap.id, ...docSnap.data() });
      });
      return postsList;
    } catch (error) {
      console.error("Failed to fetch from Firestore. Falling back to LocalStorage: ", error);
    }
  }

  // Fallback
  return readLocalPosts();
};

// Save (create or update) post
export const savePost = async (post) => {
  const postData = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    tags: post.tags,
    slug: post.slug,
    date: post.date
  };

  if (db) {
    try {
      // Document reference named after slug
      const docRef = doc(db, 'posts', post.slug);
      await setDoc(docRef, postData, { merge: true });
      console.log("Post saved to Firestore successfully.");
      return true;
    } catch (error) {
      console.error("Failed to save to Firestore. Falling back to LocalStorage: ", error);
    }
  }

  // Fallback
  const localPosts = readLocalPosts();
  const index = localPosts.findIndex(p => p.slug === post.slug || p.id === post.id);

  if (index !== -1) {
    localPosts[index] = { ...localPosts[index], ...postData };
  } else {
    const nextId = localPosts.length > 0 ? Math.max(...localPosts.map(p => p.id)) + 1 : 1;
    localPosts.unshift({ id: nextId, ...postData });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(localPosts));
  return true;
};

// Delete post
export const deletePost = async (post) => {
  if (db) {
    try {
      const docRef = doc(db, 'posts', post.slug);
      await deleteDoc(docRef);
      console.log("Post deleted from Firestore successfully.");
      return true;
    } catch (error) {
      console.error("Failed to delete from Firestore. Falling back to LocalStorage: ", error);
    }
  }

  // Fallback
  const localPosts = readLocalPosts();
  const updated = localPosts.filter(p => p.slug !== post.slug && p.id !== post.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};
