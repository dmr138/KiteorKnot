import { spotInfo } from '@/assets/spots.json';

export  default async function getWeather(token: string): Promise<any> {
    const spots= [];
      for (const beach of spotInfo){
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beach.location.latitude}&longitude=${beach.location.longitude}&hourly=,temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=America%2FNew_York&forecast_days=3&wind_speed_unit=kn`);
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
        id: beach.id,
        description: beach.description,
        location: beach.location,
        data: weatherData
      });
    }
    
    const data = { spots };
    return data;
    }

