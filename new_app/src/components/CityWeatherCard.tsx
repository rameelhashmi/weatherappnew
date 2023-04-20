import React, { useState } from 'react';
import CityForm from '../components/CityForm';
import '../style/weathercard.css';
import Divider from "@mui/material/Divider";

interface WeatherData {
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

function CityWeatherCard(): JSX.Element {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const handleFormSubmit = (data: WeatherData): void => {
        setShowDetails(false);
        setWeatherData(data);
    };

    const handleClick = (): void => {
        setShowDetails(true);
    };

    const timeConversion = (time: number): string => {
        const date = new Date(time * 1000);
        const timeOptions = { hour12: true } as const;
        const timeString = date.toLocaleTimeString(undefined, timeOptions);
        return timeString;
    };

    const countryConversion = (country?: string) => {
        if (!country) return undefined;
      
        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        return regionNames.of(country);
      }

    return (
        <div>
            <CityForm onSubmit={handleFormSubmit} />
            <br/>
            {weatherData && (
                <div onClick={handleClick} className="city-card">
                    <p className="cityName">{weatherData.name}</p>
                    <p className="temperature">{(weatherData.main.temp-273.15).toFixed(0)}&deg; C</p>
                    <p className="lowTemp">Low: {(weatherData.main.temp_min-273.15).toFixed(0)}&deg; C</p>
                    <p className="highTemp">High: {(weatherData.main.temp_max-273.15).toFixed(0)}&deg; C</p>
                </div>
            )}
            {showDetails && (
                <div className="details-card">
                    <h1 className="detailsheading">Weather Details</h1>
                    <div>
                        <p>{weatherData?.name}</p>
                        <Divider variant="inset" />
                        <p>Country: {countryConversion(weatherData?.sys.country)}</p>
                        <Divider variant="inset" />
                        <p>Humidity: {weatherData?.main.humidity}%</p>
                        <Divider variant="inset" />
                        <p>Feels Like: {(weatherData?.main.feels_like !== undefined ? (weatherData.main.feels_like - 273.15).toFixed(0) : '')}&deg; C</p>
                        <Divider variant="inset" />
                        <p>Sunrise: {timeConversion(weatherData?.sys.sunrise ?? 0)}</p>
                        <Divider variant="inset" />
                        <p>Sunset: {timeConversion(weatherData?.sys.sunset ?? 0)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CityWeatherCard;
