export function avgWindSpeed(wind: (number | string)[]): number {
    let sum = 0;
    let count = 0;
    for (const i in wind) {
        const speed = Number(wind[i]);
        if (!Number.isNaN(speed)) {
            sum += speed;
            count += 1;
        };
    };
    if (count === 0) return 0;
    const average = Math.round((sum / count) * 10) / 10;
  return average;
};

export function avgWindDir(directions: (number | string)[], speed: (number | string)[]): number {
    let vXsum = 0;
    let vYsum = 0;
    let count = 0;
    for(let i = 0; i < directions.length; i++){
       const m = Number(speed[i]);
       const deg = Number(directions[i]);
       if(Number.isNaN(deg) || Number.isNaN(speed)){
            continue;
       }
       const rad = deg * (Math.PI / 180);
       const vX = m * Math.cos(rad);
       const vY = m * Math.sin(rad);
       vXsum += vX;
       vYsum += vY;
       count += 1;
    }
    if(count === 0) return 0;
   
    const avgRad = Math.atan2(vXsum/count, vYsum/count);
    
     const avgDeg =(avgRad * 180) / Math.PI;

    return (avgDeg + 360) % 360;
}

export function NewavgWindDir(directions: (number | string)[]): number {
    let sumSin= 0;
    let sumCos = 0;
    let count=0;
    for (const i in directions) {
        const deg = Number(directions[i]);
        if (Number.isNaN(deg)) {
            continue;
        };   
        const rad = (deg * Math.PI) / 180;
        sumSin += Math.sin(rad);
        sumCos += Math.cos(rad);
        count += 1; 
    };

    if (count === 0) return 0;
    const avgRad = Math.atan2(sumSin/count, sumCos/count);
    const avgDeg = (avgRad * 180) / Math.PI;

    return (avgDeg + 360) % 360;

};

export function forecastSplit(array: (number | string)[], start: number, end: number): (number | string)[] {
    const newArray = [];
    for (let i = start; i <= end; i++) {
        newArray.push(array[i]);
    };
    return newArray;};

export function getDate(array: (string | number)[]): string {
    if (typeof array[0] !== "string") return 'error';
    return String(array[0]).slice(0,10);
};