import { collection, addDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

// Save complete user data (Step 3 - Final)
export const saveCompleteUserData = async (completeData) => {
  try {
    const userData = {
      ...completeData,
      completedAt: new Date().toISOString(),
      status: 'completed'
    };
    
    const docRef = await addDoc(collection(db, 'complete_user_data'), userData);
    console.log('Complete user data saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving complete user data:', error);
    throw error;
  }
};

// Subscribe to complete user data in real-time
export const subscribeToUserData = (callback) => {
  const q = query(collection(db, 'complete_user_data'), orderBy('completedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  }, (error) => {
    console.error('Snapshot error:', error);
    callback([]);
  });
};