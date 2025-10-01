export  default async function getWeather(token: string): Promise<string> {
    if (!token) {return `Unauthorized - valid token required`;}          
    const response = await fetch('https://weatherapi.turbophil.xyz/', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });

    if (response.status === 401) {
    return `Unauthorized - valid token required`;
    }
    const data = await response.json();
    return JSON.stringify(data, null, 2);
    };


//old version for backup
// const { data, error } = await supabase.functions.invoke('smooth-api', { 
//   headers: { 
//     Authorization: Bearer ${ session?.access_token }, 
//     }, 
//   }); 
  
//     if (error) { 
//       console.error(error); setResult(Error: ${ error.message });
//     } 
//     else { setResult(JSON.stringify(data, null, 2)); } }}
