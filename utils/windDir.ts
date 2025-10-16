export function dirToDeg(dir: number | string): number {
  if (typeof dir === 'number') return ((dir % 360) + 360) % 360; // already degrees

  const d = String(dir).toUpperCase().trim();
  const map: Record<string, number> = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
    E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
    S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
    W: 270, WNW: 292.5, NW: 315, NNW: 337.5
  };
  if (d in map) return map[d];
  const asNum = Number(d);
  return Number.isFinite(asNum) ? ((asNum % 360) + 360) % 360 : 0;
}