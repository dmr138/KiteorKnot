import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { locations } from "./locations.ts";
Deno.serve(async (req)=>{
  try {
    const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error } = await supabaseClient.auth.getUser(token);
    if (error || !user) {
      return new Response("Unauthorized", {
        status: 401
      });
    }
    const spots = [];
    for (const beach of locations){
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beach.location.latitude}&longitude=${beach.location.longitude}&hourly=,temperature_2m,wind_speed_10m,wind_direction_10m&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=America%2FNew_York&forecast_days=3`);
      if (!response.ok) {
        spots.push({
          name: beach.name,
          description: beach.description,
          data: "fetch_failed"
        });
        continue;
      }
      const weatherData = await response.json();
      spots.push({
        name: beach.name,
        description: beach.description,
        data: weatherData
      });
    }
    return new Response(JSON.stringify({
      spots
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500
    });
  }
});
