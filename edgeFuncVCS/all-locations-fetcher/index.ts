import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { locations } from "./locations.ts";
serve(async ()=>{
  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
    const results = {};
    const allLocationData = [];
    // Loop over each location
    for (const beach of locations){
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beach.location.latitude}&longitude=${beach.location.longitude}&hourly=,temperature_2m,wind_speed_10m,wind_direction_10m&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=America%2FNew_York&forecast_days=3`);
      if (!weatherRes.ok) {
        results[beach.name] = "fetch_failed";
        continue;
      }
      const weatherJson = await weatherRes.json();
      // Add location name to the data and store in array
      allLocationData.push({
        location: beach.name,
        data: weatherJson
      });
      results[beach.name] = "fetched";
    }
    // Create JSONL format (each location on its own line)
    const jsonlContent = allLocationData.map((item)=>JSON.stringify(item)).join('\n');
    const fileName = `all_locations_weather.json`;
    const { error } = await supabase.storage.from("Test Outputs") // private bucket
    .upload(fileName, new Blob([
      jsonlContent
    ], {
      type: "application/json"
    }), {
      contentType: "application/json",
      upsert: true
    });
    if (error) {
      return new Response(JSON.stringify({
        status: "error",
        message: `upload_error: ${error.message}`,
        results
      }), {
        status: 500
      });
    }
    return new Response(JSON.stringify({
      status: "done",
      message: "All locations stored in single file",
      results
    }), {
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message
    }), {
      status: 500
    });
  }
});
