import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { locations } from "./locations.ts";

const metersPerSecToKnots = (ms: number): number => ms * 1.94384;

Deno.serve(async (req) => {
  try {
    const supabaseClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!); // ANON key > service role for security
    const authHeader = req.headers.get("Authorization") ?? "";
    
    const token = authHeader.replace("Bearer ", "");
        if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { data: { user }, authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user) {
      return new Response("Unauthorized", {
        status: 401
      });
    }    

    const { profile } = await supabaseClient // retrieve rider weight from profiles relation
      .from("profiles")
      .select("weight")
      .eq("id", user.id) // filters by rows where id = userid. !!ANON KEY+RLS PREVENTS UNAUTHORIZED ACCESS TO OTHER PROFILES!!
      .single(); // only return one row, error handling if zero or mult rows match

    const weight = profile?.weight;
      if (!weight) {
    return new Response(
        JSON.stringify({ error: "Rider weight not found in profile" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
    );
    }

    const riderWeightKg = weight;

    const spots = locations.map(async (beach) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beach.location.latitude}&longitude=${beach.location.longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=America%2FNew_York&forecast_days=3`,
            { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
          return {
            name: beach.name,
            description: beach.description,
            data: "fetch_failed"
          };
        }

        const data = await response.json();
        const windSpeedMs = data.current?.wind_speed_10m;

        if (windSpeedMs == null) {
          return {
            name: beach.name,
            description: beach.description,            
            data: "fetch_wind_failed"
          };
        }

        const windSpeedKnots = metersPerSecToKnots(windSpeedMs);
        const kiteSize = (riderWeightKg * 1.5) / windSpeedKnots;

        return {
          name: beach.name,
          description: beach.description,
          wind_speed_knots: parseFloat(windSpeedKnots.toFixed(1)),
          kite_size_m2: parseFloat(kiteSize.toFixed(1)),
          recommendation: `Recommended kite size: ${Math.ceil(kiteSize)} m²` // rounds up to nearest m²
        };
      } catch (beachError) {
        console.error(`Weather Fetch failed for ${beach.name}:`, beachError.message);
        return {
          name: beach.name,
          description: beach.description,
          data: "beach_fetch_failed"
        };
      }
    });

    const beaches = await Promise.all(spots);

    return new Response(JSON.stringify({
    beaches
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