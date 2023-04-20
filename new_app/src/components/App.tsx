import React from 'react';
import CityWeatherCard from './CityWeatherCard';
import DefaultCityCard from './DefaultCityCard';

interface AppProps {
    initialData: { appName: string };
}

function App({ initialData }: AppProps) {
    return (
        <div>
            <h1>{initialData.appName}</h1>
            <div>
                <CityWeatherCard />

            </div>
            <div>
                <DefaultCityCard cityName="Munich" />
            </div>
        </div>
    );
}

export default App;
