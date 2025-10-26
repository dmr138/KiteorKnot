export type Spot = {
  spots: Array<{
    id: number | string;
    name: string;
    description?: string;
    data: {
      latitude: number | string;
      longitude: number | string;
      current: { time: string; temperature_2m: number | string; wind_speed_10m: number | string; wind_direction_10m: number | string };
      hourly: { time: string[]; temperature_2m: number[] | string[]; wind_speed_10m: number[] | string[]; wind_direction_10m: number[] | string[]};
    }; 
  }>; [key: string]: any
};

export type Forecast = {
    date: string;
    AvgWindSpd: number;
    AvgWindDirection: number;
    times: string[];
    windSpeedsKts: (number| string)[];
    windDirectionsDeg: number[];
};