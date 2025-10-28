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

export function avgWindDir(directions: (number | string)[]): number {
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
    const avgRad = Math.atan2(sumSin/count, sumCos/count) * (180 / Math.PI);
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
    
    const date = new Date(String(array[0]));
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();

    const suffix = getOrdinalSuffix(dayOfMonth);

    return `${month} ${dayOfMonth}${suffix}\n${dayOfWeek}`;
};

function getOrdinalSuffix(day: number): string { // return proper suffix for 1st, 2nd, 3rd, 4th, etc.
    if (11 <= day && day <= 13) return 'th';
    else if (day % 10 == 1) return 'st';
    else if (day % 10 == 2) return 'nd';
    else if (day % 10 == 3) return 'rd';
    else return 'th';
}