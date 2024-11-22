import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export const signUp = async (
  email: string,
  password: string,
  userData: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'>
): Promise<User> => {
  const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
  
  const newUser: User = {
    id: firebaseUser.uid,
    email,
    role: 'customer',
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
  return newUser;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  
  if (!userDoc.exists()) {
    throw new Error('User data not found');
  }
  
  return userDoc.data() as User;
};

export const signOut = () => firebaseSignOut(auth);

export const initializeAuth = (
  onUserChanged: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        onUserChanged(userDoc.data() as User);
      }
    } else {
      onUserChanged(null);
    }
    setLoading(false);
  });
};