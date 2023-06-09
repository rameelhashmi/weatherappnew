import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { WeatherData, DefaultCityCardProps } from '../reduxContainer/DataType';

function DefaultCityCard({ cityName }: DefaultCityCardProps) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const API_KEY = 'c3d0d15a5dd30e3f9e694468f8dfaf03';
    const handleSubmit = async () => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data);
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleClick = () => {
        setShowDetails(prevState => !prevState);
    };

    const timeConversion = (time: number) => {
        const date = new Date(time * 1000);
        const timeOptions = { hour12: true };
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
            {weatherData && (
                <div onClick={handleClick} className="city-card">
                    <p className="cityName">{weatherData.name}</p>
                    <p className="temperature">
                        {(weatherData.main.temp - 273.15).toFixed(0)}&deg; C
                    </p>
                    <p className="lowTemp">
                        Low: {(weatherData.main.temp_min - 273.15).toFixed(0)}&deg; C
                    </p>
                    <p className="highTemp">
                        High: {(weatherData.main.temp_max - 273.15).toFixed(0)}&deg; C
                    </p>
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

export default DefaultCityCard;
