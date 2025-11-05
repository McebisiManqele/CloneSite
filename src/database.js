import { collection, addDoc, getDocs } from 'firebase/firestore';
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

// Get complete user data
export const getCompleteUserData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'complete_user_data'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};