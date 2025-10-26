export function degToDir(dir: number | string): string {
    let deg: number = Number(dir)
    let degTxt: string;
    switch(true) {
        case ( deg >= 348.7 || deg < 11.25):
            degTxt = 'N'
            break;
        case ( deg < 33.75):
            degTxt = 'NNE'
            break;
        case ( deg < 56.25):
            degTxt = 'NE'
            break;
        case ( deg < 78.75):
            degTxt = 'ENE'
            break;  
        case ( deg < 101.25):
            degTxt = 'E'
            break;
        case ( deg < 123.75):
            degTxt = 'ESE'
            break;
        case ( deg < 146.25):
            degTxt = 'SE'
            break;
        case ( deg < 168.75):
            degTxt = 'SSE'
            break;
        case ( deg < 191.25):
            degTxt = 'S'
            break;
        case ( deg < 213.75):
            degTxt = 'SSW'
            break;
        case ( deg < 236.25):
            degTxt = 'SW'
            break;  
        case ( deg < 258.75):
            degTxt = 'WSW'
            break;
        case ( deg < 281.25):
            degTxt = 'W'
            break;
        case ( deg < 303.75):
            degTxt = 'WNW'
            break;
        case ( deg < 326.25):
            degTxt = 'NW'
            break;
        case ( deg < 348.75):
            degTxt = 'NNW'
            break;
        default: degTxt = 'Data Error'
    }
    return degTxt;
}