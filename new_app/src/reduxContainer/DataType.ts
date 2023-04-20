export interface WeatherData {
    name: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
        humidity: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export interface DefaultCityCardProps {
    cityName: string;
}