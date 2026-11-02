import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  normalizePost,
  readLocalPosts,
  STORAGE_KEY,
  newestFirst,
  type Post,
} from "./posts";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

function services() {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  const app = getApps().length ? getApp() : initializeApp(config);
  return { db: getFirestore(app), auth: getAuth(app) };
}

export function subscribeToAuth(
  callback: (user: User | null) => void,
  onError: (error: Error) => void,
) {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(services().auth, callback, onError);
}

export function signInAdmin(email: string, password: string) {
  return signInWithEmailAndPassword(services().auth, email, password);
}

export function signOutAdmin() {
  return signOut(services().auth);
}

export async function fetchPosts(): Promise<Post[]> {
  const posts = isFirebaseConfigured
    ? (await getDocs(collection(services().db, "posts"))).docs.map((snapshot) =>
        normalizePost(snapshot.data(), snapshot.id),
      )
    : readLocalPosts(localStorage.getItem(STORAGE_KEY));
  return posts.sort(newestFirst);
}

export async function savePost(post: Post): Promise<void> {
  if (!isFirebaseConfigured)
    throw new Error("Publishing requires configured Firebase authentication.");
  const { db, auth } = services();
  if (!auth.currentUser) throw new Error("Sign in before publishing.");
  const { id, ...data } = post;
  await setDoc(doc(db, "posts", id), data, { merge: true });
}

export async function deletePost(post: Post): Promise<void> {
  if (!isFirebaseConfigured)
    throw new Error("Deleting requires configured Firebase authentication.");
  const { db, auth } = services();
  if (!auth.currentUser) throw new Error("Sign in before deleting.");
  await deleteDoc(doc(db, "posts", post.id));
}
