interface ILocationEntry {
    [key: string]: any
}

interface ILocationData {
    [key: string]: any
}

interface ILat {
    [key: any]: number
}

interface ILon {
    [key: any]: number
}

interface ICurrentWeather<T> {
    weather: Array,
    main: T[],
    wind: T[]
}

interface ICurrentDay<T> {
    location: string,
    date: string,
    weather: string,
    temp: string,
    wind: string,
    country: string,
    state: string
}

interface IFiveDay {
    dt: string
}

interface IArray {
    [key: any]: any,
    dt: string
}

