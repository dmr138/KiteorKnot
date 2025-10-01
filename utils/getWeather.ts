import { supabase } from '@/utils/supabase';
export  default async function getWeather(token: string): Promise<string> {
    if (!token) {return `Unauthorized - valid token required`;}          
    const { data, error } = await supabase.functions.invoke('smooth-api', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    if (error) return `Error: ${error.message}`;
    return JSON.stringify(data, null, 2);
    }