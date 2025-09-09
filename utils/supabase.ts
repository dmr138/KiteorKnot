
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })
        




// import { Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createClient } from '@supabase/supabase-js';
// import 'react-native-url-polyfill/auto';

// const getStorage = () => {
//   if (Platform.OS === 'web') {
//     return typeof window !== 'undefined' ? window.localStorage : undefined;
//   }
//   return AsyncStorage;
// };

// export const supabase = createClient(
//   process.env.EXPO_PUBLIC_SUPABASE_URL!,
//   process.env.EXPO_PUBLIC_SUPABASE_KEY!,
//   {
//     auth: {
//       storage: getStorage(), // safe: only accesses window at runtime
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: false,
//     },
//   }
// );
